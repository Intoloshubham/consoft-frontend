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
    })
  }),

//   loginUser: builder.mutation({
//     query: (user) => {
//       return {
//         url: 'login',
//         method: 'POST',
//         body: user,
//         headers: {
//           'Content-type': 'application/json',
//         }
//       }
//     }
//   }),

})


export const { useRegisterCompanyMutation} = companyAuthApi