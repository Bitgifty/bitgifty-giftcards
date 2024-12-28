import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider & { isMiniPay?: boolean }; // Extend MetaMaskInpageProvider with isMiniPay
  }
}
