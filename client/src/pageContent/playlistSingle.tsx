import React from "react";
import { useParams } from "react-router-dom";
import HorizontalVideoDisplay from "../components/horizontalVideoDisplay/horizontalVideoDisplay";
import { useAuth } from "../context/authContext";

function PlaylistSingle() {
  const { playlistId } = useParams();
  const { authState } = useAuth();
  const playlist = authState.playlists.find(
    (playlist) => playlist._id === playlistId
  );

  return (
    <div>
      <HorizontalVideoDisplay
        videos={playlist?.playlistVideos!}
        pageType={playlist?.playlistName!}
      />
    </div>
  );
}

export default PlaylistSingle;
