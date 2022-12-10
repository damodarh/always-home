import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
//Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import Alert from "./components/Layout/Alert";
import setAuthToken from "./utils/setAuthToken";
import "./App.scss";
import PropertyList from "./components/property/PropertyList/PropertyList";
import PrivateRoute from "./components/routing/PrivateRoute";
import AlwaysHomeHeader from "./components/AlwaysHomeHeader/AlwaysHomeHeader";
import AlwaysHomeFooter from "./components/AlwaysHomeFooter/AlwaysHomeFooter";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Landing from "./components/Layout/Landing";
import AddProperty from "./components/property/AddProperty/AddProperty";
import Profile from "./components/Layout/Profile";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (value) => {
    setSearchText(value.trim());
  };

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className='App'>
          <AlwaysHomeHeader
            searchText={searchText}
            handleInputChange={handleInputChange}
          />
          <Switch>
            <div className='container-fluid properties'>
              <Alert />
              <Route exact path='/' component={Landing} />
              <Route exact path='/login' component={Login}></Route>
              <Route exact path='/register' component={Register}></Route>
              <PrivateRoute exact path='/properties'>
                <PropertyList searchText={searchText} />
              </PrivateRoute>
              <PrivateRoute exact path='/add-property'>
                <AddProperty />
              </PrivateRoute>
              <PrivateRoute exact path='/profile'>
                <Profile />
              </PrivateRoute>
            </div>
          </Switch>
          <AlwaysHomeFooter />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
