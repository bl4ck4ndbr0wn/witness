import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ShortCut from "./ShortCut";

import RecentActivities from "./RecentActivities";
import Spinner from "../common/Spinner";
import ClaimsFeed from "../claims/ClaimsFeed";

import { getClaims } from "../../actions/claimsActions";
class Dashboard extends Component {
  componentDidMount() {
    this.props.getClaims();
  }
  render() {
    const { claims, loading } = this.props.claim;
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
                      <ShortCut />
                    </aside>
                  </div>

                  <div className="col-lg-6">
                    <div className="loadMore">{claimContent}</div>
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

Dashboard.propTypes = {
  getClaims: PropTypes.func.isRequired,
  claim: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  claim: state.claim,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getClaims }
)(Dashboard);
