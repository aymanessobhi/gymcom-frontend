import { createModule } from "saga-slice";
import { call, put } from "redux-saga/effects";
import { create, deleteRec, downloadFile, find, list, update, uploadData } from "../services/inscriptionService";

const inscriptionSlice = createModule({
    name: "inscription",
    initialState: {
        inscriptions: [],
        isFetching: false,
        error: null
    },
    reducers: {
        create: (state) => {
            state.isFetching = true;
        },
        list: (state) => {
            state.isFetching = true;
        },
        find: (state) => {
            state.isFetching = true;
        },
        update: (state) => {
            state.isFetching = true;
        },
        uploadFile: (state) => {
            state.isFetching = true;
        },
        delete: (state) => {
            state.isFetching = true;
        },
        downloadFile: (state) => {
            state.isFetching = true;
          },
        fetchedData: (state, payload) => {
            state.inscriptions = payload.body;
        },
        finishFetching: (state) => {
            state.isFetching = false;
        },
        fetchError: (state) => {
            state.isFetching = false;
            state.error = "An error occured";
        },
    },
    sagas: (A) => ({
        *[A.update]({ payload }) {
            try {
                const { data } = yield update(payload.data);
                yield put(A.finishFetching());
                yield call(payload.onSuccess, data);
            } catch (e) {
                console.log(e);
                yield put(A.finishFetching());
                yield put(A.fetchError());
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
        *[A.delete]({payload}) {
            try {
                yield deleteRec(payload.id);
                yield put(A.finishFetching());
                yield call(payload.onSuccess);
            } catch (e) {
                console.log(e);
                yield put(A.finishFetching());
                yield put(A.fetchError());
                if (payload.onError) {
                    yield call(payload.onError, e); 
                }
            }
        },
        *[A.create]({payload}) {
            try {
                const { data } =  yield create(payload.data);
                yield put(A.finishFetching());
                yield call(payload.onSuccess, data?.body);
            } catch (e) {
                console.log(e);
                yield put(A.finishFetching());
                yield put(A.fetchError());
            }
        },
        *[A.find]({payload}) {
            try {
                const {data} = yield find(payload.id);
                yield put(A.finishFetching());
                yield call(payload.onSuccess, data.body);
            } catch (e) {
                console.log(e);
                yield put(A.finishFetching());
                yield put(A.fetchError());
            }
        },
        *[A.list]() {
            try {
                const { data } = yield list();
                yield put(A.finishFetching());
                yield put(A.fetchedData(data));
            } catch (e) {
                console.log(e);
                yield put(A.finishFetching());
                yield put(A.fetchError());
            }
        }
    })
})

export default inscriptionSlice;
export const inscriptionActions = inscriptionSlice.actions;
