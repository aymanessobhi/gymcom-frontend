import { call, put } from "redux-saga/effects";
import { createModule } from "saga-slice";
import { login } from "./userService";
import { DASHBOARD_PAGE } from "../../../routes/routeConstants";

const userSlice = createModule({
  name: "user",
  initialState: {
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    login: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, payload) => {
      state.token = payload.accessToken;
      state.loading = false;
    },
    finishFetching: (state) => {
      state.loading = false;
    },
    logout: (state) => {
      
    },
    fetchError: (state) => {
      state.loading = false;
      state.error = "An error occured";
    },
  },
  sagas: (A) => ({
    *[A.login]({ payload: { user, history }}) {
      try {
        const { data } = yield login(user);
        localStorage.setItem("authUser", JSON.stringify(data));
        yield put(A.loginSuccess(data));
        yield put(A.finishFetching());
        history(DASHBOARD_PAGE);
      } catch (e) {
        console.log(e);
        yield put(A.finishFetching());
        yield put(A.fetchError());
      }
    },
    *[A.logout]({ payload: { history } }) {
      try {
        localStorage.removeItem("authUser");
        history('/login');
      } catch (e) {
        console.log(e);
        yield put(A.finishFetching());
        yield put(A.fetchError());
      }
    },
    
  }),
});

export default userSlice;
export const userActions = userSlice.actions;