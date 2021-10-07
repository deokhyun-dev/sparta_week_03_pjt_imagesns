import React, { useState } from "react";
import { Grid, Text, Input, Button } from "../elements";

const Signup = props => {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdCheck, setPwdCheck] = useState("");
  const [is_login, setLogin] = useState(false);

  const signup = () => {
    console.log("회원가입");
  };

  const login = () => {
    console.log("로그인");
  };

  if (!is_login) {
    <>
      <Grid>
        <Text size="32px" bold>
          회원가입
        </Text>
        <Grid padding="16px">
          <Input
            label="아이디"
            placeholder="아이드를 입력해주세요"
            _onChange={() => {}}
          />
        </Grid>

        <Grid padding="16px">
          <Input
            label="패스워드"
            placeholder="아이드를 입력해주세요"
            type="password"
            _onChange={() => {}}
          />
        </Grid>

        <Grid padding="16px">
          <Input
            label="패스워드 확인"
            placeholder="아이드를 입력해주세요"
            type="password"
            _onChange={() => {}}
          />
        </Grid>

        <Grid padding="16px">
          <Button _onClick={signup}>회원가입</Button>
        </Grid>
      </Grid>
    </>;
  }

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
            _onChange={() => {}}
          />
        </Grid>

        <Grid padding="16px">
          <Input
            label="패스워드"
            placeholder="아이드를 입력해주세요"
            type="password"
            _onChange={() => {}}
          />
        </Grid>

        <Grid padding="16px">
          <Button _onClick={login}>로그인</Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Signup;
