import axios from "axios";
import config from "../helpers/config";
import instance from "../helpers/AxiosInterceptor";



export const uploadData = async (formData) => {
    let headers = { "Content-type": "multipart/form-data"}
    return await axios.post(`${config.baseURL}/inscription/upload`, formData, { headers: headers });
};

export const downloadFile = async (filename) => {
    return await axios.get(`${config.baseURL}/inscription/load?filename=${filename}`);
};

export const list = () => {
    return instance.get(`/inscription/list`);
};

export const find = (id) => {
    return instance.get(`/inscription/find/${id}`);
};

export const create = (request) => {
    return instance.post(`/inscription/create`, JSON.stringify(request));
};

export const update = (request) => {
    return instance.put(`/inscription/update`, JSON.stringify(request));
};

export const deleteRec = (id) => {
    return instance.delete(`/inscription/delete/${id}`);
};
