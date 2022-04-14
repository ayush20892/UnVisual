import React from "react";
import { videoType } from "../../utils/types";
import VideoVertical from "../videoInfo/vertical/videoVertical";
import "./verticalVideoDisplay.css";

function VerticalVideoDisplay({
  videos,
  pageType,
}: {
  videos: videoType[];
  pageType: string;
}) {
  return (
    <div className="vertical-display">
      <div className="vertical-video-display">
        {videos.map((video) => {
          return (
            <div className="video-box-vertical" key={video._id}>
              <VideoVertical video={video} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default VerticalVideoDisplay;
