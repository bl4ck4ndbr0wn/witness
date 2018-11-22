import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import fileReaderPullStream from "pull-file-reader";
import ipfsAPI from "ipfs-api";

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
      ipfs_path: "",
      errors: {}
    };
    this.ipfsApi = ipfsAPI("localhost", "5001");
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.captureFile = this.captureFile.bind(this);
    this.saveToIpfs = this.saveToIpfs.bind(this);
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

  captureFile(event) {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    if (document.getElementById("keepFilename").checked) {
      this.saveToIpfsWithFilename(file);
    } else {
      this.saveToIpfs(file);
    }
  }

  // Add file to IPFS and wrap it in a directory to keep the original filename
  saveToIpfsWithFilename(file) {
    let ipfsId;
    const fileStream = fileReaderPullStream(file);
    const fileDetails = {
      path: file.name,
      content: fileStream
    };
    const options = {
      wrapWithDirectory: true,
      progress: prog => console.log(`received: ${prog}`)
    };
    this.ipfsApi
      .add(fileDetails, options)
      .then(response => {
        console.log(response);
        // CID of wrapping directory is returned last
        ipfsId = response[response.length - 1].hash;
        console.log(ipfsId);

        let ipfsLink = `https://ipfs.io/ipfs/${ipfsId}`;
        this.setState({ ipfs_path: ipfsLink });
      })
      .catch(err => {
        console.error(err);
      });
  }

  // Add file to IPFS and return a CID
  saveToIpfs(file) {
    let ipfsId;
    const fileStream = fileReaderPullStream(file);
    this.ipfsApi
      .add(fileStream, { progress: prog => console.log(`received: ${prog}`) })
      .then(response => {
        console.log(response);
        ipfsId = response[0].hash;
        console.log(ipfsId);

        let ipfsLink = `https://ipfs.io/ipfs/${ipfsId}`;
        this.setState({ ipfs_path: ipfsLink });
      })
      .catch(err => {
        console.error(err);
      });
  }

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
      ipfs_path,
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
      ipfs_path,
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
              <input type="file" onChange={this.captureFile} />{" "}
              <label for="keepFilename">
                <input type="checkbox" id="keepFilename" name="keepFilename" />{" "}
                keep filename
              </label>
              {this.state.ipfs_path}
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
