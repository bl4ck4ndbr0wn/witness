import React from "react";
import { Link } from "react-router-dom";

import Login from "../auth/Login";

export default function TopHeader() {
  return (
    <div class="topbar stick">
      <div class="logo">
        <Link title="" to="/">
          <img src="images/logo.png" alt="" style={{ height: "34px" }} />
        </Link>
      </div>

      <div class="top-area">
        <ul class="main-menu">
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
          <li>
            <a href="javascript;;" onClick={Login}>
              <i class="ti-user" /> Login with scatter
            </a>
          </li>
        </ul>
        <ul class="setting-area">
          <li>
            <Link to="/" title="Home" data-ripple="">
              <i class="ti-search" />
            </Link>
            <div class="searched">
              <form method="post" class="form-search">
                <input type="text" placeholder="Search Friend" />
                <button data-ripple>
                  <i class="ti-search" />
                </button>
              </form>
            </div>
          </li>
          <li>
            <Link to="#" title="Notification" data-ripple="">
              <i class="ti-bell" />
              <span>20</span>
            </Link>
            <div class="dropdowns">
              <span>4 New Notifications</span>
              <ul class="drops-menu">
                <li>
                  <Link to="notifications.html" title="">
                    <img src="images/resources/thumb-1.jpg" alt="" />
                    <div class="mesg-meta">
                      <h6>sarah Loren</h6>
                      <span>Hi, how r u dear ...?</span>
                      <i>2 min ago</i>
                    </div>
                  </Link>
                  <span class="tag green">New</span>
                </li>
                <li>
                  <Link to="notifications.html" title="">
                    <img src="images/resources/thumb-2.jpg" alt="" />
                    <div class="mesg-meta">
                      <h6>Jhon doe</h6>
                      <span>Hi, how r u dear ...?</span>
                      <i>2 min ago</i>
                    </div>
                  </Link>
                  <span class="tag red">Reply</span>
                </li>
                <li>
                  <Link to="notifications.html" title="">
                    <img src="images/resources/thumb-3.jpg" alt="" />
                    <div class="mesg-meta">
                      <h6>Andrew</h6>
                      <span>Hi, how r u dear ...?</span>
                      <i>2 min ago</i>
                    </div>
                  </Link>
                  <span class="tag blue">Unseen</span>
                </li>
                <li>
                  <Link to="notifications.html" title="">
                    <img src="images/resources/thumb-4.jpg" alt="" />
                    <div class="mesg-meta">
                      <h6>Tom cruse</h6>
                      <span>Hi, how r u dear ...?</span>
                      <i>2 min ago</i>
                    </div>
                  </Link>
                  <span class="tag">New</span>
                </li>
                <li>
                  <Link to="notifications.html" title="">
                    <img src="images/resources/thumb-5.jpg" alt="" />
                    <div class="mesg-meta">
                      <h6>Amy</h6>
                      <span>Hi, how r u dear ...?</span>
                      <i>2 min ago</i>
                    </div>
                  </Link>
                  <span class="tag">New</span>
                </li>
              </ul>
              <Link to="notifications.html" title="" class="more-mesg">
                view more
              </Link>
            </div>
          </li>
        </ul>

        {/* <div class="user-img mr-4">
          <img src="images/resources/admin.jpg" alt="" />
          <span class="status f-online" />
          <div class="user-setting">
            <Link to="#" title="">
              <span class="status f-online" />
              online
            </Link>
            <Link to="#" title="">
              <span class="status f-away" />
              away
            </Link>
            <Link to="#" title="">
              <span class="status f-off" />
              offline
            </Link>
            <Link to="/profile" title="">
              <i class="ti-user" /> view profile
            </Link>
            <Link to="#" title="">
              <i class="ti-settings" />
              account setting
            </Link>
            <Link to="#" title="">
              <i class="ti-power-off" />
              log out
            </Link>
          </div>
        </div>
      */}
      </div>
    </div>
  );
}
