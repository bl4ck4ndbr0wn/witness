import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <div class="responsive-header">
        <div class="mh-head first Sticky">
          <span class="mh-btns-left">
            <a class="" href="#menu">
              <i class="fa fa-align-justify" />
            </a>
          </span>
          <span class="mh-text">
            <a href="newsfeed.html" title="">
              <img src="images/logo2.png" alt="" style={{ height: "34px" }} />
            </a>
          </span>
          <span class="mh-btns-right">
            <Link to="/login" title="login" data-ripple="">
              <i class="ti-user" />
            </Link>
          </span>
        </div>
        <nav id="menu" class="res-menu">
          <ul>
            <li>
              <Link to="/" title="Home" data-ripple="">
                <i class="ti-home" /> Home
              </Link>
            </li>
            <li>
              <Link to="/profile" title="">
                <i class="ti-user" /> Profile
              </Link>
            </li>
          </ul>
        </nav>{" "}
      </div>
    );
  }
}
