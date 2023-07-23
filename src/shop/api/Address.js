import baseApi from "./baseApi";

const createAddress = (params) => {
    const url = `/address`;

    return baseApi.post(url, params);
}

const getListAddress = (params) => {
    const url = `/address`;

    return baseApi.get(url, { params });
}

const address = {
    createAddress,
    getListAddress
}

export default address