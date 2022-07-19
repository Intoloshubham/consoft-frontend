import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import companyAuthReducer from '../services/companyAuthApi'
// import companyReducer from '../features/CompanySlice'
// import companyAuthReducer from '../features/CompanyAuthSlice'

import userAuthReducer from '../services/userAuthApi'
// import userReducer from '../features/UserSlice'
// import userAuthReducer from '../features/UserAuthSlice'

export const store = configureStore({
  reducer: {
    // company:companyReducer,
    // companyAuth:companyAuthReducer,
    company:companyAuthReducer,
    user:userAuthReducer,
    // userAuth:userAuthReducer,
  } 
})

export default store;

// export const store = configureStore({
//   reducer: {
//     [companyAuthApi.reducerPath]: companyAuthApi.reducer,
//     [userAuthApi.reducerPath]: userAuthApi.reducer,
//     company:companyReducer,
//     companyAuth:companyAuthReducer,
//     user:userReducer,
//     userAuth:userAuthReducer
//   },

//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat([
//       companyAuthApi.middleware,
//       userAuthApi.middleware
//     ])
// })

// setupListeners(store.dispatch)