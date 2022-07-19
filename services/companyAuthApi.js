// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import Config from '../config'

// export const companyAuthApi = createApi({
//   reducerPath: 'companyAuthApi',
// //   baseQuery: fetchBaseQuery({ baseUrl: Config.API_URL'http://192.168.1.99:8000/api/' }),
//   baseQuery: fetchBaseQuery({ baseUrl: Config.API_URL}),
//   endpoints: (builder) => ({
//     registerCompany:builder.mutation({
//         query:(user)=>{
//             return{
//                 url:'company',
//                 method:'POST',
//                 body:user,
//                 headers: {
//                     'Content-type': 'application/json',
//                   }
//             }
            
//         }
        
//     }),

//     verifyProductKey:builder.mutation({
//       query:(user) => {
//           return {
//               url:'verify-product-key',
//               method:'POST',
//               body:user,
//               headers:{
//                   'Content-type':'application/json',
//               }
//             }
//         } 
//     }),

//     loginCompany:builder.mutation({
//       query:(user) => {
//           return {
//               url:'company-login',
//               method:'POST',
//               body:user,
//               headers:{
//                   'Content-type':'application/json',
//               }
//             }
//         } 
//     }),

//     getLoggedCompany:builder.query({
//       query:(token) => ({
//         url:'company',
//         method:'GET',
//         headers:{
//           'authorization':`Bearer ${token}`,
//         }
//       }) 
//     }),


    
//   }),



// })


// export const { useRegisterCompanyMutation, useVerifyProductKeyMutation, useGetLoggedCompanyQuery, useLoginCompanyMutation } = companyAuthApi


// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import Config from '../config'

// export const userAuthApi = createApi({
//     reducerPath: 'userAuthApi',
//     baseQuery: fetchBaseQuery({ baseUrl: Config.API_URL}),
//     endpoints: (builder) => ({
    
//       loginUser:builder.mutation({
//         query:(user) => {
//             return {
//                 url:'login',
//                 method:'POST',
//                 body:user,
//                 headers:{
//                     'Content-type':'application/json',
//                 }
//               }
//           } 
//       }),

//       getLoggedUser:builder.query({
//         query:(token) => ({
//           url:'user',
//           method:'GET',
//           headers:{
//             'authorization':`Bearer ${token}`,
//           }
//         }) 
//       }),
  
      
//     }),
  
  
//   })
  
  
//   export const { useLoginUserMutation, useGetLoggedUserQuery } = userAuthApi


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setCompanyId, removeCompanyId, storeToken, removeToken } from './asyncStorageService';
import Config from '../config'

export const STATUSES = Object.freeze({
  IDLE: 'idle',
  ERROR: 'error',
  LOADING: 'loading',
  LOGOUT: 'logout',
});

const initialState = {
  token: "",
  company_id: "",
  // company_name: "",
  // email: "",
  // mobile: "",
  status:STATUSES.IDLE,
}

export const companySlice = createSlice({
  name: 'company_auth',
  initialState,
  reducers: {
    setCompanyToken: (state, action) => {
      state.token = action.payload.access_token,
      state.company_id = action.payload._id,
      state.status = STATUSES.IDLE
    },
    
    companyLogout:(state, action)=>{
      state.token = null,
      state.company_id = null,
      state.status = STATUSES.LOGOUT
      removeToken('token')
      removeCompanyId('company_id')
    }

  },

  extraReducers: (builder) => {
    builder
        .addCase(companyLogin.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(companyLogin.fulfilled,(state, action) => {
            state.status = STATUSES.IDLE;
            state.token = action.payload.access_token;
            state.company_id = action.payload.company_id;
            setCompanyId(action.payload.company_id);
            storeToken(action.payload.access_token);
        })
        .addCase(companyLogin.rejected, (state, action) => {
            state.status = STATUSES.ERROR;
        })
  }

})

export const { setCompanyToken, companyLogout } = companySlice.actions
export default companySlice.reducer

export const companyLogin = createAsyncThunk('user/login', async (companyData) => {
  const res = await fetch(Config.API_URL+'company-login',{
    method:"post",
    body:JSON.stringify(companyData),
    headers:{
      "Content-Type":"application/json",
    },
  });
  const data = await res.json();
  return data;
  
});