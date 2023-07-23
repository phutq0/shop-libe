import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "shop/api";

const thunkGetProduct = createAsyncThunk(
    "thunkGetProduct",
    async (params) => {
        return Api.product.getListProduct(params);
    }
)

const initialState = {
    listProduct: [],
    page: 1,
    step: 10,
    total: 1,
    isLoading: true
}

const productSlice = createSlice({
    name: "product",
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
        builder.addCase(thunkGetProduct.fulfilled, (state, { payload }) => {
            state.listProduct = payload.data.productList;
            state.total = payload.data.total;
            state.isLoading = false;
        }).
            addCase(thunkGetProduct.pending, (state, { }) => {
                state.isLoading = true;
            })
    }
});

const { reducer: productReducer, actions } = productSlice;
const { setPage, setStep } = actions;

export default productReducer
export { setPage, setStep, thunkGetProduct }