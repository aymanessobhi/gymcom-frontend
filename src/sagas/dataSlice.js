import { call, put } from "redux-saga/effects";
import { createModule } from "saga-slice";
import { loadData } from "../services/dataService";

const dataSlice = createModule({
    name: "data",
    initialState: {
        genre:[],
        documentType:[],
        status:[],
        typePaiement:[],
        typeAbonnement:[],
        typeHandi:[],
        situation:[],
        isFetching: false,
        error: null
    },
    reducers: {
        loadData: (state) => {
            state.isFetching = true;
        },
        fetchedData: (state, payload) => {
            state.genre = payload.body.genre;
            state.typeAbonnement = payload.body.typeAbonnement;
            state.documentType = payload.body.documentType;
            state.typePaiement = payload.body.typePaiement; 
            state.status = payload.body.status;
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
        *[A.loadData]({ payload }) {
            try {
                const { data } = yield loadData();
                yield put(A.finishFetching());
                yield put(A.fetchedData(data));
            } catch (e) {
                console.log(e);
                yield put(A.finishFetching());
                yield put(A.fetchError());
            }
        },
    })
})

export default dataSlice;
export const dataActions = dataSlice.actions;
