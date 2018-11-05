import React, { Component } from "react";
import Header from "../layout/Header";
import TopHeader from "../layout/TopHeader";
import Footer from "../layout/Footer";
import ShortCut from "./ShortCut";
import RecentActivities from "./RecentActivities";
import Claims from "../claims/Claims";

export default class Dashboard extends Component {
  render() {
    return (
      <section>
        <div class="gap gray-bg">
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-12">
                <div class="row" id="page-contents">
                  <div class="col-lg-3">
                    <aside class="sidebar static">
                      <ShortCut />
                      <RecentActivities />
                    </aside>
                  </div>

                  <div class="col-lg-6">
                    <div class="loadMore">
                      <Claims />
                    </div>
                  </div>

                  <div class="col-lg-3">
                    <aside class="sidebar static">
                      <div class="widget">
                        <div class="banner medium-opacity bluesh">
                          <div
                            class="bg-image"
                            style={{
                              backgroundImage:
                                "url(images/resources/baner-widgetbg.jpg)"
                            }}
                          />
                          <div class="baner-top">
                            <span>
                              <img alt="" src="images/book-icon.png" />
                            </span>
                            <i class="fa fa-ellipsis-h" />
                          </div>
                          <div class="banermeta">
                            <p>create your own favourit page.</p>
                            <span>like them all</span>
                            <a data-ripple="" title="" href="#">
                              start now!
                            </a>
                          </div>
                        </div>
                      </div>
                    </aside>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
