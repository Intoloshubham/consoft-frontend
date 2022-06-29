import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id: "",
    company_name: "",
    email: "",
    mobile: "",
}

export const companySlice = createSlice({
    name: 'company_info',
    initialState,
    reducers: {
      setCompanyInfo: (state, action) => {
        state._id = action.payload._id
        state.company_name = action.payload.company_name
        state.email = action.payload.email
        state.mobile = action.payload.mobile
      },
      unSetCompanyInfo: (state, action) => {
        state._id = action.payload._id
        state.company_name = action.payload.company_name
        state.email = action.payload.email
        state.mobile = action.payload.mobile
      },
    }
  })
  
  export const { setCompanyInfo, unSetCompanyInfo } = companySlice.actions
  export default companySlice.reducer