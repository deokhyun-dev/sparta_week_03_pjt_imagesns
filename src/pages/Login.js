import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import { Grid, Input, Text, Button } from "../elements";

const Login = props => {
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const login = () => {
    dispatch(userActions.loginFB(id, pwd));
  };
  return (
    <>
      <Grid>
        <Text size="32px" bold>
          로그인
        </Text>
        <Grid padding="16px">
          <Input
            label="아이디"
            placeholder="아이드를 입력해주세요"
            value={id}
            _onChange={e => {
              setId(e.target.value);
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
          <Button _onClick={login}>로그인</Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
