import { rootReducer } from 'saga-slice';

// Front
import Layout from './layout/reducer';
import Forget from './auth/forgetpwd/reducer';
import clientSlice from '../sagas/clientSlice';
import userSlice from '../sagas/userSlice';




const modules = [userSlice,clientSlice ];

const appReducer = rootReducer(modules, {
    // public
    Layout,
    Forget,
});

export default appReducer;