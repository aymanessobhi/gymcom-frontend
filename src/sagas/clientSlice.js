import { call, put } from "redux-saga/effects";
import { createModule } from "saga-slice";
import {  downloadFile, findClientById,  loadClients, saveClient ,  setPrincipleImage, updateClient , uploadData, uploadImageClient } from "../services/clientService";

const clientSlice = createModule({
    name:"client",
    initialState:{
        clients:[],
        current:null,
        isFetching:false,
        error:null,
        total:0,
    },
    reducers:{
        fetchClients: (state) => {
            state.isFetching = true;
        },
        finishFetching: (state) => {
            state.isFetching = false;
        },
        fetchSuccess: (state, payload) => {
            state.clients = payload.body.content;
        },
        findByIdSuccess: (state, payload) => {
            state.current = payload;
        },
        fetchError: (state) => {
            state.error = "An error occured";
        },
        findById: (state) => {
            state.isFetching = true;
        },
        addClient: (state) =>{
            state.isFetching = true;
        },
        deleteClient: (state) =>{
            state.isFetching = true;
        },
        editClient: (state) =>{
            state.isFetching = true;
        },
        upload: (state) => {
            state.isFetching = true;
        },
        choosePrinciple : (state) => {
            state.isFetching = true;
        },
    },

    sagas: (A) =>({
        *[A.fetchClients]({payload}) {
            try{
                console.log(payload)
                const {data} = yield loadClients(payload.page, payload.size);
                yield put(A.finishFetching());
                yield put(A.fetchSuccess(data));
            }catch(e){
                console.log(e)
                yield put(A.finishFetching());
                yield put(A.fetchError());
            }   
        },
        *[A.findById]({payload}) {
            try{
                console.log(payload)
                const {data} = yield findClientById(payload);
                console.log(data)
                yield put(A.finishFetching());
                yield put(A.findByIdSuccess(data));
            }catch(e){
                console.log(e)
                yield put(A.finishFetching());
                yield put(A.fetchError());
            }   
        },
        *[A.addClient]({payload}){
            console.log('im ehet',payload);
            // try{
            //     console.log("addClients payload", payload);
            //     const {data} =  yield saveClient(payload.data);
            //     yield call(payload.onSuccess, data);
            // }catch(e){
            //     console.log(e)
            //     yield put(A.finishFetching());
            //     yield put(A.fetchError());
            //     yield call(payload.onError, e);
            // }
        },
        *[A.deleteClient]({payload}){
            try{
                console.log("deleteClient  payload", payload);
            }catch(e){
                yield put(A.finishFetching());
                yield put(A.fetchError());
            }
        },
        *[A.editClient]({payload}){
            try{
                console.log("editProduct payload", payload);
                const {data} =  yield updateClient(payload.updated,payload.id);
                yield put(A.fetchProducts());
                yield call(payload.onSuccess, data);
            }catch(e){
                yield put(A.finishFetching());
                yield put(A.fetchError());
                yield call(payload.onError, e);
            }
        },
        *[A.uploadFile]({payload}) {
            try {
                const { data } = yield uploadData(payload.formData);
                yield put(A.finishFetching());
                yield call(payload.onSuccess, data?.body);
            } catch (e) {
                console.log(e);
                yield put(A.finishFetching());
                yield put(A.fetchError());
            }
        },
        *[A.downloadFile]({ payload }) {
            try {
              const { data } = yield downloadFile(payload.filename);
              yield put(A.finishFetching());
              yield call(payload.onSuccess(data));
            } catch (e) {
              console.log(e);
              yield put(A.finishFetching());
              yield put(A.fetchError());
            }
          },
    })
})

export default clientSlice;
export const clientActions = clientSlice.actions;

