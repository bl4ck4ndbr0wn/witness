import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import { logoutUser, setCurrentUser } from "./actions/authAction";

import PrivateRoute from "./components/common/PrivateRoute";

import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/profile/Profile";
import Header from "./components/layout/Header";
import TopHeader from "./components/layout/TopHeader";
import Footer from "./components/layout/Footer";
import NotFound from "./components/not-found/NotFound";

// Check for token
if (localStorage.scatter) {
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(JSON.parse(localStorage.getItem("scatter"))));
} else {
  store.dispatch(setCurrentUser({}));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div class="theme-layout">
            <Header />
            <TopHeader />
            <React.Fragment>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Route exact path="/not-found" component={NotFound} />
            </React.Fragment>

            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
