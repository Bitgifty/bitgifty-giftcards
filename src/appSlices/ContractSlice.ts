import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createWalletClient,
  createPublicClient,
  custom,
  http,
  parseUnits,
  encodeFunctionData,
  Address,
} from "viem";
import { celo, polygon, avalanche } from "viem/chains";

// ABI for ERC20 token transfer
const tokenAbi = [
  {
    name: "transfer",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "recipient", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
] as const;

// Define the initial state
interface ContractState {
  status: "idle" | "loading" | "success" | "error";
  transactionHash: string | null;
  message: string;
  error: string | null;
}

const initialState: ContractState = {
  status: "idle",
  transactionHash: null,
  message: "",
  error: null,
};

// Async thunk to handle token transfer
export const handleTokenTransfer = createAsyncThunk(
  "contract/handleTokenTransfer",
  async (
    {
      tokenAddress,
      receiverAddress,
      amount,
      chainId,
      decimals,
    }: {
      tokenAddress: Address;
      receiverAddress: Address;
      amount: string;
      chainId: number;
      decimals: number;
    },
    { rejectWithValue }
  ) => {
    try {
      // Get the appropriate chain based on chainId
      const chain = [celo, polygon, avalanche].find((c) => c.id === chainId);
      if (!chain) {
        throw new Error("Unsupported chain");
      }

      // Initialize clients
      const walletClient = createWalletClient({
        chain,
        transport: custom(window.ethereum!),
      });

      const publicClient = createPublicClient({
        chain,
        transport: http(),
      });

      // Get the connected account
      const [account] = await walletClient.requestAddresses();

      // Format amount with appropriate decimals
      const formattedAmount = parseUnits(amount.toString(), decimals);

      // Prepare transaction data
      const data = encodeFunctionData({
        abi: tokenAbi,
        functionName: "transfer",
        args: [receiverAddress, formattedAmount],
      });

      // Send transaction
      const hash = await walletClient.sendTransaction({
        account,
        to: tokenAddress,
        data,
        chain,
      });

      console.log("Transaction submitted:", hash);

      // Wait for transaction receipt
      const receipt = await publicClient.waitForTransactionReceipt({
        hash,
      });

      console.log(receipt);

      if (receipt.status === "success") {
        return {
          status: "success",
          transactionHash: hash,
          message: "Transaction successful",
        };
      } else {
        throw new Error("Transaction failed");
      }
    } catch (error) {
      console.error("Token transfer error:", error);
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    }
  }
);

// Create the slice
const contractSlice = createSlice({
  name: "contract",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleTokenTransfer.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.transactionHash = null;
        state.message = "";
      })
      .addCase(handleTokenTransfer.fulfilled, (state, action) => {
        state.status = "success";
        state.transactionHash = action.payload.transactionHash;
        state.message = action.payload.message;
      })
      .addCase(handleTokenTransfer.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload as string;
        state.message = "";
      });
  },
});

// Export the reducer
export default contractSlice.reducer;
