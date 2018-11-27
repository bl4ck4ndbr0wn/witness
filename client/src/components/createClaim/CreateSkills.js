import React, { Component } from "react";
import Select from "react-select";
import fileReaderPullStream from "pull-file-reader";
import ipfsAPI from "ipfs-api";

import { claim } from "../../actions/claimsActions";

class CreateSkills extends Component {
  constructor() {
    super();
    this.state = {
      skills: "",
      category: "Skills",
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

    const { skills, witnesses, ipfs_path, category } = this.state;

    let data = {
      content: skills,
      category,
      ipfs_path,
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
              <input type="file" onChange={this.captureFile} />{" "}
              <label for="keepFilename">
                <input type="checkbox" id="keepFilename" name="keepFilename" />{" "}
                keep filename
              </label>
              {this.state.ipfs_path}
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
