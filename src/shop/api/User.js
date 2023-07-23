import baseApi from "./baseApi";



const getListUser = (params) => {

    const url = `/user`;

    return baseApi.get(url, { params });
}

const user = {
    getListUser
}

export default user
