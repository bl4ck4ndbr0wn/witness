import React, { Component } from "react";
import axios from "axios";

import EOSIOClient from "../../utils/eosio-client";
import IOClient from "../../utils/io-client";
import { updateClaimForCreateAndEdit } from "../../utils/witness-updater";

import CreateClaim from "../CreateClaim";
import Navigation from "../Navigation";
import Footer from "../Footer";
import Claims from "../Claims/Claims";

class Home extends Component {
  state = {
    claims: []
  };

  // Instantiate shared eosjs helper and socket io helper
  constructor(props) {
    super(props);
    const contractAccount = process.env.REACT_APP_EOSIO_CONTRACT_ACCOUNT;
    this.eosio = new EOSIOClient(contractAccount);
    this.io = new IOClient();
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
      `${process.env.REACT_APP_API_URL}/witness`
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

  render() {
    console.log(this.state.claims);
    return (
      <div>
        <Navigation />
        {/* <!-- Page Content --> */}
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h1 className="my-4">
                Claims
                <small>All Claims</small>
              </h1>
              <Claims
                claims={this.state.claims}
                handleOnChange={this.handleOnChange}
              />
            </div>
          </div>
        </div>
        <CreateClaim createClaim={this.createClaim} />
        <Footer />
      </div>
    );
  }
}

export default Home;
