import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import { Grid, Button } from "../elements/";

function Header() {
  const history = useHistory();
  const [is_login, setLogin] = useState(false);

  if (is_login) {
    <>
      <React.Fragment>
        <Grid is_flex padding="5px 5px">
          <Grid>
            <Button margin="0px" size="10px" width="50px">
              홈버튼
            </Button>
          </Grid>

          <Grid is_flex padding="5px 5px">
            <Button
              _onClick={() => {
                history.push("/login");
              }}
              margin="0px 5px"
              size="10px"
              text="로그인"
              bold
            ></Button>
            <Button
              _onClick={() => {
                history.push("/signup");
              }}
              margin="0px"
              size="10px"
              text="회원가입"
              bold
            ></Button>
          </Grid>
        </Grid>
      </React.Fragment>
    </>;
  }

  return (
    <>
      <React.Fragment>
        <Grid is_flex padding="5px 5px">
          <Grid>
            <Button margin="0px 0px 0px 5px" size="10px" width="50px">
              홈버튼
            </Button>
          </Grid>

          <Grid is_flex padding="5px 5px">
            <Button
              _onClick={() => {
                history.push("/login");
              }}
              margin="0px 5px"
              size="10px"
              text="알림"
              bold
            ></Button>
            <Button
              _onClick={() => {}}
              margin="0px 5px"
              size="10px"
              text="내정보"
              bold
            ></Button>
            <Button
              _onClick={() => {}}
              margin="0px 5px"
              size="10px"
              text="로그아웃"
              bold
            ></Button>
          </Grid>
        </Grid>
      </React.Fragment>
    </>
  );
}

export default Header;
