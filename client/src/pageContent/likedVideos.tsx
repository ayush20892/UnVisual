import React from "react";
import HorizontalVideoDisplay from "../components/horizontalVideoDisplay/horizontalVideoDisplay";
import { useAuth } from "../context/authContext";

function LikedVideos() {
  const { authState } = useAuth();
  return (
    <div>
      <HorizontalVideoDisplay videos={authState.likedVideos} pageType="Liked" />
    </div>
  );
}

export default LikedVideos;
