import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { companyAuthApi } from '../services/companyAuthApi'

export const store = configureStore({
  reducer: {
    [companyAuthApi.reducerPath]: companyAuthApi.reducer,
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(companyAuthApi.middleware),
})

setupListeners(store.dispatch)