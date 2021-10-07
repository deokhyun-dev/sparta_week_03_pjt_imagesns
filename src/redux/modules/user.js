import { createAction, handleActions } from "redux-actions";
import produce from "immer";

import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";
import { auth } from "../../shared/firebase";
import firebase from "firebase/app";
import { isBuffer } from "lodash";

const SET_USER = "SET_USER";
const GET_USER = "GET_USER";
const LOGOUT = "LOGOUT";

const setUser = createAction(SET_USER, user => ({ user }));
const getUser = createAction(GET_USER, user => ({ user }));
const logout = createAction(LOGOUT, user => ({ user }));

const initialState = {
  user: null,
  is_login: false,
};

const loginAction = user => {
  return function (dispatch, getState, { history }) {
    dispatch(setUser(user));
    history.push("/");
  };
};

const signupFB = (id, pwd, user_name) => {
  return function (dispatch, getState, { history }) {
    console.log("리듀서 호출");
    auth.createUserWithEmailAndPassword(id, pwd).then(user => {
      auth.currentUser
        .updateProfile({
          displayName: user_name,
        })
        .then(() => {
          dispatch(
            setUser({
              user_name: user_name,
              id: id,
              user_profile: "",
              uid: user.user.uid,
            })
          );
          history.push("/");
        })
        .catch(err => {
          console.log(err);
        })
        .catch(error => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    });
  };
};

const logoutFB = () => {
  return function (dispatch, getState, { history }) {
    auth.signOut().then(() => {
      dispatch(logout());
      history.replace("/");
    });
  };
};

const loginFB = (id, pwd) => {
  return function (dispatch, getState, { history }) {
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(res => {
      auth
        .signInWithEmailAndPassword(id, pwd)
        .then(user => {
          console.log(user);

          dispatch(
            setUser({
              user_name: user.user.displayName,
              id: id,
              user_profile: "",
              uid: user.user.uid,
            })
          );
          history.push("/");
        })
        .catch(error => {
          var errorCode = error.code;
          var errorMessage = error.message;

          console.log(errorCode, errorMessage);
        });
    });
  };
};

const loginCheckFB = () => {
  return function (dispatch, getState, { history }) {
    auth.onAuthStateChanged(user => {
      if (user) {
        dispatch(
          setUser({
            user_name: user.displayName,
            id: user.email,
            user_profile: "",
            uid: user.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
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
  logoutFB,
  loginFB,
  loginCheckFB,
  setUser,
  getUser,
  logout,
};

export { actionCreators };
