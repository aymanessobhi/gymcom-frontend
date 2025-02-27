import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'

import userSlice from '../sagas/userSlice';


import appReducer from './reducers';
import { rootSaga } from 'saga-slice';
import appSaga from './sagas';
import dataSlice from '../sagas/dataSlice';
import inscriptionSlice from '../sagas/inscriptionSlice';
import paiementSlice from '../sagas/paiementSlice';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const modules = [userSlice,dataSlice, inscriptionSlice, paiementSlice ];

const store = createStore(appReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga(modules));
sagaMiddleware.run(appSaga);

export default store;