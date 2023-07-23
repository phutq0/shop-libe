import baseApi from "./baseApi";

const createCollection = (data) => {
    const url = `/collection`;

    return baseApi.post(url, data, {
        headers: { "Content-Type": "multipart/form-data" }
    });
}

const deleteCollection = (collectionId) => {
    const url = `/collection/${collectionId}`;

    return baseApi.delete(url);
}

const getListCollection = (params) => {
    const url = `/collection`;

    return baseApi.get(url, { params })
}

const collection = {
    getListCollection,
    createCollection,
    deleteCollection
}

export default collection