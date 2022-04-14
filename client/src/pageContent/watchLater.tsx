import React from "react";
import HorizontalVideoDisplay from "../components/horizontalVideoDisplay/horizontalVideoDisplay";
import { useAuth } from "../context/authContext";

function WatchLater() {
  const { authState } = useAuth();
  return (
    <div>
      <HorizontalVideoDisplay
        videos={authState.watchLater}
        pageType="Watch Later"
      />
    </div>
  );
}

export default WatchLater;
