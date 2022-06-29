import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    token: null
}

export const companyAuthSlice = createSlice({
    name: 'auth_token',
    initialState,
    reducers: {
      setCompanyToken: (state, action) => {
        state.token = action.payload.token
      },
      unsetCompanyToken: (state, action) => {
        state.token = action.payload.token
      },
    }
  })
  
  export const { setCompanyToken, unsetCompanyToken } = companyAuthSlice.actions
  export default companyAuthSlice.reducer