import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { companyAuthApi } from '../services/companyAuthApi'

import companyReducer from '../features/CompanySlice'
import companyAuthReducer from '../features/CompanyAuthSlice'

import { userAuthApi } from '../services/userAuthApi'
import userReducer from '../features/UserSlice'
import UserAuthReducer from '../features/UserAuthSlice'

export const store = configureStore({
  reducer: {
    [companyAuthApi.reducerPath]: companyAuthApi.reducer,
    company:companyReducer,
    companyAuth:companyAuthReducer
  },
  
  reducer: {
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    user:userReducer,
    userAuth:UserAuthReducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(companyAuthApi.middleware),
    

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAuthApi.middleware),
})

setupListeners(store.dispatch)