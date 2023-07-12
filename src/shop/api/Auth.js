import baseApi from "./baseApi"

const register = (params) => {
    const url = "/auth/register";

    return baseApi.post(url, params);
}

const login = (params) => {
    const url = "/auth/login";

    return baseApi.post(url, params);
}

const getUserInformation = (userId) => {
    const url = `/user/:${userId}`;

    return baseApi.get(url);
}

const auth = {
    register,
    login,
    getUserInformation
}

export default auth