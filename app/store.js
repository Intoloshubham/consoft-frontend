import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { companyAuthApi } from '../services/companyAuthApi'

import companyReducer from '../features/CompanySlice'
import companyAuthReducer from '../features/CompanyAuthSlice'

export const store = configureStore({
  reducer: {
    [companyAuthApi.reducerPath]: companyAuthApi.reducer,
    company:companyReducer,
    companyAuth:companyAuthReducer
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(companyAuthApi.middleware),
})

setupListeners(store.dispatch)