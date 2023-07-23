import baseApi from "./baseApi";

const getCart = () => {
    const url = `/cart`;

    return baseApi.get(url)
}

const addToCart = (productId) => {
    const url = `/cart/${productId}`;

    return baseApi.post(url);
}

const removeFromCart = (productId) => {
    const url = `/cart/${productId}`;

    return baseApi.delete(url);
}

const cart = {
    getCart,
    addToCart,
    removeFromCart
}

export default cart