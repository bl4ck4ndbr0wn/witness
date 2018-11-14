import React, { Component } from "react";
import axios from "axios";

import Claims from "../claims/Claims";
import CreateSkills from "../createClaim/CreateSkills";
import EOSIOClient from "../../utils/eosio-client";
import IOClient from "../../utils/io-client";
import { updateClaimForCreateAndEdit } from "../../utils/witness-updater";

class Skills extends Component {
  constructor(props) {
    super(props);
    const contractAccount = process.env.REACT_APP_EOSIO_CONTRACT_ACCOUNT;
    this.eosio = new EOSIOClient(contractAccount);
    this.io = new IOClient();
    this.state = {
      createOpen: false,
      claims: []
    };
  }

  // Enable Realtime updates via Socket.io
  async componentDidMount() {
    this.loadClaims();
    this.io.onMessage("claim", claim => {
      this.setState(prevState => ({
        claims: updateClaimForCreateAndEdit(prevState, claim)
      }));
    });
  }

  // Load claims
  loadClaims = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/v1/witness/profile/all`
    );
    this.setState({ claims: response.data.reverse() });
  };

  // Create a claim
  createClaim = async claim => {
    try {
      const newClaim = {
        ...claim,
        claimant: process.env.REACT_APP_EOSIO_ACCOUNT
      };
      console.log("next make transaction");
      await this.eosio.transaction(
        process.env.REACT_APP_EOSIO_ACCOUNT,
        "claim",
        {
          claimant: newClaim.claimant,
          ...claim
        }
      );

      console.log("next set state");

      this.setState(prevState => ({
        claims: updateClaimForCreateAndEdit(prevState, newClaim)
      }));
    } catch (err) {
      console.error(err);
    }
  };

  toggleCreate = () => {
    this.setState(prevState => ({
      createOpen: !prevState.createOpen
    }));
  };

  render() {
    console.log(this.state.claims[0].skills);
    return (
      <div>
        <div class="central-meta item d-flex justify-content-between">
          <h3>Skills</h3>
          <span
            class="ti-plus main-menu btn btn-primary"
            data-ripple=""
            onClick={this.toggleCreate}
          >
            {!this.state.createOpen ? "New" : "Dismiss"} Claim
          </span>
        </div>
        {this.state.createOpen ? (
          <CreateSkills createClaim={this.createClaim} />
        ) : (
          ""
        )}
        <Claims />
      </div>
    );
  }
}

export default Skills;
