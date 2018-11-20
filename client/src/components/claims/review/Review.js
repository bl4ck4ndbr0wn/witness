import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { reviewClaim } from "../../../actions/reviewAction";

class Review extends Component {
  constructor() {
    super();
    this.state = {
      review: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { claim } = this.props;
    const { review } = this.state;

    let data = {
      timestamp: claim._id.timestamp,
      user: claim._id.user,
      review,
      ipfs_path: ""
    };

    reviewClaim(data);
  }
  render() {
    const { errors } = this.state;

    return (
      <div className="central-meta">
        <div className="editing-info">
          <h5 className="f-title">
            <i className="ti-info-alt" /> Edit Education
          </h5>

          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <textarea
                rows="4"
                id="textarea"
                name="review"
                type="text"
                value={this.state.review}
                onChange={this.onChange}
              />
              <label className="control-label" for="textarea">
                Review
              </label>
              <i className="mtrl-select" />
            </div>
            <div className="submit-btns">
              <button type="button" className="mtr-btn">
                <span>Cancel</span>
              </button>
              <button type="submit" className="mtr-btn">
                <span>Update</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Review.propTypes = {
  claim: PropTypes.object.claim
};

export default Review;
