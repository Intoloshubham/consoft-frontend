import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import companyAuthReducer from '../services/companyAuthApi'
import userAuthReducer from '../services/userAuthApi'

//admin
// import assignWorksReducer from '../features/AssignWorksSlice'
//user

export const store = configureStore({
  reducer: {
    company:companyAuthReducer,
    user:userAuthReducer,
    // assignworks:assignWorksReducer,
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