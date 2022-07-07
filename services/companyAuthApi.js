import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Config from '../config'

export const companyAuthApi = createApi({
  reducerPath: 'companyAuthApi',
//   baseQuery: fetchBaseQuery({ baseUrl: Config.API_URL'http://192.168.1.99:8000/api/' }),
  baseQuery: fetchBaseQuery({ baseUrl: Config.API_URL}),
  endpoints: (builder) => ({
    registerCompany:builder.mutation({
        query:(user)=>{
            return{
                url:'company',
                method:'POST',
                body:user,
                headers: {
                    'Content-type': 'application/json',
                  }
            }
            
        }
        
    }),

    verifyProductKey:builder.mutation({
      query:(user) => {
          return {
              url:'verify-product-key',
              method:'POST',
              body:user,
              headers:{
                  'Content-type':'application/json',
              }
            }
        } 
    }),

    loginCompany:builder.mutation({
      query:(user) => {
          return {
              url:'company-login',
              method:'POST',
              body:user,
              headers:{
                  'Content-type':'application/json',
              }
            }
        } 
    }),

    getLoggedCompany:builder.query({
      query:(token) => ({
        url:'company',
        method:'GET',
        headers:{
          'authorization':`Bearer ${token}`,
        }
      }) 
    }),


    
  }),



})


export const { useRegisterCompanyMutation, useVerifyProductKeyMutation, useGetLoggedCompanyQuery, useLoginCompanyMutation } = companyAuthApi