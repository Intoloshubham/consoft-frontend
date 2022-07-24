import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setUserId, removeUserId, storeToken, removeToken } from './asyncStorageService';
import Config from '../config'

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
    LOGOUT: 'logout',
});

const projectSlice = createSlice({
    name: 'project',
    initialState: {
        data: [],
        status: STATUSES.IDLE,
    },
    reducers: {
        // setProducts(state, action) {
        //     state.data = action.payload;
        // },
        // setStatus(state, action) {
        //     state.status = action.payload;
        // },
    },
    extraReducers: (builder) => {
        builder
            //submited work
            .addCase(getProjects.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(getProjects.fulfilled, (state, action) => {
                state.data = action.payload;
                // alert(JSON.stringify(action.payload));
                state.status = STATUSES.IDLE;
            })
            .addCase(getProjects.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            })

            
    },
});

export const { setProducts, setStatus } = projectSlice.actions;
export default projectSlice.reducer;

// Thunks
export const getProjects = createAsyncThunk('projects/get', async (company_id) => {
    const res = await fetch(Config.API_URL+'projects');
    const data = await res.json();
    return data;
});

// export const createProject = createAsyncThunk('assignWork/verify', async (work_id) => {
//     const res = await fetch(Config.API_URL+'verify-submit-work/'+work_id,{
//         method:"post",
//         body:JSON.stringify(userData),
//         headers:{
//         "Content-Type":"application/json",
//         },
//     });
//     const data = await res.json();
//     return data;
// });



// export function fetchProducts() {
//     return async function fetchProductThunk(dispatch, getState) {
//         dispatch(setStatus(STATUSES.LOADING));
//         try {
//             const res = await fetch('https://fakestoreapi.com/products');
//             const data = await res.json();
//             dispatch(setProducts(data));
//             dispatch(setStatus(STATUSES.IDLE));
//         } catch (err) {
//             console.log(err);
//             dispatch(setStatus(STATUSES.ERROR));
//         }
//     };
// }