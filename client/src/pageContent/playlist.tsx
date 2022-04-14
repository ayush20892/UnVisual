import React from "react";
import PlaylistCardDisplay from "../components/playlistCardDisplay/playlistCardDisplay";
import { useAuth } from "../context/authContext";

function Playlist() {
  const { authState } = useAuth();
  return <PlaylistCardDisplay playlists={authState.playlists} />;
}

export default Playlist;
