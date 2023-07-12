import axios from "axios";
import Utils from "../share/Utils";

const RESULT_CODE = {
    SUCCESS: 1,
    FAIL: 2
}

const baseApi = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
    headers: {
        "content-type": "application/json",
    }
});

baseApi.interceptors.request.use(async (config) => {
    // debug call api
    console.log(
        `[Axios send request]\n\t- [URL] ${config.baseURL}${config.url},\n\t- [Method]: ${config.method.toUpperCase()},\n\t- [Payload]: ${config.method === "post" || config.method === "put"
            ? JSON.stringify(config.data)
            : JSON.stringify(config.params)
        }`
    );
    const accessToken = Utils.global.accessToken;
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

baseApi.interceptors.response.use(
    (response) => {
        console.log(JSON.stringify(response));
        return {
            result: RESULT_CODE.SUCCESS,
            data: response.data,
            headers: response.headers
        }
    },
    async (error) => {
        // debugger
        // console.log(JSON.stringify(error));
        // console.log("==========================");
        // console.log(error.response);
        // console.log("==========================");
        if (!error.response) {
            return {
                result: RESULT_CODE.FAIL,
                data: error.response.data
            }
        }
        if (error.response) {
            return {
                result: RESULT_CODE.FAIL,
                data: error.response.data
            }
        }
    }
);

export default baseApi
export { RESULT_CODE }