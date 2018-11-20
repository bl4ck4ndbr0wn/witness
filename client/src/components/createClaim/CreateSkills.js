import React, { Component } from "react";
import Select from "react-select";

import { claim } from "../../actions/claimsActions";

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

    let data = {
      content: skills,
      category,
      ipfs_path: "",
      witnesses
    };
    claim(data);
  }
  render() {
    const { errors, skills } = this.state;

    const options = [
      { label: "samooopeters", value: "samooopeters" },
      { label: "alphangangaa", value: "alphangangaa" }
    ];

    return (
      <div className="central-meta">
        <div className="editing-interest">
          <h5 className="f-title">
            <i className="ti-heart" />
            My Skills
          </h5>
          <form onSubmit={this.onSubmit}>
            <label>Add Skills: </label>
            <div className="form-group">
              <input
                id="input"
                required="required"
                name="skills"
                type="text"
                value={this.state.skills}
                onChange={this.onChange}
                error={errors.skills}
              />
              <label className="control-label" for="input">
                Skills
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

export default CreateSkills;
