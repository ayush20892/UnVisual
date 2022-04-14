import React from "react";
import { playlistType } from "../../utils/types";
import PlaylistCard from "../playlistCard/playlistCard";
import "./playlistCardDisplay.css";

function PlaylistCardDisplay({ playlists }: { playlists: playlistType[] }) {
  return (
    <div className="playlist-display">
      <div className="page-info">
        <h4>Playlists</h4>
        &#9734;
        <p>
          {playlists.length} {playlists.length > 1 ? "Playlists" : "Playlist"}
        </p>
      </div>

      <div className="playlist">
        {playlists.map((singlePlaylist) => {
          return (
            <div key={singlePlaylist._id} className="playlist-card">
              <PlaylistCard playlist={singlePlaylist} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PlaylistCardDisplay;
