import React from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/configureStore";

import Main from "./pages/Main";
import PostWriteUpdate from "./pages/PostWriteUpdate";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Header from "./components/Header";
import { Grid } from "./elements";

function App() {
  return (
    <>
      <Grid>
        <Header></Header>

        <Route path="/" exact component={Main} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/Write" exact component={PostWriteUpdate} />
      </Grid>
    </>
  );
}

export default App;
