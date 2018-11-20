import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { claim } from "../../actions/claimsActions";

class CreateEducation extends Component {
  constructor() {
    super();
    this.state = {
      level: "",
      institute: "",
      from: "",
      to: "",
      field: "",
      description: "",
      category: "Education",
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
      level,
      institute,
      from,
      to,
      field,
      description,
      witnesses,
      category
    } = this.state;

    const content = `${level} in ${field} at ${institute} from ${from} to ${to}.${description}`;

    const profileData = {
      content,
      category,
      witnesses
    };

    let data = {
      content,
      category,
      ipfs_path: "",
      witnesses
    };
    claim(data);
  }
  render() {
    const { errors } = this.state;

    const options = [
      { label: "samooopeters", value: "samooopeters" },
      { label: "alphangangaa", value: "alphangangaa" }
    ];

    return (
      <div className="central-meta">
        <div className="editing-info">
          <h5 className="f-title">
            <i className="ti-info-alt" /> Edit Education
          </h5>

          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <input
                id="input"
                required="required"
                name="institute"
                type="text"
                value={this.state.institute}
                onChange={this.onChange}
                error={errors.institute}
              />
              <label className="control-label" for="input">
                Studying at
              </label>
              <i className="mtrl-select" />
            </div>
            <div className="form-group">
              <input
                id="input"
                required="required"
                name="level"
                type="text"
                value={this.state.level}
                onChange={this.onChange}
                error={errors.level}
              />
              <label className="control-label" for="input">
                Course Level
              </label>
              <i className="mtrl-select" />
            </div>
            <div className="form-group half">
              <input
                required="required"
                name="from"
                type="text"
                value={this.state.from}
                onChange={this.onChange}
                error={errors.from}
              />
              <label className="control-label" for="input">
                From
              </label>
              <i className="mtrl-select" />
            </div>
            <div className="form-group half">
              <input
                required="required"
                name="to"
                type="text"
                value={this.state.to}
                onChange={this.onChange}
                error={errors.to}
              />
              <label className="control-label" for="input">
                To
              </label>
              <i className="mtrl-select" />
            </div>
            <div className="form-group">
              <input
                required="required"
                name="field"
                type="text"
                value={this.state.field}
                onChange={this.onChange}
                error={errors.field}
              />
              <label className="control-label" for="input">
                Field of Study
              </label>
              <i className="mtrl-select" />
            </div>
            <div className="form-group">
              <textarea
                rows="4"
                id="textarea"
                name="description"
                type="text"
                value={this.state.description}
                onChange={this.onChange}
                error={errors.description}
              />
              <label className="control-label" for="textarea">
                Description
              </label>
              <i className="mtrl-select" />
            </div>
            <div className="form-group">
              {/* <label className="control-label" for="input">
                Witnesses
              </label> */}
              <Select
                onChange={opt => this.handleSelectOnChange(opt)}
                options={options}
                isMulti
              />
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

CreateEducation.propTypes = {
  createClaim: PropTypes.func.isRequired
};

export default CreateEducation;
