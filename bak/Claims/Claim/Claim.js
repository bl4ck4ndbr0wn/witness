import React, { Component } from "react";
import PropTypes from "prop-types";

class Claim extends Component {
  render() {
    const witnessList = this.props.claim.witnesses.map(witness => (
      <cite title="Source Title"> {witness},</cite>
    ));
    return (
      <div class="card  mb-4">
        <div class="card-header">{this.props.claim.claimant}</div>
        <div class="card-body">
          <blockquote class="blockquote mb-0">
            <p>{this.props.claim.claim}</p>
            <footer class="blockquote-footer">Witnesses {witnessList}</footer>

            <button
              type="button"
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              Attest
            </button>
          </blockquote>
        </div>
      </div>
    );
  }
}

// Assigning Props Types
Claim.PropTypes = {
  claim: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    claim: PropTypes.string.isRequired,
    claimant: PropTypes.string.isRequired,
    witnessConfirmed: PropTypes.bool.isRequired
  })
};

export default Claim;
