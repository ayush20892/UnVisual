import React from "react";
import "./videoVertical.css";
import { videoType } from "../../../utils/types";
import { useNavigate } from "react-router-dom";
import ActionMenuDropdown from "../../actionMenuDropdown/actionMenuDropdown";

function VideoVertical({ video }: { video: videoType }) {
  const navigate = useNavigate();

  return (
    <>
      <div
        onClick={() => navigate(`/video/${video.videoId}`)}
        className="img-box"
      >
        <img src={video.image} alt="thumbnail" />
        <span>{video.duration}</span>
      </div>
      <div className="video-details">
        <div className="video-info">
          <h4 onClick={() => navigate(`/video/${video.videoId}`)}>
            {video.title}
          </h4>
          <p>
            {video.creator} &#9734; {video.views}
          </p>
        </div>
        <ActionMenuDropdown item={video._id} />
      </div>
    </>
  );
}

export default VideoVertical;
