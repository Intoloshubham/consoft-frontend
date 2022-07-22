import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Config from '../config'

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
    LOGOUT: 'logout',
});

const assignWorkSlice = createSlice({
    name: 'assignWork',
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
            .addCase(getAssignWorks.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(getAssignWorks.fulfilled, (state, action) => {
                state.data = action.payload;
                alert(JSON.stringify(action.payload));
                state.status = STATUSES.IDLE;
            })
            .addCase(getAssignWorks.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            })

            // verify work
            .addCase(verifyAssignWork.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })

            .addCase(verifyAssignWork.fulfilled, (state, action) => {
                state.data = action.payload;
                alert(JSON.stringify(action.payload.status));
                // getAssignWorks("62c827689c1d4cb814ead866");
                state.status = STATUSES.IDLE;
                // return state.filter((item, i) => i !== action.payload.index)
                // return state.filter((item) => item._id !== action.payload);
            })

            .addCase(verifyAssignWork.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            })
    },
});

export const { setProducts, setStatus } = assignWorkSlice.actions;
export default assignWorkSlice.reducer;

// Thunks
export const getAssignWorks = createAsyncThunk('assignWork/get', async (user_id) => {
    const res = await fetch(Config.API_URL+'user-assign-works/'+user_id);
    const data = await res.json();
    return data;
});

export const verifyAssignWork = createAsyncThunk('assignWork/verify', async (work_id) => {
    const res = await fetch(Config.API_URL+'verify-submit-work/'+work_id);
    const data = await res.json();
    return data;
});

