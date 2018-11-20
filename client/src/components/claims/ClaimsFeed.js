import React, { Component } from "react";
import PropTypes from "prop-types";
import ClaimItem from "./ClaimItem";

class ClaimsFeed extends Component {
  render() {
    const { claims } = this.props;
    return claims.map(claim => <ClaimItem claim={claim} />);
  }
}

ClaimsFeed.propTypes = {
  claims: PropTypes.array.isRequired
};

export default ClaimsFeed;
