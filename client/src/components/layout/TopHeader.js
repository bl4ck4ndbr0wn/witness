import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ScatterJS from "scatterjs-core";
import ScatterEOS from "scatterjs-plugin-eosjs2";

import { authorize, logoutUser } from "../../actions/authAction";

class TopHeader extends Component {
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

  // onClaim(e) {
  //   e.preventDefault();

  //   this.props.claim(this.props.auth.user);
  // }

  render() {
    const { isAuthenticated, user, loading } = this.props.auth;

    return (
      <div className="topbar stick">
        <div className="logo">
          <Link title="" to="/">
            <img src="images/logo.png" alt="" style={{ height: "34px" }} />
          </Link>
        </div>

        <div className="top-area">
          <ul className="main-menu">
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
          <ul className="setting-area">
            <li>
              <Link to="/" title="Home" data-ripple="">
                <i className="ti-search" />
              </Link>
              <div className="searched">
                <form method="post" className="form-search">
                  <input type="text" placeholder="Search Friend" />
                  <button data-ripple>
                    <i className="ti-search" />
                  </button>
                </form>
              </div>
            </li>
            <li>
              <Link to="#" title="Notification" data-ripple="">
                <i className="ti-bell" />
                <span>20</span>
              </Link>
              <div className="dropdowns">
                <span>4 New Notifications</span>
                <ul className="drops-menu">
                  <li>
                    <Link to="notifications.html" title="">
                      <img src="images/resources/thumb-1.jpg" alt="" />
                      <div className="mesg-meta">
                        <h6>sarah Loren</h6>
                        <span>Hi, how r u dear ...?</span>
                        <i>2 min ago</i>
                      </div>
                    </Link>
                    <span className="tag green">New</span>
                  </li>
                  <li>
                    <Link to="notifications.html" title="">
                      <img src="images/resources/thumb-2.jpg" alt="" />
                      <div className="mesg-meta">
                        <h6>Jhon doe</h6>
                        <span>Hi, how r u dear ...?</span>
                        <i>2 min ago</i>
                      </div>
                    </Link>
                    <span className="tag red">Reply</span>
                  </li>
                  <li>
                    <Link to="notifications.html" title="">
                      <img src="images/resources/thumb-3.jpg" alt="" />
                      <div className="mesg-meta">
                        <h6>Andrew</h6>
                        <span>Hi, how r u dear ...?</span>
                        <i>2 min ago</i>
                      </div>
                    </Link>
                    <span className="tag blue">Unseen</span>
                  </li>
                  <li>
                    <Link to="notifications.html" title="">
                      <img src="images/resources/thumb-4.jpg" alt="" />
                      <div className="mesg-meta">
                        <h6>Tom cruse</h6>
                        <span>Hi, how r u dear ...?</span>
                        <i>2 min ago</i>
                      </div>
                    </Link>
                    <span className="tag">New</span>
                  </li>
                  <li>
                    <Link to="notifications.html" title="">
                      <img src="images/resources/thumb-5.jpg" alt="" />
                      <div className="mesg-meta">
                        <h6>Amy</h6>
                        <span>Hi, how r u dear ...?</span>
                        <i>2 min ago</i>
                      </div>
                    </Link>
                    <span className="tag">New</span>
                  </li>
                </ul>
                <Link to="notifications.html" title="" className="more-mesg">
                  view more
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

TopHeader.propTypes = {
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
)(TopHeader);
