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
      query: ({country}) => ({
        url: `/sochitel/get-operators/?country=${country?.country}&product_type=MOBILE_PIN`,
      }),
    }),
    getOperatorProducts: builder.query({
      query: ({operatorId}) => ({
        url: `/get-operator-products/?operator_id=${operatorId}&product_category=EVOUCHERS`,
      }),
    }),
    getTransactionHistory: builder.query({
      query: ({walletAddress}) => ({
        url: `/transactions/?wallet_addres=${walletAddress}&transaction_type=GIFTCARD`,
      }),
    }),
    checkout: builder.mutation({
      query: (data) => ({
        url: "/sochitel/exec-transaction/",
        method: "POST",
        body: data,
      }),
     
    }),
    
  }),
});

export const {
  useGetBrandsByCountryQuery,
  useGetTransactionHistoryQuery,
 useGetOperatorProductsQuery,
 useCheckoutMutation

} = apiSlice;
