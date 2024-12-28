import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

type GeneralState = {

  currentCountry:{logo:string; name:string},
  openCountryBox:boolean,
  openTokenBox:boolean,
  operatorProduct:any,
  openOperatorProductBox:boolean,
};
const initialState: GeneralState = {
 
  currentCountry:{logo:"🇳🇬", name:"Nigeria"},
  openCountryBox:false,
  openTokenBox:false,
  operatorProduct:{},
  openOperatorProductBox:false
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
 

    setCurrentCountry: (state, action) => {
       state.currentCountry=action.payload
      },
      setOpenCountryBox: (state) => {
        state.openCountryBox=!state.openCountryBox
       },
       closeCountryBox: (state) => {
        state.openCountryBox=false
       },
       setOpenTokenBox: (state) => {
        state.openTokenBox=!state.openTokenBox
       },
       closeTokenBox: (state) => {
        state.openTokenBox=false
       },
       setOperatorProduct: (state, action) => {
        state.operatorProduct=action.payload
       },
       setOpenOperatorProductBox: (state) => {
        state.openOperatorProductBox=!state.openOperatorProductBox
       },
       closeOperatorProductBox: (state) => {
        state.openOperatorProductBox=false
       },
  },
});
export const {
 
  setCurrentCountry, 
  setOpenCountryBox,
  closeCountryBox,
  setOpenTokenBox,
  closeTokenBox,
  setOperatorProduct,
  setOpenOperatorProductBox,
  closeOperatorProductBox

 
} = generalSlice.actions;
export const country = (state: RootState) => state.generalReducer.currentCountry;
export const openCountry = (state: RootState) => state.generalReducer.openCountryBox;
export const openToken = (state: RootState) => state.generalReducer.openTokenBox;
export const selectOperatorProduct = (state: RootState) => state.generalReducer.operatorProduct;
export const selectOpenOperatorProductBox = (state: RootState) => state.generalReducer.openOperatorProductBox;


export default generalSlice.reducer;
