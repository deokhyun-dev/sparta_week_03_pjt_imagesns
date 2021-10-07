import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { Grid, Text, Button, Image, Input } from "../elements";
import Upload from "../shared/Upload";

const PostWriteUpdate = props => {
  const is_login = useSelector(state => state.user.is_login);
  const { history } = props;

  const is_edit = false;

  const [contents, setContents] = useState("");
  const changeContent = e => {
    setContents(e.target.value);
  };

  const addPost = () => {
    console.log("애드 포스트");
  };

  const editPost = () => {
    console.log("에딧 포스트");
  };

  if (!is_login) {
    return (
      <Grid margin="100px 0px" padding="16px" center>
        <Text size="32px" bold>
          앗 잠깐!
        </Text>
        <Text size="16px" bold>
          로그인 후에만 글을 쓸 수 있어요!
        </Text>
        <Button _onClick={() => history.replace("/login")}>로그인</Button>
      </Grid>
    );
  }

  return (
    <>
      <Grid padding="16px">
        <Text margin="0px" size="36px" bold>
          게시글 작성
        </Text>
        <Upload />
      </Grid>

      <Grid>
        <Grid padding="16px">
          <Text margin="0px" size="24px" bold>
            미리보기
          </Text>
        </Grid>
        <Image
          src={
            "https://pyxis.nymag.com/v1/imgs/949/b6c/f0aa0346a0b0aeda3a8451644c42cb582e-no-time-to-die.rsquare.w1200.jpg"
          }
          shape="rectangle"
        />
      </Grid>
      <Grid padding="16px">
        <Input
          value={contents}
          label="게시글 내용"
          placeholder="게시글 작성"
          multiLine
          _onChange={e => changeContent(e)}
        />
      </Grid>

      <Grid padding="16px">
        {is_edit ? (
          <Button text="게시글 수정" _onClick={editPost}></Button>
        ) : (
          <Button text="게시글 작성" _onClick={addPost}></Button>
        )}
      </Grid>
    </>
  );
};

export default PostWriteUpdate;
