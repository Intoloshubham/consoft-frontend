import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setUserId, removeUserId, storeToken, removeToken } from './asyncStorageService';
import Config from '../config'
import { STATUSES } from "../services/userAuthApi";

const projectCategorySlice = createSlice({
    name: 'project_category',
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
            .addCase(getProjectCategory.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(getProjectCategory.fulfilled, (state, action) => {
                state.data = action.payload;
                alert(JSON.stringify(action.payload));
                state.status = STATUSES.IDLE;
            })
            .addCase(getProjectCategory.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            })

            
    },
});

export const { setProducts, setStatus } = projectCategorySlice.actions;
export default projectCategorySlice.reducer;

// Thunks
export const getProjectCategory = createAsyncThunk('projects/categoty', async (company_id) => {
    const res = await fetch(Config.API_URL+'project-category');
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

