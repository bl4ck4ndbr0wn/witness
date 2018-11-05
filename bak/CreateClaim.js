import React, { Component } from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import randomId from "random-id";

class CreateClaim extends Component {
  state = {
    witnesses: [],
    claim: ""
  };

  handleOnChange = (e, opt) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSelectOnChange = opt => {
    let newWitnesses = [];
    for (let i in opt) {
      newWitnesses.push(opt[i].value);
    }

    this.setState({ witnesses: [...newWitnesses] });
  };

  createClaim = e => {
    e.preventDefault();
    // length of the id (default is 30)
    const len = 30;
    // pattern to determin how the id will be generated
    // default is aA0 it has a chance for lowercased capitals and numbers
    const pattern = "aA0";

    let id = randomId(len, pattern);

    this.props.createClaim({ ...this.state, claim_id: id });

    this.setState({
      witnesses: [],
      claim: ""
    });
  };

  render() {
    const options = [
      { label: "bobross", value: "bobross" },
      { label: "janesmith", value: "janesmith" },
      { label: "sampeters", value: "sampeters" },
      { label: "willthompson", value: "willthompson" },
      { label: "sarabrown", value: "sarabrown" },
      { label: "lisawalters", value: "lisawalters" }
    ];
    return (
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Compose New Claim
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Claim</label>
                <textarea
                  name="claim"
                  id="claim"
                  rows="5"
                  className="form-control"
                  placeholder="Your Claim"
                  // required="required"
                  value={this.state.claim}
                  onChange={this.handleOnChange}
                />
                <small id="emailHelp" className="form-text text-muted">
                  Twitter length.
                </small>
              </div>
              <div className="form-group">
                <Select
                  onChange={opt => this.handleSelectOnChange(opt)}
                  options={options}
                  isMulti
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.createClaim}
                data-dismiss="modal"
              >
                Save Claim
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
CreateClaim.propTypes = {
  createClaim: PropTypes.func.isRequired
};

export default CreateClaim;
