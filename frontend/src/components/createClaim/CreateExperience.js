import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { createProfile } from "../../actions/profileAction";

class CreateExperience extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      company: "",
      location: "",
      to: "",
      from: "",
      headline: "",
      category: "Experience",
      description: "",
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

    const {
      title,
      company,
      from,
      to,
      location,
      description,
      headline,
      witnesses,
      category
    } = this.state;

    const content = `${title} at ${company} in ${location} from ${from} to ${to}.${headline} doing ${description}`;

    const profileData = {
      content,
      category,
      witnesses
    };

    this.props.createClaim(profileData);
    // this.props.createProfile(profileData, this.props.history);
  }
  render() {
    const { errors } = this.state;

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
        <div class="editing-info">
          <h5 class="f-title">
            <i class="ti-info-alt" /> Edit work & Education
          </h5>

          <form onSubmit={this.onSubmit}>
            <div class="form-group">
              <input
                id="input"
                required="required"
                name="title"
                type="text"
                value={this.state.title}
                onChange={this.onChange}
                error={errors.title}
              />
              <label class="control-label" for="input">
                Title
              </label>
              <i class="mtrl-select" />
            </div>
            <div class="form-group">
              <input
                id="input"
                required="required"
                name="company"
                type="text"
                value={this.state.company}
                onChange={this.onChange}
                error={errors.company}
              />
              <label class="control-label" for="input">
                Company
              </label>
              <i class="mtrl-select" />
            </div>
            <div class="form-group">
              <input
                required="required"
                name="location"
                type="text"
                value={this.state.location}
                onChange={this.onChange}
                error={errors.location}
              />
              <label class="control-label" for="input">
                Location
              </label>
              <i class="mtrl-select" />
            </div>
            <div class="form-group half">
              <input
                required="required"
                name="from"
                type="text"
                value={this.state.from}
                onChange={this.onChange}
                error={errors.from}
              />
              <label class="control-label" for="input">
                From
              </label>
              <i class="mtrl-select" />
            </div>
            <div class="form-group half">
              <input
                required="required"
                name="to"
                type="text"
                value={this.state.to}
                onChange={this.onChange}
                error={errors.to}
              />
              <label class="control-label" for="input">
                To
              </label>
              <i class="mtrl-select" />
            </div>
            <div class="form-group">
              <textarea
                rows="4"
                id="textarea"
                name="headline"
                type="text"
                value={this.state.headline}
                onChange={this.onChange}
                error={errors.headline}
              />
              <label class="control-label" for="textarea">
                Headline
              </label>
              <i class="mtrl-select" />
            </div>
            <div class="form-group">
              <textarea
                rows="4"
                id="textarea"
                name="description"
                type="text"
                value={this.state.description}
                onChange={this.onChange}
                error={errors.description}
              />
              <label class="control-label" for="textarea">
                Description
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

CreateExperience.propTypes = {
  createClaim: PropTypes.func.isRequired
};

export default CreateExperience;

// CreateExperience.propTypes = {
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
// )(withRouter(CreateExperience));
