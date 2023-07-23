import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "shop/api";

const thunkGetCollection = createAsyncThunk(
    "thunkGetCollection",
    async (params) => {
        return Api.collection.getListCollection(params);
    }
)

const initialState = {
    listCollection: [],
    page: 1,
    step: 10,
    total: 1,
    isLoading: true
}

const collectionSlice = createSlice({
    name: "collection",
    initialState: initialState,
    reducers: {
        setPage: (state, { payload }) => {
            state.page = payload
        },
        setStep: (state, { payload }) => {
            state.step = payload
        },
    },
    extraReducers: builder => {
        builder.addCase(thunkGetCollection.fulfilled, (state, { payload }) => {
            state.listCollection = payload.data.list;
            state.total = payload.data.total;
            state.isLoading = false;
        }).
            addCase(thunkGetCollection.pending, (state, { }) => {
                state.isLoading = true;
            })
    }
});

const { reducer: collectionReducer, actions } = collectionSlice;
const { setPage, setStep } = actions;

export default collectionReducer
export { setPage, setStep, thunkGetCollection }