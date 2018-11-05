import React from "react";

export default () => {
  return (
    <header
      className="header-area overlay full-height relative v-center"
      id="home-page"
    >
      <div className="absolute anlge-bg" />
      <div className="container">
        <div className="row v-center">
          <div className="col-xs-12 col-md-7 header-text">
            <h2>It’s all about Promoting your Business</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero
              ex inventore vel error quibusdam animi fugiat, doloribus dolores
              consectetur nulla deleniti sint blanditiis quod debitis quis vitae
              officiis tempora numquam.
            </p>
            <a href="#" className="button white">
              Watch video
            </a>
          </div>
          <div className="hidden-xs hidden-sm col-md-5 text-right">
            <div className="screen-box screen-slider">
              <div className="item">
                <img src="images/screen-1.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
