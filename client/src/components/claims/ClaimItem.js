import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getProfileByHandle } from "../../actions/profileAction";

import Review from "./review/Review";

class ClaimItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createOpen: false
    };
  }

  componentDidMount() {
    this.props.getProfileByHandle(this.props.claim._id.user);
  }

  toggleCreate = () => {
    this.setState(prevState => ({
      createOpen: !prevState.createOpen
    }));
  };
  render() {
    const { claim, auth, profile } = this.props;
    let profileData;
    if (profile.profile === null || profile.loading) {
      profileData = "images/resources/user-avatar.jpg";
    } else {
      // Check if logged in user has profile data
      if (
        Object.keys(profile.profile).length > 0 &&
        profile.profile.avatar !== undefined
      ) {
        profileData = `http://localhost:4000/${profile.profile.avatar}`;
      } else {
        profileData = "images/resources/user-avatar.jpg";
      }
    }

    let attesters;
    if (claim.witness === null || claim.witnesses === undefined) {
      attesters = "";
    } else {
      if (auth.isAuthenticated) {
        attesters = claim.witnesses.find(
          witness => witness === auth.user.identity.accounts[0].name
        );
      }
    }
    const reviewSection = claim.reviews.map(review => (
      <li>
        <div className="comet-avatar">
          <img
            src={
              review.avatar
                ? `http://localhost:4000/${review.avatar}`
                : "images/resources/comet-1.jpg"
            }
            alt=""
            width="45"
            height="45"
          />
        </div>
        <div className="we-comment">
          <div className="coment-head">
            <h5>
              <a href="time-line.html" title="">
                {review.user}
              </a>
            </h5>
            <span>{review.created_on}</span>
            <a className="we-reply" href="/" title="Reply">
              <i className="fa fa-reply" />
            </a>
          </div>
          <p>{review.review}</p>
        </div>
      </li>
    ));

    return (
      <div className="central-meta item">
        <div className="user-post">
          <div className="friend-info">
            <figure>
              <img src={profileData} alt="" />
            </figure>
            <div className="friend-name">
              <ins>
                <Link to={`/profile/${claim._id.user}`} title="">
                  {claim._id.user}
                </Link>
              </ins>
              <span>published: {claim._id.timestamp}</span>
            </div>
            <div className="post-meta">
              <div className="description">
                <p>{claim.content}</p>
              </div>
              <img src={claim.ipfs_path} alt="" />
              <div className="we-video-info">
                <ul>
                  <li>
                    <span
                      className="comment"
                      data-toggle="tooltip"
                      title="Comments"
                    >
                      <i className="fa fa-comments-o" />
                      <ins>{claim.reviews.length}</ins>
                    </span>
                  </li>
                  <li className="social-media">
                    <div className="menu">
                      <div className="btn trigger">
                        <i className="fa fa-share-alt" />
                      </div>
                      <div className="rotater">
                        <div className="btn btn-icon">
                          <a href="/" title="">
                            <i className="fa fa-html5" />
                          </a>
                        </div>
                      </div>
                      <div className="rotater">
                        <div className="btn btn-icon">
                          <a href="/" title="">
                            <i className="fa fa-facebook" />
                          </a>
                        </div>
                      </div>
                      <div className="rotater">
                        <div className="btn btn-icon">
                          <a href="/" title="">
                            <i className="fa fa-google-plus" />
                          </a>
                        </div>
                      </div>
                      <div className="rotater">
                        <div className="btn btn-icon">
                          <a href="/" title="">
                            <i className="fa fa-twitter" />
                          </a>
                        </div>
                      </div>
                      <div className="rotater">
                        <div className="btn btn-icon">
                          <a href="/" title="">
                            <i className="fa fa-css3" />
                          </a>
                        </div>
                      </div>
                      <div className="rotater">
                        <div className="btn btn-icon">
                          <a href="/" title="">
                            <i className="fa fa-instagram" />
                          </a>
                        </div>
                      </div>
                      <div className="rotater">
                        <div className="btn btn-icon">
                          <a href="/" title="">
                            <i className="fa fa-dribbble" />
                          </a>
                        </div>
                      </div>
                      <div className="rotater">
                        <div className="btn btn-icon">
                          <a href="/" title="">
                            <i className="fa fa-pinterest" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>
                  {attesters !== undefined ? (
                    <span
                      className="ti-plus main-menu btn btn-primary"
                      data-ripple=""
                      onClick={this.toggleCreate}
                    >
                      {!this.state.createOpen
                        ? "attest"
                        : "Dismiss attestation"}
                    </span>
                  ) : (
                    ""
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className="coment-area">
            {this.state.createOpen ? <Review claim={claim} /> : ""}
            <ul className="we-comet">{reviewSection}</ul>
          </div>
        </div>
      </div>
    );
  }
}

ClaimItem.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  claim: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(ClaimItem);
