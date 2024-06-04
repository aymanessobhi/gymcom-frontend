import instance from "../../../helpers/AxiosInterceptor";
import config from "../../../helpers/config";


export const login = (query) => {
    let headers = {
        "Content-type": "application/json",
    };
    return instance.post(`${config.baseURL}/auth/login`, JSON.stringify(query), {
        headers: headers,
    });
};