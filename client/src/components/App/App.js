import React from "react";
import "./global.scss";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import store from "../../redux/store";
//import setAuthToken from "../../services/setAuthToken";
import { setUserLogged } from "../../redux/auth/actions";

import { Home } from '../Home'
import { Register } from '../Auth/Register'
import { Login } from '../Auth/Login'
import { PrivateRoute } from '../Auth/PrivateRoute/'

const token = localStorage.getItem("token");
if (token) {
  //setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setUserLogged(decoded));
}

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <main>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </main>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
