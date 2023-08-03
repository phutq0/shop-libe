import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "api2";

const thunkGetCart = createAsyncThunk(
    "thunkGetCart",
    async (accountId) => {
        return Api.cart.getCart(accountId);
    }
)

const initialState = {
    listModel: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        setListModel: (state, { payload }) => {
            state.listModel = payload
        },
    },
    extraReducers: builder => {
        builder.addCase(thunkGetCart.fulfilled, (state, { payload }) => {
            console.log(payload);
            state.listModel = payload.cart;
        })
    }
});

const { reducer: cartReducer, actions } = cartSlice;
const { setListModel } = actions;

export default cartReducer
export { setListModel, thunkGetCart }