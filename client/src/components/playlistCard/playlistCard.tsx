import React from "react";
import { playlistType } from "../../utils/types";
import "./playlistCard.css";
import { useNavigate } from "react-router-dom";
import { RiPlayListAddFill } from "react-icons/ri";
import ActionMenuDropdown from "../actionMenuDropdown/actionMenuDropdown";
import emptyPlaylist from "../../icon/emptyPlaylist.jpg";

function PlaylistCard({ playlist }: { playlist: playlistType }) {
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => navigate(`/playlist/${playlist._id}`)}
        className="img-box"
      >
        <img
          src={
            playlist.playlistVideos.length === 0
              ? emptyPlaylist
              : playlist.playlistVideos[0].image
          }
          alt="thumbnail"
        />
        <div className="playlist-cover">
          <p>{playlist.playlistVideos.length}</p>
          <RiPlayListAddFill />
        </div>
      </div>
      <div className="playlist-details">
        <div className="playlist-info">
          <h4>{playlist.playlistName}</h4>
          <p onClick={() => navigate(`/playlist/${playlist._id}`)}>
            VIEW FULL PLAYLIST
          </p>
        </div>
        <ActionMenuDropdown item={playlist._id} />
      </div>
    </>
  );
}

export default PlaylistCard;
