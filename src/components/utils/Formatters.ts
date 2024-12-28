import { formatUnits } from "viem";
import { Token } from "./Types";

export const getFormattedBalance=(activeToken:Token|null) => {
    if (!activeToken?.balance) return "0";
    return parseFloat(formatUnits(activeToken.balance, activeToken.decimals)).toFixed(4);
  }