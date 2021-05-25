import React from "react";
import Layout from "./components/Layout/Layout";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import RegisterLogin from "./components/Register_login/RegisterLogin";
import Register from "./components/Register_login/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import PrivateRoute from "./components/common/PrivateRoute";

function App() {
  return (
    <Layout>
      <Switch>
        <PrivateRoute path="/user/dashboard" exact component={Dashboard} />

        <Route path="/register" exact component={Register} />
        <Route path="/register_login" exact component={RegisterLogin} />
        <Route path="/" exact component={Home} />
      </Switch>
    </Layout>
  );
}

export default App;
