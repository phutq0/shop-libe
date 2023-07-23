import { configureStore, applyMiddleware, compose } from "@reduxjs/toolkit";
import accountReducer from "../slices/Account";
import appReducer from "../slices/App";
import productReducer from "../slices/Product";
import collectionReducer from "../slices/Collection";
import cartReducer from "../slices/Cart";

const reducer = {
    account: accountReducer,
    app: appReducer,
    product: productReducer,
    collection: collectionReducer,
    cart: cartReducer
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