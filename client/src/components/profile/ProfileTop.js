import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  documentUpload,
  addFollow,
  removeFollow
} from "../../actions/profileAction";

class ProfileTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileupload: null,
      message: null,
      active: 0
    };

    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    const fd = new FormData();

    if (e.target.files[0] === null || this.props.auth.user === null) {
      this.setState({ errors: { fileUpload: "File Field can not be Empty." } });
    } else {
      this.setState({
        errors: {},
        fileupload: null,
        message: null
      });
      fd.append("fileUpload", e.target.files[0], e.target.files[0].name);

      console.log(e.target.files[0]);
      this.props.documentUpload(
        fd,
        this.props.auth.user.identity.accounts[0].name
      );
    }
  }
  onFollowClick(name) {
    const { user } = this.props.auth;
    this.props.addFollow({
      followinguser: name,
      followuser: user.identity.accounts[0].name
    });
  }

  onUnFollowClick(name) {
    const { user } = this.props.auth;

    this.props.removeFollow({
      followinguser: name,
      followuser: user.identity.accounts[0].name
    });
  }
  render() {
    const { profile } = this.props.profile;

    const follow = profile.folowers.filter(user => user.user === profile.user);

    console.log(follow);

    return (
      <section>
        <div className="feature-photo">
          <figure>
            <img
              src={
                profile.timeline
                  ? profile.timeline
                  : "../images/resources/timeline-1.jpg"
              }
              alt=""
            />
          </figure>
          <form className="edit-phto">
            <i className="fa fa-camera-retro" />
            <label className="fileContainer">
              Edit Cover Photo
              <input type="file" />
            </label>
          </form>
          <div className="container-fluid">
            <div className="row merged">
              <div className="col-lg-2 col-sm-3">
                <div className="user-avatar">
                  <figure>
                    <img
                      src={
                        profile.avatar !== null
                          ? `http://localhost:4000/${profile.avatar}`
                          : "../images/resources/user-avatar.jpg"
                      }
                      alt=""
                    />
                    <form className="edit-phto">
                      <i className="fa fa-camera-retro" />
                      <label className="fileContainer">
                        Edit Display Photo
                        <input
                          type="file"
                          id="file"
                          type="file"
                          accept=".png, .jpg, .jpeg"
                          onChange={this.onChange}
                        />
                      </label>
                    </form>
                  </figure>
                </div>
              </div>
              <div className="col-lg-10 col-sm-9">
                <div className="timeline-info">
                  <ul>
                    <li className="admin-name">
                      <h5>{profile.user}</h5>
                      <span>{profile.created_at}</span>
                    </li>
                    <li>
                      <a
                        className={this.state.active === 0 ? "active" : ""}
                        title=""
                        data-ripple=""
                        onClick={() => {
                          this.setState({ active: 0 });
                          this.props.handleComponent(0);
                        }}
                      >
                        time line
                      </a>
                      <a
                        className={this.state.active === 1 ? "active" : ""}
                        title=""
                        data-ripple=""
                        onClick={() => {
                          this.setState({ active: 1 });
                          this.props.handleComponent(1);
                        }}
                      >
                        Education
                      </a>
                      <a
                        className={this.state.active === 2 ? "active" : ""}
                        title=""
                        data-ripple=""
                        onClick={() => {
                          this.setState({ active: 2 });
                          this.props.handleComponent(2);
                        }}
                      >
                        Experience
                      </a>
                      <a
                        className={this.state.active === 3 ? "active" : ""}
                        title=""
                        data-ripple=""
                        onClick={() => {
                          this.setState({ active: 3 });
                          this.props.handleComponent(3);
                        }}
                      >
                        Skills
                      </a>
                      <a
                        className={this.state.active === 4 ? "active" : ""}
                        title=""
                        data-ripple=""
                        onClick={() => {
                          this.setState({ active: 4 });
                          this.props.handleComponent(4);
                        }}
                      >
                        Edit Profile
                      </a>
                      <a
                        className={this.state.active === 5 ? "active" : ""}
                        title=""
                        data-ripple=""
                        onClick={() => {
                          this.setState({ active: 5 });
                          this.props.handleComponent(5);
                        }}
                      >
                        Account Settings
                      </a>
                      {follow ? (
                        <a
                          className="btn btn-primary mr-1"
                          title=""
                          data-ripple=""
                          onClick={this.onFollowClick.bind(this, profile.user)}
                        >
                          Follow
                        </a>
                      ) : (
                        <a
                          className="btn btn-primary mr-1"
                          title=""
                          data-ripple=""
                          onClick={this.onUnFollowClick.bind(
                            this,
                            profile.user
                          )}
                        >
                          unFollow
                        </a>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

ProfileTop.propTypes = {
  handleComponent: PropTypes.func.isRequired,
  addFollow: PropTypes.func.isRequired,
  removeFollow: PropTypes.func.isRequired,
  documentUpload: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { documentUpload, addFollow, removeFollow }
)(ProfileTop);
