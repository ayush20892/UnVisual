import React from "react";
import { videoType } from "../../utils/types";
import VideoHorizontal from "../videoInfo/horizontal/videoHorizontal";
import "./horizontalVisdeoDisplay.css";

function HorizontalVideoDisplay({
  videos,
  pageType,
}: {
  videos: videoType[];
  pageType: string;
}) {
  return (
    <div className="horizontal-display">
      <div className="page-info">
        <h4>{pageType}</h4>
        &#9734;
        <p>
          {videos.length} {videos.length > 1 ? "Videos" : "Video"}
        </p>
      </div>
      {videos.length === 0 ? (
        <h3>There is no video in the list yet.</h3>
      ) : (
        <div className="horizontal-video-display">
          {videos.map((video) => {
            return (
              <div className="video-box" key={video._id}>
                <VideoHorizontal video={video} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default HorizontalVideoDisplay;
