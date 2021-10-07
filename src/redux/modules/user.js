import { createAction, handleActions } from "redux-actions";
import produce from "immer";

import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";
import { auth } from "../../shared/firebase";

const SET_USER = "SET_USER";
const GET_USER = "GET_USER";
const LOGOUT = "LOGOUT";

const setUser = createAction(SET_USER, user => ({ user }));
const getUser = createAction(GET_USER, user => ({ user }));
const logout = createAction(LOGOUT, user => ({ user }));

const initialState = {
  user: null,
  is_loagin: false,
};

const loginAction = user => {
  return function (dispatch, getState, { history }) {
    dispatch(setUser(user));
    history.push("/");
  };
};

const signupFB = user => {
  return function (dispatch, getState, { history }) {
    return null;
  };
};

export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, draft => {
        setCookie("is_login", "success");

        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOGOUT]: (state, action) =>
      produce(state, draft => {
        draft.user = null;
        deleteCookie("is_login");
        draft.is_login = false;
      }),

    [GET_USER]: (state, action) => produce(state, draft => {}),
  },
  initialState
);

const actionCreators = {
  signupFB,
};
