// app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../appSlices/apiSlice";
import generalReducer from "../appSlices/generalSlice";
import tokenReducer from "../appSlices/TokenSlice";
import walletReducer from "../appSlices/walletSlice";
import countryReducer from "../appSlices/CountrySlice";



export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    generalReducer,
    tokenReducer,
    walletReducer,
    countryReducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
