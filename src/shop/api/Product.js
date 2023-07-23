import baseApi from "./baseApi";

const createProduct = (data) => {
    const url = `/product`;

    return baseApi.post(url, data, {
        headers: { "Content-Type": "multipart/form-data" }
    });
}

const getProductInformation = (productId) => {
    const url = `/product/${productId}`;

    return baseApi.get(url);
}


const deleteProduct = (productId) => {
    const url = `/product/${productId}`;

    return baseApi.delete(url);
}

const getListProduct = (params) => {
    const url = `/product`;

    return baseApi.get(url, { params });
}

const product = {
    createProduct,
    getListProduct,
    deleteProduct,
    getProductInformation
}

export default product