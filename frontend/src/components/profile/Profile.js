import React, { Component } from "react";

import Header from "../layout/Header";
import TopHeader from "../layout/TopHeader";
import Footer from "../layout/Footer";
import ProfileTop from "./ProfileTop";
import ProfileSocial from "./ProfileSocial";
import ShortCut from "../dashboard/ShortCut";
import RecentActivities from "../dashboard/RecentActivities";
import Claims from "../claims/Claims";
import Education from "./Education";
import Experience from "./Experience";
import Skills from "./Skills";
import EditProfile from "./edit-profile/EditProfile";
import AccountSettings from "./accountSettings/AccountSettings";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentNumber: 0
    };
    this.handleComponent = this.handleComponent.bind(this);
  }

  handleComponent(num) {
    console.log(num);
    this.setState({ componentNumber: num });
  }

  renderSwitch(param) {
    switch (param) {
      case 0:
        return <Claims />;
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
        return <Claims />;
    }
  }

  render() {
    return (
      <div>
        <ProfileTop handleComponent={this.handleComponent} />
        <section>
          <div class="gap gray-bg">
            <div class="container-fluid">
              <div class="row">
                <div class="col-lg-12">
                  <div class="row" id="page-contents">
                    <div class="col-lg-3">
                      <aside class="sidebar static">
                        <ProfileSocial />
                        <ShortCut />
                        <RecentActivities />
                      </aside>
                    </div>
                    <div class="col-lg-9">
                      <div class="loadMore">
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
