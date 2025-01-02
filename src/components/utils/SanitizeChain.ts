import { Chain } from "viem";

// Helper function to sanitize a Chain object
export const sanitizeChain = (chain: Chain): Partial<Chain> => {
    const { fees, formatters, serializers, ...serializableProperties } = chain; // Remove non-serializable fields
    return serializableProperties; // Return only serializable fields
  };