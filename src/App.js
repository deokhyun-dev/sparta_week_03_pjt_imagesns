import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Main from "./pages/Main";
import PostWriteUpdate from "./pages/PostWriteUpdate";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
    return (
        <>
            <BrowserRouter>
                <Route path="/" exact component={Main} />
                <Route path="/login" exact component={Login} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/Write" exact component={PostWriteUpdate} />
            </BrowserRouter>
        </>
    );
}

export default App;
