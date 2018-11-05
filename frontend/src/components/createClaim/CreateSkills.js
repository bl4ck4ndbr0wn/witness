import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { createProfile } from "../../actions/profileAction";

class CreateSkills extends Component {
  constructor() {
    super();
    this.state = {
      skills: "",
      category: "Skills",
      witnesses: [],
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSelectOnChange = opt => {
    let newWitnesses = [];
    for (let i in opt) {
      newWitnesses.push(opt[i].value);
    }

    this.setState({ witnesses: [...newWitnesses] });
  };

  onSubmit(e) {
    e.preventDefault();

    const { skills, witnesses, category } = this.state;
    const profileData = {
      content: skills,
      category,
      witnesses
    };

    this.props.createClaim(profileData);
    // this.props.createProfile(profileData, this.props.history);
  }
  render() {
    const { errors, skills } = this.state;

    const options = [
      { label: "bobross", value: "bobross" },
      { label: "janesmith", value: "janesmith" },
      { label: "sampeters", value: "sampeters" },
      { label: "willthompson", value: "willthompson" },
      { label: "sarabrown", value: "sarabrown" },
      { label: "lisawalters", value: "lisawalters" }
    ];
    return (
      <div class="central-meta">
        <div class="editing-interest">
          <h5 class="f-title">
            <i class="ti-heart" />
            My Skills
          </h5>
          <form onSubmit={this.onSubmit}>
            <label>Add Skills: </label>
            <div class="form-group">
              <input
                id="input"
                required="required"
                name="skills"
                type="text"
                value={this.state.skills}
                onChange={this.onChange}
                error={errors.skills}
              />
              <label class="control-label" for="input">
                Skills
              </label>
              <i class="mtrl-select" />
            </div>
            <div class="form-group">
              <Select
                onChange={opt => this.handleSelectOnChange(opt)}
                options={options}
                isMulti
              />
              <label class="control-label" for="input">
                Witnesses
              </label>
              <i class="mtrl-select" />
            </div>
            <div class="submit-btns">
              <button type="button" class="mtr-btn">
                <span>Cancel</span>
              </button>
              <button type="submit" class="mtr-btn">
                <span>Update</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

CreateSkills.propTypes = {
  createClaim: PropTypes.func.isRequired
};

export default CreateSkills;

// CreateSkills.propTypes = {
//   profile: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   profile: state.profile,
//   errors: state.errors
// });

// export default connect(
//   mapStateToProps,
//   { createProfile }
// )(withRouter(CreateSkills));
