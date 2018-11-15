import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class ClaimItem extends Component {
  render() {
    const { claim, auth } = this.props;

    const reviewSection = claim.reviews.map(review => (
      <li>
        <div class="comet-avatar">
          <img src="images/resources/comet-1.jpg" alt="" />
        </div>
        <div class="we-comment">
          <div class="coment-head">
            <h5>
              <a href="time-line.html" title="">
                Jason borne
              </a>
            </h5>
            <span>1 year ago</span>
            <a class="we-reply" href="index.html#" title="Reply">
              <i class="fa fa-reply" />
            </a>
          </div>
          <p>
            we are working for the dance and sing songs. this car is very
            awesome for the youngster. please vote this car and like our post
          </p>
        </div>
      </li>
    ));

    return (
      <div class="central-meta item">
        <div class="user-post">
          <div class="friend-info">
            <figure>
              <img src="images/resources/friend-avatar10.jpg" alt="" />
            </figure>
            <div class="friend-name">
              <ins>
                <a href="time-line.html" title="">
                  {claim._id.user}
                </a>
              </ins>
              <span>published: {claim._id.timestamp}</span>
            </div>
            <div class="post-meta">
              <div class="description">
                <p>{claim.content}</p>
              </div>
              <div class="we-video-info">
                <ul>
                  <li>
                    <span
                      class="comment"
                      data-toggle="tooltip"
                      title="Comments"
                    >
                      <i class="fa fa-comments-o" />
                      <ins>{claim.reviews.length}</ins>
                    </span>
                  </li>
                  <li class="social-media">
                    <div class="menu">
                      <div class="btn trigger">
                        <i class="fa fa-share-alt" />
                      </div>
                      <div class="rotater">
                        <div class="btn btn-icon">
                          <a href="index.html#" title="">
                            <i class="fa fa-html5" />
                          </a>
                        </div>
                      </div>
                      <div class="rotater">
                        <div class="btn btn-icon">
                          <a href="index.html#" title="">
                            <i class="fa fa-facebook" />
                          </a>
                        </div>
                      </div>
                      <div class="rotater">
                        <div class="btn btn-icon">
                          <a href="index.html#" title="">
                            <i class="fa fa-google-plus" />
                          </a>
                        </div>
                      </div>
                      <div class="rotater">
                        <div class="btn btn-icon">
                          <a href="index.html#" title="">
                            <i class="fa fa-twitter" />
                          </a>
                        </div>
                      </div>
                      <div class="rotater">
                        <div class="btn btn-icon">
                          <a href="index.html#" title="">
                            <i class="fa fa-css3" />
                          </a>
                        </div>
                      </div>
                      <div class="rotater">
                        <div class="btn btn-icon">
                          <a href="index.html#" title="">
                            <i class="fa fa-instagram" />
                          </a>
                        </div>
                      </div>
                      <div class="rotater">
                        <div class="btn btn-icon">
                          <a href="index.html#" title="">
                            <i class="fa fa-dribbble" />
                          </a>
                        </div>
                      </div>
                      <div class="rotater">
                        <div class="btn btn-icon">
                          <a href="index.html#" title="">
                            <i class="fa fa-pinterest" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="coment-area">
            <ul class="we-comet">
              {reviewSection}
              <li>
                <a href="index.html#" title="" class="showmore underline">
                  more Attestations
                </a>
              </li>{" "}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

ClaimItem.propTypes = {
  claim: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(ClaimItem);
