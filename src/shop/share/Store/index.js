import { configureStore, applyMiddleware, compose } from "@reduxjs/toolkit";
import accountReducer from "../slices/Account";
import appReducer from "../slices/App";

const reducer = {
    account: accountReducer,
    app: appReducer
}

const logger = (_store) => (next) => (action) => {
    return next(action);
}

const store = configureStore({
    reducer: reducer,
    devTools: true,
    enhancers: [compose(applyMiddleware(logger))],
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

export default store