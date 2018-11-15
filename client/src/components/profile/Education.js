import React, { Component } from "react";
import axios from "axios";

import Claims from "../claims/Claims";
import CreateEducation from "../createClaim/CreateEducation";
import EOSIOClient from "../../utils/eosio-client";
import IOClient from "../../utils/io-client";
import { updateClaimForCreateAndEdit } from "../../utils/witness-updater";
import claim from "../../actions/claimsActions";

class Education extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createOpen: false,
      claims: []
    };
  }

  // Load claims
  loadClaims = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/profile/all`
    );
    this.setState({ claims: response.data.reverse() });
  };

  toggleCreate = () => {
    this.setState(prevState => ({
      createOpen: !prevState.createOpen
    }));
  };

  render() {
    console.log(this.state.claims);
    return (
      <div>
        <div class="central-meta item d-flex justify-content-between">
          <h3>Education</h3>

          <span
            class="ti-plus main-menu btn btn-primary"
            data-ripple=""
            onClick={this.toggleCreate}
          >
            {!this.state.createOpen ? "New" : "Dismiss"} Claim
          </span>
        </div>
        {this.state.createOpen ? <CreateEducation /> : ""}
        <Claims />
      </div>
    );
  }
}

export default Education;
