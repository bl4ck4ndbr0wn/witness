import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { claim } from "../../actions/claimsActions";

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
            <i className="ti-info-alt" /> Edit work & Education
          </h5>

          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <input
                id="input"
                required="required"
                name="title"
                type="text"
                value={this.state.title}
                onChange={this.onChange}
                error={errors.title}
              />
              <label className="control-label" for="input">
                Title
              </label>
              <i className="mtrl-select" />
            </div>
            <div className="form-group">
              <input
                id="input"
                required="required"
                name="company"
                type="text"
                value={this.state.company}
                onChange={this.onChange}
                error={errors.company}
              />
              <label className="control-label" for="input">
                Company
              </label>
              <i className="mtrl-select" />
            </div>
            <div className="form-group">
              <input
                required="required"
                name="location"
                type="text"
                value={this.state.location}
                onChange={this.onChange}
                error={errors.location}
              />
              <label className="control-label" for="input">
                Location
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
              <textarea
                rows="4"
                id="textarea"
                name="headline"
                type="text"
                value={this.state.headline}
                onChange={this.onChange}
                error={errors.headline}
              />
              <label className="control-label" for="textarea">
                Headline
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
              <Select
                onChange={opt => this.handleSelectOnChange(opt)}
                options={options}
                isMulti
              />
              <label className="control-label" for="input">
                Witnesses
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

export default CreateExperience;
