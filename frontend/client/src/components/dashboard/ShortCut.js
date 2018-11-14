import React from "react";

export default function ShortCut() {
  return (
    <div class="widget">
      <h4 class="widget-title">Shortcuts</h4>
      <ul class="naves">
        <li>
          <i class="ti-clipboard" />
          <a href="newsfeed.html" title="">
            News feed
          </a>
        </li>

        <li>
          <i class="ti-user" />
          <a href="timeline-friends.html" title="">
            friends
          </a>
        </li>
        <li>
          <i class="ti-image" />
          <a href="timeline-photos.html" title="">
            Education
          </a>
        </li>
        <li>
          <i class="ti-video-camera" />
          <a href="timeline-videos.html" title="">
            Experiences
          </a>
        </li>
        <li>
          <i class="ti-comments-smiley" />
          <a href="messages.html" title="">
            Skills
          </a>
        </li>
      </ul>
    </div>
  );
}
