import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "shop/api";

const thunkGetCart = createAsyncThunk(
    "thunkGetCart",
    async () => {
        return Api.cart.getCart();
    }
)

const initialState = {
    listProduct: [],
    listProductDetail: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        setListProductDetail: (state, { payload }) => {
            state.listProductDetail = payload
        },
    },
    extraReducers: builder => {
        builder.addCase(thunkGetCart.fulfilled, (state, { payload }) => {
            state.listProduct = payload.data;
        })
    }
});

const { reducer: cartReducer, actions } = cartSlice;
const { setListProductDetail } = actions;

export default cartReducer
export { setListProductDetail, thunkGetCart }