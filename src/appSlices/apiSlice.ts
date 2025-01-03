// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Define our single API slice object
export const apiSlice = createApi({
  reducerPath: "api",
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://server-dev.bitgifty.com/dapp/sochitel",
    
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({

    getBrandsByCountry: builder.query({
      query: ({country}) => ({
        url: `/get-operators/?country=${country?.country}&product_type=MOBILE_PIN`,
      }),
    }),
    getOperatorProducts: builder.query({
      query: ({operatorId}) => ({
        url: `/get-operator-products/?operator_id=${operatorId}&product_category=EVOUCHERS`,
      }),
    }),
    checkout: builder.mutation({
      query: (data) => ({
        url: "/exec-transaction/",
        method: "POST",
        body: data,
      }),
     
    }),
    
  }),
});

export const {
  useGetBrandsByCountryQuery,
 useGetOperatorProductsQuery,
 useCheckoutMutation

} = apiSlice;
