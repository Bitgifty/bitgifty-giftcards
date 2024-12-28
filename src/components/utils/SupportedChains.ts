import { celo, polygon, avalanche } from "viem/chains";
import { ChainWithTokens } from "./Types";

export const SUPPORTED_CHAINS: ChainWithTokens[] = [
  {
    chain: celo,
    tokens: [
      {
        symbol: "cUSD",
        name: "Celo Dollar",
        address: "0x765DE816845861e75A25fCA122bb6898B8B1282a",
        decimals: 18,
        logoURI: "/images/cusdLogo.png",
      },
      {
        symbol: "USDT",
        name: "USDT",
        address: "0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e",
        decimals: 6,
        logoURI: "/images/usdtLogo.svg",
      },
      {
        symbol: "USDC",
        name: "USDC",
        address: "0xcebA9300f2b948710d2653dD7B07f33A8B32118C",
        decimals: 6,
        logoURI: "/images/usdcLogo.svg",
      },
    ],
  },
  {
    chain: polygon,
    tokens: [
      {
        symbol: "USDC",
        name: "USD Coin",
        address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
        decimals: 6,
        logoURI: "/images/usdcLogo.svg",
      },
      {
        symbol: "USDT",
        name: "Tether USD",
        address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
        decimals: 6,
        logoURI: "/images/usdtLogo.svg",
      },
    ],
  },
  {
    chain: avalanche,
    tokens: [
      {
        symbol: "USDC.e",
        name: "USD Coin",
        address: "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664",
        decimals: 6,
        logoURI: "/images/usdcLogo.svg",
      },
      {
        symbol: "USDT.e",
        name: "Tether USD",
        address: "0xc7198437980c041c805A1EDcbA50c1Ce5db95118",
        decimals: 6,
        logoURI: "/images/usdtLogo.svg",
      },
    ],
  },
];

export const erc20ABI = [
    {
      constant: true,
      inputs: [{ name: "_owner", type: "address" }],
      name: "balanceOf",
      outputs: [{ name: "balance", type: "uint256" }],
      type: "function",
    },
  ] as const;
