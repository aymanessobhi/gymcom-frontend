import { all } from 'redux-saga/effects'

//public
import forgetSaga from './auth/forgetpwd/saga';
import LayoutSaga from './layout/saga';

export default function* appSaga() {
    yield all([

        //public
        forgetSaga(),
        LayoutSaga(),
    ])
}