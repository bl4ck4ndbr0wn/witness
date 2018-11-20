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
    this.state = {
      createOpen: false
    };
  }

  toggleCreate = () => {
    this.setState(prevState => ({
      createOpen: !prevState.createOpen
    }));
  };
  render() {
    return (
      <div>
        <div className="central-meta item d-flex justify-content-between">
          <h3>Skills</h3>
          <span
            className="ti-plus main-menu btn btn-primary"
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
