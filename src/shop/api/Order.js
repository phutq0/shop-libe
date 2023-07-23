import baseApi from "./baseApi";


const createOrder = (params) => {
    const url = `/order/create`;

    return baseApi.post(url, params)
}

const changeStatus = (params) => {
    const url = `/order/change-status`;

    return baseApi.post(url, params);
}

const order = {
    createOrder,
    changeStatus
}

export default order