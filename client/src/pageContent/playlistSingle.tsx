import React from "react";
import { useParams } from "react-router-dom";
import HorizontalVideoDisplay from "../components/horizontalVideoDisplay/horizontalVideoDisplay";
import { useAuth } from "../context/authContext";

function PlaylistSingle() {
  const { playlistName } = useParams();
  const { authState } = useAuth();
  const playlistVideos = authState.playlists.find(
    (playlist) => playlist.playlistName === playlistName
  )?.playlistVideos;
  return (
    <div>
      <HorizontalVideoDisplay
        videos={playlistVideos!}
        pageType={playlistName!}
      />
    </div>
  );
}

export default PlaylistSingle;
