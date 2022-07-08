import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Config from '../config'

export const userAuthApi = createApi({
    reducerPath: 'userAuthApi',
    baseQuery: fetchBaseQuery({ baseUrl: Config.API_URL}),
    endpoints: (builder) => ({
    
      loginUser:builder.mutation({
        query:(user) => {
            return {
                url:'login',
                method:'POST',
                body:user,
                headers:{
                    'Content-type':'application/json',
                }
              }
          } 
      }),

      getLoggedUser:builder.query({
        query:(token) => ({
          url:'user',
          method:'GET',
          headers:{
            'authorization':`Bearer ${token}`,
          }
        }) 
      }),
  
      
    }),
  
  
  })
  
  
  export const { useLoginUserMutation, useGetLoggedUserQuery } = userAuthApi