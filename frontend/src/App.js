import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/profile/Profile";
import Login from "./components/auth/Login";
import Header from "./components/layout/Header";
import TopHeader from "./components/layout/TopHeader";
import Footer from "./components/layout/Footer";

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

              <Route exact path="/login" component={Login} />
              <Route exact path="/profile" component={Profile} />
            </React.Fragment>

            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
