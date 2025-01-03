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

interface TransferResponse {
	status: "success" | "error" | "pending";
	transactionHash: string | null;
	message: string;
}

export const handleTokenTransfer = async (
	tokenAddress: Address,
	receiverAddress: Address,
	amount: string,
	chainId: number,
	decimals: number
): Promise<TransferResponse> => {
	try {
		// Get the appropriate chain based on chainId
        console.log("chain id:",chainId)
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
			return {
				status: "error",
				transactionHash: hash,
				message: "Transaction failed",
			};
		}
	} catch (error) {
		console.error("Token transfer error:", error);
		const errorMessage =
			error instanceof Error ? error.message : "Unknown error occurred";
		return {
			status: "error",
			transactionHash: null,
			message: errorMessage,
		};
	}
};