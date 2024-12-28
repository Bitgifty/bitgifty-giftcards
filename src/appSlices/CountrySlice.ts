import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { defaultCountry, SUPPORTED_COUNTRIES } from "../components/utils/SupportedCountries";
import { RootState } from "../app/store";


// Fetch rate using Fetch API
export const fetchRate = createAsyncThunk(
  "country/fetchRate",
  async (country: string | null, { rejectWithValue }) => {
    if (!country) return rejectWithValue("No country selected");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_UTIL_BASE_URL}/swap/get-dollar-price/?country=${country}`
      );
      if (!response.ok) throw new Error("Failed to fetch rate");

      const data = await response.json();
      return parseFloat(data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Detect country using IP-based API
export const detectCountryByIP = createAsyncThunk(
  "country/detectCountryByIP",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://ip-api.com/json/");
      if (!response.ok) throw new Error("Failed to detect country");

      const data = await response.json();
      const countryMappings: { [key: string]: string } = {
        NG: "NG",
        GH: "GH",
        KE: "KE",
        ZA: "ZA",
        UG: "UG",
      };

      return countryMappings[data.countryCode] || null;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const countrySlice = createSlice({
  name: "country",
  initialState: {
    country:defaultCountry,
    rate: 0,
    isLoadingRate: false,
    availableServices: [] as any[],
  },
  reducers: {
    setActiveCountry: (state, action) => {
      const country = SUPPORTED_COUNTRIES.find((c) => c.country === action.payload?.country);
      if (country) {
        localStorage.setItem("user_country", JSON.stringify(country));
        state.country=country
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRate.pending, (state) => {
        state.isLoadingRate = true;
      })
      .addCase(fetchRate.fulfilled, (state, action) => {
        state.isLoadingRate = false;
        state.rate = action.payload;
      })
      .addCase(fetchRate.rejected, (state, action) => {
        state.isLoadingRate = false;
        console.error("Error fetching rate:", action.payload);
      })
      .addCase(detectCountryByIP.fulfilled, (state, action) => {
        if (action.payload) {
          const country = SUPPORTED_COUNTRIES.find((c) => c.country === action.payload);
          if (country) {
            localStorage.setItem("user_country", JSON.stringify(country));
            state.country=country
          }
        }
      })
      .addCase(detectCountryByIP.rejected, (_, action) => {
        console.error("Error detecting country:", action.payload);
      });
  },
});

// Selectors
export const selectCountry = (state: RootState) => state.countryReducer.country;
export const selectRate = (state: RootState) => state.countryReducer.rate;
export const selectIsLoadingRate = (state: RootState) => state.countryReducer.isLoadingRate;
export const selectAvailableServices = (state: RootState) => state.countryReducer.availableServices;

export const { setActiveCountry } = countrySlice.actions;

export default countrySlice.reducer;
