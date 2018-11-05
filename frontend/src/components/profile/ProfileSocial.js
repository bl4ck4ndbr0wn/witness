import React from "react";

export default function ProfileSocial() {
  return (
    <div class="widget">
      <h4 class="widget-title">Socials</h4>
      <ul class="socials">
        <li class="facebook">
          <a title="" href="time-line.html#">
            <i class="fa fa-facebook" /> <span>facebook</span>{" "}
            <ins>45 likes</ins>
          </a>
        </li>
        <li class="twitter">
          <a title="" href="time-line.html#">
            <i class="fa fa-twitter" /> <span>twitter</span>
            <ins>25 likes</ins>
          </a>
        </li>
        <li class="google">
          <a title="" href="time-line.html#">
            <i class="fa fa-google" /> <span>google</span>
            <ins>35 likes</ins>
          </a>
        </li>
      </ul>
    </div>
  );
}
