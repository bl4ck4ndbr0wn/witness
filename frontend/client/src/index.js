import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(
  <div>
    {" "}
    <div className="preloader">
      <div className="sk-folding-cube">
        <div className="sk-cube1 sk-cube" />
        <div className="sk-cube2 sk-cube" />
        <div className="sk-cube4 sk-cube" />
        <div className="sk-cube3 sk-cube" />
      </div>
    </div>
    <App />
  </div>,
  document.getElementById("root")
);
