import React from "react";

export default function Footer() {
  return (
    <div>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-4">
              <div className="widget">
                <div className="foot-logo">
                  <div className="logo">
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
                <ul className="location">
                  <li>
                    <i className="ti-map-alt" />
                    <p>123 A Wonderful Place of EOS</p>
                  </li>
                  <li>
                    <i className="ti-mobile" />
                    <p>+1-56-346 345</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-4">
              <div className="widget">
                <div className="widget-title">
                  <h4>follow</h4>
                </div>
                <ul className="list-style">
                  <li>
                    <i className="fa fa-facebook-square" />{" "}
                    <a href="https://web.facebook.com/eoswitnessio/" target="_blank" title="">
                      facebook
                    </a>
                  </li>
                  <li>
                    <i className="fa fa-twitter-square" />
                    <a href="https://twitter.com/eoswitnessio" target="_blank" title="">
                      twitter
                    </a>
                  </li>
                  <li>
                    <i className="fa fa-instagram" />
                    <a href="https://www.instagram.com/?hl=en" target="_blank" title="">
                      instagram
                    </a>
                  </li>
                  <li>
                    <i className="fa fa-google-plus-square" />{" "}
                    <a href="https://plus.google.com/discover" target="_blank" title="">
                      Google+
                    </a>
                  </li>
                  <li>
                    <i className="fa fa-pinterest-square" />{" "}
                    <a href="https://www.pinterest.com/" target="_blank" title="">
                      Pintrest
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-4">
              <div className="widget">
                <div className="widget-title">
                  <h4>Navigate</h4>
                </div>
                <ul className="list-style">
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
            <div className="col-lg-2 col-md-4">
              <div className="widget">
                <div className="widget-title">
                  <h4>download apps</h4>
                </div>
                <ul className="colla-apps">
                  <li>
                    <a href="https://play.google.com/store?hl=en" title="">
                      <i className="fa fa-android" />
                      android
                    </a>
                  </li>
                  <li>
                    <a href="https://www.apple.com/lae/ios/app-store/" title="">
                      <i className="ti-apple" />
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
      <div className="bottombar">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <span className="copyright">
                © EOSwitness.io Series LLC 2018. All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
