import { rootReducer } from 'saga-slice';

// Front
import Layout from './layout/reducer';
import Forget from './auth/forgetpwd/reducer';
import clientSlice from '../sagas/clientSlice';
import userSlice from '../sagas/userSlice';
import dataSlice from '../sagas/dataSlice';
import inscriptionSlice from '../sagas/inscriptionSlice';
import paiementSlice from '../sagas/paiementSlice';

const modules = [userSlice,clientSlice, dataSlice, inscriptionSlice, paiementSlice ];

const appReducer = rootReducer(modules, {
    // public
    Layout,
    Forget,
});

export default appReducer;