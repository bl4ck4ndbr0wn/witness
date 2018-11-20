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
      <div className="responsive-header">
        <div className="mh-head first Sticky">
          <span className="mh-btns-left">
            <a className="" href="#menu">
              <i className="fa fa-align-justify" />
            </a>
          </span>
          <span className="mh-text">
            <Link title="" to="/">
              <img src="images/logo.png" alt="" style={{ height: "34px" }} />
            </Link>
          </span>{" "}
          {isAuthenticated && !loading ? (
            <span className="mh-btns-right">
              <Link to="" title="login" data-ripple="">
                <i className="ti-bell" />
              </Link>
            </span>
          ) : (
            ""
          )}
        </div>
        <nav id="menu" className="res-menu">
          <ul>
            <li>
              <Link to="/" title="Home" data-ripple="">
                <i className="ti-home" /> Home
              </Link>
            </li>

            {isAuthenticated && !loading ? (
              <li>
                <a>
                  <i className="ti-user" />
                  {user.identity.accounts[0].name} : @
                  {user.identity.accounts[0].authority}
                </a>

                <ul>
                  <li>
                    <Link
                      to={`/profile/${user.identity.accounts[0].name}`}
                      title=""
                    >
                      <i className="ti-user" /> Profile
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
                  <i className="ti-user" /> Login with scatter
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
