import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { Account, Address, Chain, createPublicClient, formatUnits, http } from "viem";
import { Token } from "../components/utils/Types";
import { erc20ABI, SUPPORTED_CHAINS } from "../components/utils/SupportedChains";
import { sanitizeChain } from "../components/utils/SanitizeChain";

// Define the initial state
type TokenState = {
  account: Account | null;
  activeChain: Partial<Chain> | null; // Use a sanitized Partial<Chain>
  activeToken: Token | null;
  availableTokens: Token[];
  isLoading: boolean;
  error: string | null;
};

const initialState: TokenState = {
  account: null,
  activeChain: null,
  activeToken: null,
  availableTokens: [],
  isLoading: false,
  error: null,
};



// Async thunk to fetch token balances
export const fetchTokenBalances = createAsyncThunk(
  "token/fetchTokenBalances",
  async (_, { rejectWithValue, getState }) => {
    const { activeChain, account } = (getState() as RootState).tokenReducer;

    if (!activeChain || !account) {
      return rejectWithValue("No active chain or account available.");
    }

    try {
      const publicClient = createPublicClient({
        chain: activeChain as Chain, // Assume sanitized chain can be passed back to viem
        transport: http(),
      });

      const chainTokens = SUPPORTED_CHAINS.find(
        (c) => c.chain.id === activeChain.id
      )?.tokens;

      if (!chainTokens) {
        throw new Error("No tokens found for the current chain.");
      }

      const balances = await Promise.all(
        chainTokens.map(async (token) => {
          const balance = await publicClient.readContract({
            address: token.address,
            abi: erc20ABI,
            functionName: "balanceOf",
            args: [account.address as `0x${string}`],
          });

          return {
            ...token,
            balance: balance as bigint,
            formattedBalance: parseFloat(formatUnits(balance as bigint, token.decimals)),
          };
        })
      );

      return balances;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch balances."
      );
    }
  }
);

// Async thunk for chain changes
export const changeChain = createAsyncThunk(
  "token/changeChain",
  async (chain: Chain, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setActiveChain(sanitizeChain(chain))); // Sanitize chain before storing it
      await dispatch(fetchTokenBalances());
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to change chain."
      );
    }
  }
);

// Async thunk for initializing the chain
export const initializeChain = createAsyncThunk(
  "token/initializeChain",
  async (_, { rejectWithValue, dispatch }) => {
    if (!window.ethereum) {
      return rejectWithValue("MetaMask not detected");
    }

    try {
      const chainIdHex = (await window.ethereum.request({
        method: "eth_chainId",
      })) as `0x${string}`;

      const chainId = Number.parseInt(chainIdHex.slice(2), 16);
      const detectedChain = SUPPORTED_CHAINS.find((c) => c.chain.id === chainId);
      console.log(detectedChain)

      if (detectedChain) {
        dispatch(setActiveChain(sanitizeChain(detectedChain.chain))); // Sanitize chain
        dispatch(setAvailableTokens(detectedChain.tokens));
        dispatch(setActiveToken(detectedChain.tokens[0]));

        
      
      } else {
        // Default to the first chain in SUPPORTED_CHAINS
        dispatch(setActiveChain(sanitizeChain(SUPPORTED_CHAINS[0].chain))); // Sanitize chain
        dispatch(setAvailableTokens(SUPPORTED_CHAINS[0].tokens));
        dispatch(setActiveToken(SUPPORTED_CHAINS[0].tokens[0]));
      }
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to initialize chain"
      );
    }
  }
);

// Create the slice
const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setActiveChain: (state, action) => {
      state.activeChain = action.payload;
      state.activeToken = null;
      state.availableTokens = [];
    },
    setAvailableTokens: (state, action) => {
      state.availableTokens = action.payload;
    },
    setAccount: (state, action) => {
      state.account = action.payload;
    },
    setActiveToken: (state, action) => {
      state.activeToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTokenBalances.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTokenBalances.fulfilled, (state, action) => {
        state.availableTokens = action.payload;
        state.activeToken =
          state.availableTokens.find((t) => (t.balance && t.balance > BigInt(0)) || null) || null;
        state.isLoading = false;
      })
      .addCase(fetchTokenBalances.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })
      .addCase(changeChain.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(changeChain.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(changeChain.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      });
  },
});

// Function to check if a token is supported on a chain
export const isTokenSupported = (chainId: number, tokenAddress: Address) => {
  const chain = SUPPORTED_CHAINS.find((c) => c.chain.id === chainId);
  return chain?.tokens.some((token) => token.address.toLowerCase() === tokenAddress.toLowerCase()) ?? false;
};

// Exports
export const { setActiveChain, setAccount, setActiveToken, setAvailableTokens } = tokenSlice.actions;

export const selectActiveChain = (state: RootState) => state.tokenReducer.activeChain;
export const selectAvailableTokens = (state: RootState) => state.tokenReducer.availableTokens;
export const selectActiveToken = (state: RootState) => state.tokenReducer.activeToken;
export const selectIsLoading = (state: RootState) => state.tokenReducer.isLoading;
export const selectError = (state: RootState): string | null => state.tokenReducer.error;

export default tokenSlice.reducer;
