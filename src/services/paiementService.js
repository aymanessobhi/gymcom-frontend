import axios from "axios";
import config from "../helpers/config";
import instance from "../helpers/AxiosInterceptor";



export const uploadData = async (formData) => {
    let headers = { "Content-type": "multipart/form-data"}
    return await axios.post(`${config.baseURL}/paiement/upload`, formData, { headers: headers });
};

export const downloadFile = async (filename) => {
    return await axios.get(`${config.baseURL}/paiement/load?filename=${filename}`);
};

export const list = () => {
    return instance.get(`/paiement/list`);
};

export const find = (id) => {
    return instance.get(`/paiement/find/${id}`);
};

export const create = (request) => {
    return instance.post(`/paiement/create`, JSON.stringify(request));
};

export const update = (request) => {
    return instance.put(`/paiement/update`, JSON.stringify(request));
};

export const deleteRec = (id) => {
    return instance.delete(`/paiement/delete/${id}`);
};
