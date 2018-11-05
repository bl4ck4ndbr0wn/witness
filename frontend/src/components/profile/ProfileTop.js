import PropTypes from "prop-types";

import React, { Component } from "react";

class ProfileTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0
    };
  }

  render() {
    return (
      <section>
        <div class="feature-photo">
          <figure>
            <img src="images/resources/timeline-1.jpg" alt="" />
          </figure>
          <form class="edit-phto">
            <i class="fa fa-camera-retro" />
            <label class="fileContainer">
              Edit Cover Photo
              <input type="file" />
            </label>
          </form>
          <div class="container-fluid">
            <div class="row merged">
              <div class="col-lg-2 col-sm-3">
                <div class="user-avatar">
                  <figure>
                    <img src="images/resources/user-avatar.jpg" alt="" />
                    <form class="edit-phto">
                      <i class="fa fa-camera-retro" />
                      <label class="fileContainer">
                        Edit Display Photo
                        <input type="file" />
                      </label>
                    </form>
                  </figure>
                </div>
              </div>
              <div class="col-lg-10 col-sm-9">
                <div class="timeline-info">
                  <ul>
                    <li class="admin-name">
                      <h5>Janice Griffith</h5>
                      <span>Group Admin</span>
                    </li>
                    <li>
                      <a
                        class={this.state.active === 0 ? "active" : ""}
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
                        class={this.state.active === 1 ? "active" : ""}
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
                        class={this.state.active === 2 ? "active" : ""}
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
                        class={this.state.active === 3 ? "active" : ""}
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
                        class={this.state.active === 4 ? "active" : ""}
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
                        class={this.state.active === 5 ? "active" : ""}
                        title=""
                        data-ripple=""
                        onClick={() => {
                          this.setState({ active: 5 });
                          this.props.handleComponent(5);
                        }}
                      >
                        Account Settings
                      </a>
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
  handleComponent: PropTypes.func.isRequired
};

export default ProfileTop;
