import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore, storage } from "../../shared/firebase";
import moment from "moment";
import { actionCreators as imageActions } from "./image";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const LOADING = "LOADING";

const setPost = createAction(SET_POST, (post_list, paging) => ({
  post_list,
  paging,
}));
const addPost = createAction(ADD_POST, post => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));
const loading = createAction(LOADING, is_loading => ({ is_loading }));

const initialState = {
  list: [],
  is_loading: false,
  paging: { start: null, next: null, size: 3 },
};

const initialPost = {
  image_url: "https://www.007.com/wp-content/uploads/2020/05/B25_11846_RC.jpg",
  contents: "노타임투다이",
  like_cnt: 0,
  insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
  good_user: [],
};

const addPostFB = post => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");
    const _image = getState().image.preview;
    const _user = getState().user.user;

    const user_info = {
      user_name: _user.user_name,
      user_profile: "",
      user_id: _user.uid,
    };

    const _post = {
      ...initialPost,
      contents: post,
    };

    const _upload = storage
      .ref(`images/${user_info.user_id}_${new Date().getTime()}`)
      .putString(_image, "data_url");

    _upload.then(snapshot => {
      snapshot.ref
        .getDownloadURL()
        .then(url => {
          return url;
        })
        .then(url => {
          postDB
            .add({ ...user_info, ..._post, image_url: url })
            .then(doc => {
              let post = {
                user_info,
                ..._post,
                id: doc.id,
                image_url: url,
              };
              dispatch(addPost(post));
              history.replace("/");
              dispatch(imageActions.setPreview(null));
            })
            .catch(error => {
              window.alert("포스트 작성 에러남");
              console.log("작성 실패", error);
            });
        })
        .catch(err => {
          window.alert("이미지 업로드 에러");
          console.log("이미지 업로드 문제생김", err);
        });
    });

    return null;
  };
};

const setPostFB = (start = null, size = 3) => {
  return function (dispatch, getState, { history }) {
    // state에서 페이징 정보 가져오기
    let _paging = getState().post.paging;

    if (_paging.start && !_paging.next) {
      return;
    }

    dispatch(loading(true));

    const postDB = firestore.collection("post");

    let query = postDB.orderBy("insert_dt", "desc");

    if (start) {
      query = query.startAt(start);
    }

    query
      .limit(size + 1)
      .get()
      .then(docs => {
        let post_list = [];

        let paging = {
          start: docs.docs[0],
          next:
            docs.docs.length === size + 1
              ? docs.docs[docs.docs.length - 1]
              : null,
          size: size,
        };

        docs.forEach(doc => {
          let _post = doc.data();

          let post = Object.keys(_post).reduce(
            (acc, cur) => {
              if (cur.indexOf("user_") !== -1) {
                return {
                  ...acc,
                  user_info: {
                    ...acc.user_info,
                    [cur]: _post[cur],
                  },
                };
              }
              return { ...acc, [cur]: _post[cur] };
            },
            { id: doc.id, user_info: {} }
          );
          post_list.push(post);
        });

        dispatch(setPost(post_list, paging));
      });
  };
};

const editPostFB = (post_id = null, post = {}) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) {
      console.log("게시물 정보가 없어요!");
      return;
    }

    const _image = getState().image.preview;

    const _post_idx = getState().post.list.findIndex(p => p.id === post_id);
    const _post = getState().post.list[_post_idx];

    const postDB = firestore.collection("post");

    if (_image === _post.image_url) {
      postDB
        .doc(post_id)
        .update(post)
        .then(doc => {
          dispatch(editPost(post_id, { ...post }));
          history.replace("/");
        });
    } else {
      const user_id = getState().user.user.uid;
      const _upload = storage
        .ref(`images/${user_id}_${new Date().getTime()}`)
        .putString(_image, "data_url");

      _upload.then(snapshot => {
        snapshot.ref
          .getDownloadURL()
          .then(url => {
            console.log(url);
            return url;
          })
          .then(url => {
            postDB
              .doc(post_id)
              .update({ ...post, image_url: url })
              .then(doc => {
                dispatch(
                  editPost(post_id, {
                    ...post,
                    image_url: url,
                  })
                );
                history.replace("/");
              });
          })
          .catch(err => {
            window.alert("이미지 업로드 잣됨");
            console.log("이미지 업로드 잣됨", err);
          });
      });
    }
  };
};

export default handleActions(
  {
    [ADD_POST]: (state, action) =>
      produce(state, draft => {
        draft.list.unshift(action.payload.post);
        draft.is_loading = false;
      }),
    [LOADING]: (state, action) =>
      produce(state, draft => {
        draft.is_loading = action.payload.is_loading;
      }),
    [SET_POST]: (state, action) =>
      produce(state, draft => {
        draft.list.push(...action.payload.post_list);
        draft.list = draft.list.reduce((acc, cur) => {
          // cur에 postlist값이 하나하나 들어올텐데
          // postlist id와 cur id가 같은게 없으면 -1
          // -1인 값만 acc에 넣어주기
          if (acc.findIndex(a => a.id === cur.id) === -1) {
            return [...acc, cur];
          } else {
            acc[acc.findIndex(a => a.id === cur.id)] = cur;
            return acc;
          }
        }, []);
        if (action.payload.paging) {
          draft.paging = action.payload.paging;
        }
        // 로딩 끝나면 바꿔줘야지
        draft.is_loading = false;
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, draft => {
        let idx = draft.list.findIndex(p => p.id === action.payload.post_id);
        draft.list[idx] = {
          ...draft.list[idx],
          ...action.payload.post,
        };
      }),
  },
  initialState
);

const actionCreators = {
  addPostFB,
  editPostFB,
  setPostFB,
};

export { actionCreators };
