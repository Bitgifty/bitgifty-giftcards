// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Define our single API slice object
export const apiSlice = createApi({
  reducerPath: "api",
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://server-dev.bitgifty.com/dapp",
    
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({

    getBrandsByCountry: builder.query({
      query: (country) => ({
        url: `/sochitel/get-operators/?country=${country}&product_type=MOBILE_PIN`,
      }),
    }),
    getOperatorProducts: builder.query({
      query: ({operatorId}) => ({
        url: `/sochitel/get-operator-products/?operator_id=${operatorId}&product_category=EVOUCHERS`,
      }),
    }),
    getTransactionHistory: builder.query({
      query: ({walletAddress}) => ({
        url: `/transactions/?wallet_address=${walletAddress}&transaction_type=GIFTCARD`,
      }),
    }),
    getTransactionHistoryById: builder.query({
      query: ({id}) => ({
        url: `/transactions/${id}`,
      }),
    }),
    checkout: builder.mutation({
      query: (data) => ({
        url: "/sochitel/exec-transaction/",
        method: "POST",
        body: data,
      }),
     
    }),

    redeem: builder.mutation({
      query: (redeem_dap) => ({
        url: "/redeem-giftcard/",
        method: "POST",
        body: redeem_dap,
      }),
     
    }),
    
  }),
});

export const {
  useGetBrandsByCountryQuery,
  useGetTransactionHistoryQuery,
  useGetTransactionHistoryByIdQuery,
 useGetOperatorProductsQuery,
 useCheckoutMutation,
 useRedeemMutation

} = apiSlice;
