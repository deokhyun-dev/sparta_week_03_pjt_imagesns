import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

import { Grid } from "../elements";
import InfinityScroll from "../shared/InfinityScroll";
import Post from "../components/Post";

const Main = props => {
  const dispatch = useDispatch();
  const { history } = props;
  const post_list = useSelector(state => state.post.list);
  const user_info = useSelector(state => state.user.user);
  const is_loading = useSelector(state => state.post.is_loading);
  const paging = useSelector(state => state.post.paging);

  useEffect(() => {
    dispatch(postActions.setPostFB());
  }, []);
  return (
    <>
      <Grid bg="#f2f2f2" padding="20px 0px 0px 0px">
        <InfinityScroll
          callNext={() => {
            dispatch(postActions.setPostFB(paging.next));
          }}
          is_next={paging.next ? true : false}
          loading={is_loading}
        >
          {post_list.map((p, idx) => {
            if (user_info && p.user_info.user_id === user_info.uid) {
              return (
                <Grid bg="white" key={p.id}>
                  <Post {...p} is_me />
                </Grid>
              );
            } else {
              return <Post key={p.id} {...p} />;
            }
          })}
        </InfinityScroll>
      </Grid>
    </>
  );
};

export default Main;
