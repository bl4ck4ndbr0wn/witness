import React from "react";

export default function ShortCut() {
  return (
    <div className="widget  stick-widget">
      <h4 className="widget-title">Shortcuts</h4>
      <ul className="naves">
        <li>
          <i className="ti-clipboard" />
          <a href="newsfeed.html" title="">
            News feed
          </a>
        </li>

        <li>
          <i className="ti-user" />
          <a href="timeline-friends.html" title="">
            friends
          </a>
        </li>
        <li>
          <i className="ti-image" />
          <a href="timeline-photos.html" title="">
            Education
          </a>
        </li>
        <li>
          <i className="ti-video-camera" />
          <a href="timeline-videos.html" title="">
            Experiences
          </a>
        </li>
        <li>
          <i className="ti-comments-smiley" />
          <a href="messages.html" title="">
            Skills
          </a>
        </li>
      </ul>
    </div>
  );
}
