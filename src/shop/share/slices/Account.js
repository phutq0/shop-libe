import { createSlice } from "@reduxjs/toolkit";

const getAccount = () => {
    const data = localStorage.getItem("account");
    if (data) {
        return JSON.parse(data);
    }
    return null
}

const initialState = {
    account: getAccount()
}

const accountSlice = createSlice({
    name: "account",
    initialState: initialState,
    reducers: {
        setAccount: (state, { payload }) => {
            state.account = payload
        }
    },
    extraReducers: (builder) => { }
});

const { reducer: accountReducer, actions } = accountSlice;
const { setAccount } = actions;

export default accountReducer
export { setAccount }