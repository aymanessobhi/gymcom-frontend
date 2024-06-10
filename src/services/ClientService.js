import axios from "axios";
import config from "../config";

export const loadClients = (page,size) => {
    return axios.get(`${config.url}/Client/list?page=${page}&size=${size}`, {
      headers: {
        "Content-type": "application/json"
      },
    });
}


export const findClientById = (id) => {
  return axios.get(`${config.url}/client/${id}`, {
    headers: {
      "Content-type": "application/json"
    },
  });
}


export const saveClient = (request) => {
    let headers = { "Content-type": "application/json" }
    return axios.post(`${config.url}/client/create`, JSON.stringify(request), { headers: headers });
}


export const updateClient = (updated, id) => {
  let headers = { "Content-type": "application/json" }
  return axios.put(`${config.url}/client/${id}`, JSON.stringify(updated), { headers: headers });
}

export const uploadData = async (formData) => {
  let headers = { "Content-type": "multipart/form-data"}
  return await axios.post(`${config.baseURL}/inscription/upload`, formData, { headers: headers });
};

export const downloadFile = async (filename) => {
  return await axios.get(`${config.baseURL}/inscription/load?filename=${filename}`);
};


export const deleteImage = (fileId) => {
  return axios.delete(`${config.url}/client/delete/${fileId}`);
}