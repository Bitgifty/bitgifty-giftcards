import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { Account } from "viem";
import { SUPPORTED_CHAINS } from "../components/utils/SupportedChains";
import { setAccount, setActiveChain, setActiveToken, setAvailableTokens } from "./TokenSlice";
import { sanitizeChain } from "../components/utils/SanitizeChain";

// Define the initial state
type WalletState = {
  walletAddress: string;
  usdcBalance: number;
  isConnecting: boolean;
  error: string | null;
  isMiniPay: boolean;
  account: Account | null;
};

const initialState: WalletState = {
  walletAddress: "",
  usdcBalance: 0,
  isConnecting: false,
  error: null,
  isMiniPay: false,
  account: null,
};

// Helper function to create proper Account object
const createAccountObject = (address: string): Account => {
  return {
    address: address as `0x${string}`,
    type: "json-rpc",
  };
};

// Async thunk to handle wallet connection
export const connectWallet = createAsyncThunk(
  "wallet/connectWallet",
  async (_, { rejectWithValue, dispatch }) => {
    if (typeof window === "undefined") {
      return rejectWithValue(
        "This feature is only available in browser environments"
      );
    }

    try {
      if (!window.ethereum) {
        throw new Error(
          "No Web3 wallet detected. Please install a wallet extension"
        );
      }

      // Check if the wallet is MiniPay
      const isMiniPayWallet = Boolean(window.ethereum.isMiniPay);

      // Request accounts
      const accounts = (await window.ethereum.request({
        method: "eth_requestAccounts",
        params: [],
      })) as string[];

      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts found");
      }

      const address = accounts[0];
      const accountObject = createAccountObject(address);

      // Set the account and chain data
      dispatch(setWalletAddress(address));
      dispatch(setAccount(accountObject));
      dispatch(setIsMiniPay(isMiniPayWallet));

      // Get current chain ID
      const chainIdHex = (await window.ethereum.request({
        method: "eth_chainId",
      })) as `0x${string}`;

      // const chainId = parseInt(chainIdHex, 16);
      const chainId = Number.parseInt(chainIdHex.slice(2), 16);
      const detectedChain = SUPPORTED_CHAINS.find((c) => c.chain.id === chainId);
      
      console.log(detectedChain)
      if (detectedChain) {
        dispatch(setActiveChain(sanitizeChain(detectedChain.chain))); // Sanitize chain
        dispatch(setAvailableTokens(detectedChain.tokens));
        dispatch(setActiveToken(detectedChain.tokens[0]));
      } else {
        console.warn(`Chain ID ${chainId} not supported`);
      }

      // Set up event listeners for chain and account changes
      if (window.ethereum?.on) {
        window.ethereum.on("chainChanged", (chainId: unknown) => {
          if (typeof chainId === "string") {
            const newChain = SUPPORTED_CHAINS.find(
              (c) => c.chain.id === parseInt(chainId, 16)
            )?.chain;
            if (newChain) {
              dispatch(setActiveChain(newChain));
            }
          }
        });

        window.ethereum.on("accountsChanged", (accounts: unknown) => {
          if (
            Array.isArray(accounts) &&
            accounts.every((acc) => typeof acc === "string")
          ) {
            if (accounts.length === 0) {
              disconnectWallet();
            } else {
              const newAddress = accounts[0];
              console.log("new address:",newAddress)
              dispatch(setWalletAddress(newAddress));
              dispatch(setAccount(createAccountObject(newAddress)));
            }
          }
        });
      }
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to connect wallet"
      );
    }
  }
);

// Action to disconnect the wallet
export const disconnectWallet = createAsyncThunk(
  "wallet/disconnectWallet",
  (_, { dispatch }) => {
    dispatch(setWalletAddress(""));
    dispatch(setUsdcBalance(0));
    dispatch(setIsMiniPay(false));
    dispatch(setAccount(null));

    // Remove event listeners
    if (window.ethereum?.removeListener) {
      window.ethereum.removeListener("chainChanged", () => {});
      window.ethereum.removeListener("accountsChanged", () => {});
    }
  }
);

// Create the slice
const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setWalletAddress: (state, action) => {
      state.walletAddress = action.payload;
    },
    setUsdcBalance: (state, action) => {
      state.usdcBalance = action.payload;
    },
    setIsMiniPay: (state, action) => {
      state.isMiniPay = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(connectWallet.pending, (state) => {
        state.isConnecting = true;
        state.error = null;
      })
      .addCase(connectWallet.fulfilled, (state) => {
        state.isConnecting = false;
      })
      .addCase(connectWallet.rejected, (state, action) => {
        state.isConnecting = false;
        state.error = action.payload as string;
      })
      .addCase(disconnectWallet.fulfilled, (state) => {
        state.isConnecting = false;
      });
  },
});

// Export the actions
export const { setWalletAddress, setUsdcBalance, setIsMiniPay } =
  walletSlice.actions;

// Selectors
export const selectWalletAddress = (state: RootState) =>
  state.walletReducer.walletAddress;
export const selectIsConnecting = (state: RootState) =>
  state.walletReducer.isConnecting;
export const selectError = (state: RootState) => state.walletReducer.error;
export const selectIsMiniPay = (state: RootState) =>
  state.walletReducer.isMiniPay;
export const selectAccount = (state: RootState) => state.walletReducer.account;

export default walletSlice.reducer;
