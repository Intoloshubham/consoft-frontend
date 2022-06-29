import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    token: null
}

export const userAuthSlice = createSlice({
    name: 'user_token',
    initialState,
    reducers: {
      setUserToken: (state, action) => {
        state.token = action.payload.token
      },
      unsetUserToken: (state, action) => {
        state.token = action.payload.token
      },
    }
  })
  
  export const { setUserToken, unsetUserToken } = userAuthSlice.actions
  export default userAuthSlice.reducer