import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import {
  createProfile,
  getProfileByHandle
} from "../../../actions/profileAction";
import isEmpty from "../../../validation/is-empty";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      firstname: "",
      lastname: "",
      location: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      // If profile field doesnt exist, make empty string
      profile.firstname = !isEmpty(profile.firstname) ? profile.firstname : "";
      profile.lastname = !isEmpty(profile.lastname) ? profile.lastname : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : "";
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";

      // Set component fields state
      this.setState({
        firstname: profile.firstname,
        lastname: profile.lastname,
        location: profile.location,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube,
        instagram: profile.instagram
      });
    }
  }
  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      user: this.props.match.params.handle,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      location: this.state.location,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    console.log(profileData);
    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;
    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <div class="form-group">
            <input
              type="text"
              name="facebook"
              value={this.state.facebook}
              onChange={this.onChange}
              error={errors.facebook}
            />
            <label class="control-label" for="input">
              <i class="fa fa-facebook-square" /> Facebook
            </label>
            <i class="mtrl-select" />
          </div>
          <div class="form-group">
            <input
              type="text"
              name="twitter"
              value={this.state.twitter}
              onChange={this.onChange}
              error={errors.twitter}
            />
            <label class="control-label" for="input">
              <i class="fa fa-twitter-square" /> Twitter
            </label>
            <i class="mtrl-select" />
          </div>
          <div class="form-group">
            <input
              type="text"
              name="linkedin"
              value={this.state.linkedin}
              onChange={this.onChange}
              error={errors.linkedin}
            />
            <label class="control-label" for="input">
              <i class="fa fa-linkedin-square" /> Linkedin
            </label>
            <i class="mtrl-select" />
          </div>
          <div class="form-group">
            <input
              type="text"
              name="youtube"
              value={this.state.youtube}
              onChange={this.onChange}
              error={errors.youtube}
            />
            <label class="control-label" for="input">
              <i class="fa fa-youtube-square" /> Youtube
            </label>
            <i class="mtrl-select" />
          </div>
          <div class="form-group">
            <input
              type="text"
              name="instagram"
              value={this.state.instagram}
              onChange={this.onChange}
              error={errors.instagram}
            />
            <label class="control-label" for="input">
              <i class="fa fa-instagram" /> Instagram
            </label>
            <i class="mtrl-select" />
          </div>
        </div>
      );
    }

    return (
      <div class="central-meta">
        <div class="editing-info">
          <h5 class="f-title">
            <i class="ti-info-alt" /> Edit Profile
          </h5>
          <form onSubmit={this.onSubmit}>
            <div class="form-group half">
              <input
                type="text"
                id="input"
                required="required"
                name="firstname"
                value={this.state.firstname}
                onChange={this.onChange}
                error={errors.firstname}
              />
              <label class="control-label" for="input">
                First Name
              </label>
              <i class="mtrl-select" />
            </div>
            <div class="form-group half">
              <input
                type="text"
                required="required"
                name="lastname"
                value={this.state.lastname}
                onChange={this.onChange}
                error={errors.lastname}
              />
              <label class="control-label" for="input">
                Last Name
              </label>
              <i class="mtrl-select" />
            </div>
            <div class="form-group">
              <input
                type="text"
                required="required"
                name="location"
                value={this.state.location}
                onChange={this.onChange}
                error={errors.location}
              />
              <label class="control-label" for="input">
                Location
              </label>
              <i class="mtrl-select" />
            </div>
            <div class="form-group">
              <input
                type="text"
                name="bio"
                value={this.state.bio}
                onChange={this.onChange}
                error={errors.bio}
              />
              <label class="control-label" for="input">
                About Me
              </label>
              <i class="mtrl-select" />
            </div>{" "}
            <h5 class="f-title ext-margin">
              <i class="ti-share" /> Your Social Accounts
            </h5>
            <div class="form-group">
              <button
                class="mtr-btn"
                type="button"
                onClick={() => {
                  this.setState(prevState => ({
                    displaySocialInputs: !prevState.displaySocialInputs
                  }));
                }}
              >
                <span>Add Social Network Links</span>
              </button>
            </div>
            {socialInputs}
            <div class="submit-btns">
              <button type="submit" class="mtr-btn">
                <span>Save</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getProfileByHandle }
)(withRouter(EditProfile));
