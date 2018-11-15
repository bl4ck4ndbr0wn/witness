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
        <div class="gap gray-bg">
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-12">
                <div class="row" id="page-contents">
                  <div class="col-lg-3">
                    <aside class="sidebar static">
                      <ShortCut />
                      <RecentActivities />
                    </aside>
                  </div>

                  <div class="col-lg-6">
                    <div class="loadMore">{claimContent}</div>
                  </div>

                  <div class="col-lg-3">
                    <aside class="sidebar static">
                      <div class="widget">
                        <div class="banner medium-opacity bluesh">
                          <div
                            class="bg-image"
                            style={{
                              backgroundImage:
                                "url(images/resources/baner-widgetbg.jpg)"
                            }}
                          />
                          <div class="baner-top">
                            <span>
                              <img alt="" src="images/book-icon.png" />
                            </span>
                            <i class="fa fa-ellipsis-h" />
                          </div>
                          <div class="banermeta">
                            <p>create your own favourit page.</p>
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
