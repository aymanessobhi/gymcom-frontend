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

export const uploadImageClient = (formData) => {
    
  return axios.post(`${config.url}/client/upload`, formData, {
    headers: {
      'content-type': 'multipart/form-data'
    },
  });
}

export const setPrincipleImage = (id) => {
    
  return axios.put(`${config.url}/client/image/principle/${id}`, {
    headers: {
      'content-type': 'application/json'
    }
  });
}

export const setPrincipleClientImage = (id) => {
  return axios.put(`${config.url}/client/image/principle/${id}`, {
    headers: {
      'content-type': 'application/json'
    }
  });
}

export const deleteImage = (fileId) => {
  return axios.delete(`${config.url}/client/delete/${fileId}`);
}