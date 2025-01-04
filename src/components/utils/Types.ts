import { Account, Address, Chain } from "viem";


export type BuyFormProps={
    recipient_name: string;
      sender_name: string;
      recipient_email:string;
      recipient_phone_number:string;
      amount:string;
      quantity:string;
      message:string;
}

export type SellFormProps={
    sub_category: string;
  amount: string;
  image: File | null;
    
}


export interface Token {
  symbol: string;
  name: string;
  address: Address;
  decimals: number;
  logoURI?: string;
  balance?: bigint;
}

export interface ChainWithTokens {
  chain: Chain;
  tokens: Token[];
}

export interface TokenContextType {
  activeChain: Chain | null;
  activeToken: Token | null;
  supportedChains: ChainWithTokens[];
  availableTokens: Token[];
  account: Account | null;
  isLoading: boolean;
  error: Error | null;
  setActiveChain: (chain: Chain) => Promise<void>;
  setActiveToken: (token: Token) => void;
  setAccount: (account: Account | null) => void;
  getFormattedBalance: (token?: Token) => string;
  isTokenSupported: (chainId: number, tokenAddress: Address) => boolean;
  refreshBalances: () => Promise<void>;
}

export interface SupportedCountry {
  name:string;
	country: string;
	currency: string;
	flag: string;
	ticker: string;
	countryCode: string;
	cashback: string;
}