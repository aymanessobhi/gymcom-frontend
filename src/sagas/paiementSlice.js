import { createModule } from "saga-slice";
import { call, put } from "redux-saga/effects";
import { create, deleteRec, downloadFile, find, list, update, uploadData } from "../services/paiementService";

const paiementSlice = createModule({
    name: "paiement",
    initialState: {
        paiements:[],
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
        delete: (state) => {
            state.isFetching = true;
        },
        fetchedData: (state, payload) => {
            state.paiements = payload.body;
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
        *[A.delete]({payload}) {
            try {
                yield deleteRec(payload.id);
                yield put(A.finishFetching());
                yield call(payload.onSuccess);
            } catch (e) {
                console.log(e);
                yield put(A.finishFetching());
                yield put(A.fetchError());
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
                if (payload.onError) {
                    yield call(payload.onError, e); 
                }
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
                console.log("we",data)
                yield put(A.fetchedData(data));
            } catch (e) {
                console.log(e);
                yield put(A.finishFetching());
                yield put(A.fetchError());
            }
        }
    })
})

export default paiementSlice;
export const paiementActions = paiementSlice.actions;
