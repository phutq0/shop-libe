import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAppLoading: true
}

const appSlice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        setIsAppLoading: (state, { payload }) => {
            state.isAppLoading = payload
        }
    },
});

const { reducer: appReducer, actions } = appSlice;
const { setIsAppLoading } = actions;

export default appReducer
export { setIsAppLoading }