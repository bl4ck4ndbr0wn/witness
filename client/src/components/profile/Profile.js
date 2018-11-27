import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ProfileTop from "./ProfileTop";
import ProfileSocial from "./ProfileSocial";
import ShortCut from "../dashboard/ShortCut";
import RecentActivities from "../dashboard/RecentActivities";
import ClaimsFeed from "../claims/ClaimsFeed";
import Education from "./Education";
import Experience from "./Experience";
import Skills from "./Skills";
import EditProfile from "./edit-profile/EditProfile";
import AccountSettings from "./accountSettings/AccountSettings";
import Spinner from "../common/Spinner";

import { getProfileByHandle } from "../../actions/profileAction";
import { getClaimsByHandle } from "../../actions/claimsActions";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentNumber: 0
    };
    this.handleComponent = this.handleComponent.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
      this.props.getClaimsByHandle(this.props.match.params.handle);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push("/not-found");
    }
  }

  handleComponent(num) {
    this.setState({ componentNumber: num });
  }

  renderSwitch(param) {
    const { claims } = this.props.claim;

    if (claims === null) {
      return "";
    } else {
      const education = claims.find(edu => edu.category === "Education");
      const experience = claims.find(edu => edu.category === "Experience");
      const skills = claims.find(edu => edu.category === "Skills");

      switch (param) {
        case 0:
          return <ClaimsFeed claims={claims} />;
        case 1:
          return <Education />;
        case 2:
          return <Experience />;
        case 3:
          return <Skills />;
        case 4:
          return <EditProfile />;
        case 5:
          return <AccountSettings />;

        default:
          return <ClaimsFeed claims={claims} />;
      }
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        profileContent = (
          <ProfileTop
            handleComponent={this.handleComponent}
            profile={profile}
          />
        );
      } else {
        // User is logged in but has no profile
        profileContent = <div />;
      }
    }
    return (
      <div>
        {profileContent}
        <section>
          <div className="gap gray-bg">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <div className="row" id="page-contents">
                    <div className="col-lg-3">
                      <aside className="sidebar static">
                        <ProfileSocial />
                        {/* <ShortCut /> */}
                        <RecentActivities />
                      </aside>
                    </div>
                    <div className="col-lg-9">
                      <div className="loadMore">
                        {this.renderSwitch(this.state.componentNumber)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  getClaimsByHandle: PropTypes.func.isRequired,
  claim: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  claim: state.claim,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfileByHandle, getClaimsByHandle }
)(Profile);
