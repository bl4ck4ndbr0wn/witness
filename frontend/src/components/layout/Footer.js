import React from "react";

export default function Footer() {
  return (
    <div>
      <footer>
        <div class="container">
          <div class="row">
            <div class="col-lg-4 col-md-4">
              <div class="widget">
                <div class="foot-logo">
                  <div class="logo">
                    <a href="index.html" title="">
                      <img
                        src="images/logo.png"
                        alt=""
                        style={{ height: "34px" }}
                      />
                    </a>
                  </div>
                  <p>
                    A 21st century career management tool powered by the EOS
                    blockchain
                  </p>
                </div>
                <ul class="location">
                  <li>
                    <i class="ti-map-alt" />
                    <p>123 A Wonderful Place of EOS</p>
                  </li>
                  <li>
                    <i class="ti-mobile" />
                    <p>+1-56-346 345</p>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-2 col-md-4">
              <div class="widget">
                <div class="widget-title">
                  <h4>follow</h4>
                </div>
                <ul class="list-style">
                  <li>
                    <i class="fa fa-facebook-square" />{" "}
                    <a href="https://web.facebook.com/eoswitnessio/" target="_blank" title="">
                      facebook
                    </a>
                  </li>
                  <li>
                    <i class="fa fa-twitter-square" />
                    <a href="https://twitter.com/eoswitnessio" target="_blank" title="">
                      twitter
                    </a>
                  </li>
                  <li>
                    <i class="fa fa-instagram" />
                    <a href="https://www.instagram.com/?hl=en" target="_blank" title="">
                      instagram
                    </a>
                  </li>
                  <li>
                    <i class="fa fa-google-plus-square" />{" "}
                    <a href="https://plus.google.com/discover" target="_blank" title="">
                      Google+
                    </a>
                  </li>
                  <li>
                    <i class="fa fa-pinterest-square" />{" "}
                    <a href="https://www.pinterest.com/" target="_blank" title="">
                      Pintrest
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-2 col-md-4">
              <div class="widget">
                <div class="widget-title">
                  <h4>Navigate</h4>
                </div>
                <ul class="list-style">
                  <li>
                    <a href="about.html" title="">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="contact.html" title="">
                      contact us
                    </a>
                  </li>
                  <li>
                    <a href="#" title="">
                      Terms & Conditions
                    </a>
                  </li>
                  <li>
                    <a href="index.html#" title="">
                      RSS syndication
                    </a>
                  </li>
                  <li>
                    <a href="#" title="">
                      Sitemap
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-2 col-md-4">
              <div class="widget">
                <div class="widget-title">
                  <h4>download apps</h4>
                </div>
                <ul class="colla-apps">
                  <li>
                    <a href="https://play.google.com/store?hl=en" title="">
                      <i class="fa fa-android" />
                      android
                    </a>
                  </li>
                  <li>
                    <a href="https://www.apple.com/lae/ios/app-store/" title="">
                      <i class="ti-apple" />
                      iPhone
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* <!-- footer --> */}
      <div class="bottombar">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <span class="copyright">
                © EOSwitness.io Series LLC 2018. All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
