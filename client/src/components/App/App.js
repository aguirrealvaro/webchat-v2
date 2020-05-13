import React from "react";
import store from "../../redux/store";
import jwt_decode from "jwt-decode";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { setUserLogged } from "../../redux/auth/actions";
import { PrivateRoute } from "../";
import { Home, Register, Login } from "../../screens";
import "./global.scss";

const token = localStorage.getItem("token");
if (token) {
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
