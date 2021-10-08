import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/configureStore";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "./redux/modules/user";
import { apiKey } from "./shared/firebase";

import Main from "./pages/Main";
import PostWriteUpdate from "./pages/PostWriteUpdate";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Header from "./components/Header";
import { Grid, Button } from "./elements";
import Permit from "./shared/Permit";
import Notification from "./pages/Notification";

function App() {
  const dispatch = useDispatch();
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  useEffect(() => {
    if (is_session) {
      dispatch(userActions.loginCheckFB());
    }
  }, []);

  return (
    <>
      <Grid>
        <Header></Header>
        <ConnectedRouter history={history}>
          <Route path="/" exact component={Main} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/write" exact component={PostWriteUpdate} />
          <Route path="/noti" exact component={Notification} />
          <Route path="/write/:id" exact component={PostWriteUpdate} />
        </ConnectedRouter>
      </Grid>
      <Permit>
        <Button
          is_float
          text="+"
          _onClick={() => history.push("/write")}
        ></Button>
      </Permit>
    </>
  );
}

export default App;
