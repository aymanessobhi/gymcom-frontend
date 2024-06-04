import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'

import appReducer from './reducers';
import userSlice from './auth/login/userSlice';
import { rootSaga } from 'saga-slice';
import appSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const modules = [userSlice ];

const store = createStore(appReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga(modules));
sagaMiddleware.run(appSaga);

export default store;