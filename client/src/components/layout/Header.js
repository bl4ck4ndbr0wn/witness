import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { authorize, logoutUser } from "../../actions/authAction";
class Header extends Component {
  constructor(props) {
    super(props);

    this.onLogin = this.onLogin.bind(this);
    this.onLogoutClick = this.onLogoutClick.bind(this);
    // this.onClaim = this.onClaim.bind(this);
  }
  onLogin(e) {
    e.preventDefault();

    this.props.authorize();
  }

  onLogoutClick(e) {
    e.preventDefault();

    this.props.logoutUser();
  }
  render() {
    const { isAuthenticated, user, loading } = this.props.auth;

    return (
      <div class="responsive-header">
        <div class="mh-head first Sticky">
          <span class="mh-btns-left">
            <a class="" href="#menu">
              <i class="fa fa-align-justify" />
            </a>
          </span>
          <span class="mh-text">
            <Link title="" to="/">
              <img src="images/logo.png" alt="" style={{ height: "34px" }} />
            </Link>
          </span>{" "}
          {isAuthenticated && !loading ? (
            <span class="mh-btns-right">
              <Link to="" title="login" data-ripple="">
                <i class="ti-bell" />
              </Link>
            </span>
          ) : (
            ""
          )}
        </div>
        <nav id="menu" class="res-menu">
          <ul>
            <li>
              <Link to="/" title="Home" data-ripple="">
                <i class="ti-home" /> Home
              </Link>
            </li>

            {isAuthenticated && !loading ? (
              <li>
                <a>
                  <i class="ti-user" />
                  {user.identity.accounts[0].name} : @
                  {user.identity.accounts[0].authority}
                </a>

                <ul>
                  <li>
                    <Link
                      to={`/profile/${user.identity.accounts[0].name}`}
                      title=""
                    >
                      <i class="ti-user" /> Profile
                    </Link>
                  </li>
                  <li>
                    <a onClick={this.onLogoutClick}> logout </a>
                  </li>
                </ul>
              </li>
            ) : (
              <li>
                <a onClick={this.onLogin}>
                  <i class="ti-user" /> Login with scatter
                </a>
              </li>
            )}
          </ul>
        </nav>{" "}
      </div>
    );
  }
}

Header.propTypes = {
  authorize: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { authorize, logoutUser }
)(Header);
