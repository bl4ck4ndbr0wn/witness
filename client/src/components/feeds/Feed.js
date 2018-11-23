import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ShortCut from "../dashboard/ShortCut";

import RecentActivities from "../dashboard/RecentActivities";
import Spinner from "../common/Spinner";
import ClaimsFeed from "../claims/ClaimsFeed";

import { getFollowerClaims } from "../../actions/claimsActions";
class Feed extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getFollowerClaims(this.props.match.params.handle);
    }
  }
  render() {
    const { claims, loading } = this.props.claim;
    const { user } = this.props.auth;

    let claimContent;

    if (claims === null || loading) {
      claimContent = <Spinner />;
    } else {
      claimContent = <ClaimsFeed claims={claims} />;
    }
    return (
      <section>
        <div className="gap gray-bg">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="row" id="page-contents">
                  <div className="col-lg-3">
                    <aside className="sidebar static">
                      <RecentActivities />
                      {this.props.auth.isAuthenticated ? (
                        <ShortCut auth={this.props.auth} />
                      ) : (
                        ""
                      )}
                    </aside>
                  </div>

                  <div className="col-lg-6">
                    {claimContent}
                    {/* <div className="loadMore"></div> */}
                  </div>

                  <div className="col-lg-3">
                    <aside className="sidebar static">
                      <div className="widget">
                        <div className="banner medium-opacity bluesh">
                          <div
                            className="bg-image"
                            style={{
                              backgroundImage:
                                "url(images/resources/baner-widgetbg.jpg)"
                            }}
                          />
                          <div className="baner-top">
                            <span>
                              <img alt="" src="images/book-icon.png" />
                            </span>
                            <i className="fa fa-ellipsis-h" />
                          </div>
                          <div className="banermeta">
                            <p>create your own Claims.</p>
                            <span>like them all</span>
                            <a data-ripple="" title="" href="#">
                              start now!
                            </a>
                          </div>
                        </div>
                      </div>
                    </aside>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Feed.propTypes = {
  getFollowerClaims: PropTypes.func.isRequired,
  claim: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  claim: state.claim,
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getFollowerClaims }
)(Feed);
