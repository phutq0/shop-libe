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
    Utils.global.accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJwaHVsZUBnbWFpbC5jb20iLCJyb2xlIjoxLCJpYXQiOjE2OTAwOTI1MDcsImV4cCI6MTY5MDk1NjUwN30.2zBUmkj3i14MvwPNv7FVTA45cX2M-d-9ldO5AFxLwCQ";
    const accessToken = Utils.global.accessToken;
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

baseApi.interceptors.response.use(
    (response) => {
        console.log("[RESPONSE]:", response);
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