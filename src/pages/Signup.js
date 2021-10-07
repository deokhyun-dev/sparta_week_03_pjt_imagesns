import React, { useState } from "react";
import { Grid, Text, Input, Button } from "../elements";
import { emailCheck } from "../shared/common";
import { useDispatch, useSelector } from "react-redux";

import { actionCreators as userActions } from "../redux/modules/user";

const Signup = props => {
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [user_name, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwd_check, setPwdCheck] = useState("");
  const is_login = useSelector(state => state.user.is_login);

  const signup = () => {
    if (id === "" || pwd === "" || user_name === "") {
      window.alert("아이디, 패스워드, 닉네임을 모두 입력해주세요!");
      return;
    }

    if (!emailCheck(id)) {
      window.alert("이메일 형식이 맞지 않습니다!");
      return;
    }

    if (pwd !== pwd_check) {
      window.alert("패스워드와 패스워드 확인이 일치하지 않습니다!");
      return;
    }

    dispatch(userActions.signupFB(id, pwd, user_name));
  };

  if (!is_login) {
    return (
      <>
        <Grid>
          <Text size="32px" bold>
            회원가입
          </Text>
          <Grid padding="16px">
            <Input
              label="아이디"
              placeholder="아이드를 입력해주세요"
              type="text"
              value={id}
              _onChange={e => {
                setId(e.target.value);
              }}
            />
          </Grid>

          <Grid padding="16px">
            <Input
              label="닉네임"
              placeholder="아이드를 입력해주세요"
              type="text"
              value={user_name}
              _onChange={e => {
                setUsername(e.target.value);
              }}
            />
          </Grid>

          <Grid padding="16px">
            <Input
              label="패스워드"
              placeholder="아이드를 입력해주세요"
              type="password"
              value={pwd}
              _onChange={e => {
                setPwd(e.target.value);
              }}
            />
          </Grid>

          <Grid padding="16px">
            <Input
              label="패스워드 확인"
              placeholder="아이드를 입력해주세요"
              type="password"
              value={pwd_check}
              _onChange={e => {
                setPwdCheck(e.target.value);
              }}
            />
          </Grid>

          <Grid padding="16px">
            <Button _onClick={signup}>회원가입</Button>
          </Grid>
        </Grid>
      </>
    );
  }
};

export default Signup;
