
// Front
import Layout from './layout/reducer';

// Authentication Module
import Forget from './auth/forgetpwd/reducer';
import { rootReducer } from 'saga-slice';
import userSlice from './auth/login/userSlice';


const modules = [userSlice,];

const appReducer = rootReducer(modules, {
    // public
    Layout,
    Forget,
});


export default appReducer;