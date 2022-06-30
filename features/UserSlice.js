import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id: "",
    name: "",
    email: "",
    mobile: "",
    // role: "",
    role_id: "",
}

export const userSlice = createSlice({
    name: 'user_info',
    initialState,
    reducers: {
      setUserInfo: (state, action) => {
        state._id = action.payload._id
        state.name = action.payload.name
        state.email = action.payload.email
        state.mobile = action.payload.mobile
        // state.role = action.payload.role
        state.role_id = action.payload.role_id
      },
      unSetUserInfo: (state, action) => {
        state._id = action.payload._id
        state.name = action.payload.name
        state.email = action.payload.email
        state.mobile = action.payload.mobile
        // state.role = action.payload.role
        state.role_id = action.payload.role_id
      },
    }
  })
  
  export const { setUserInfo, unSetUserInfo } = userSlice.actions
  export default userSlice.reducer