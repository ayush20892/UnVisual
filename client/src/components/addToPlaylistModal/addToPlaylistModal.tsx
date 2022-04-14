import React, { useState } from "react";
import "./addToPlaylistModal.css";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { useVideo } from "../../context/videoContext";
import { useAuth } from "../../context/authContext";
import { videoType } from "../../utils/types";
import {
  addToSinglePlaylistHandler,
  createPlaylistHandler,
  deleteFromSinglePlaylistHandler,
} from "../../utils/videoCalls";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"

function AddToPlaylistModal() {
  const { videoState, videoDispatch } = useVideo();
  const { authState, authDispatch, setNetworkLoader } = useAuth();
  const navigate = useNavigate();
  const [newPlaylistState, setNewPlaylistState] = useState("");
  const { videoToBeAddedToPlaylist } = videoState;
  function isChecked(playlistVideos: videoType[]) {
    if (
      playlistVideos.find(
        (video) => video._id === videoState.videoToBeAddedToPlaylist
      )
    )
      return true;
    return false;
  }

  function createPlaylist() {
    createPlaylistHandler({
      playlistName: newPlaylistState,
      authState,
      authDispatch,
      navigate,
      setNetworkLoader,
      toast
    });
    videoDispatch({ type: "TOGGLE_CREATE_PLAYLIST" });
  }

  return (
    <div
      className="modal-page"
      onClick={() => videoDispatch({ type: "HIDE_PLAYLIST_MODAL" })}
    >
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="header">
          Add To Playlist{" "}
          <span onClick={() => videoDispatch({ type: "HIDE_PLAYLIST_MODAL" })}>
            <AiOutlineClose />
          </span>
        </div>
        <div className="playlist-list">
          {authState.playlists.map(({ _id, playlistName, playlistVideos }) => {
            return (
              <div key={_id} className="playlist-checkbox">
                <input
                  type="checkbox"
                  onChange={() =>
                    !isChecked(playlistVideos)
                      ? addToSinglePlaylistHandler({
                          playlistId: _id,
                          videoId: videoToBeAddedToPlaylist,
                          authState,
                          authDispatch,
                          navigate,
                          videoState,
                          setNetworkLoader,
                          toast
                        })
                      : deleteFromSinglePlaylistHandler({
                          playlistId: _id,
                          videoId: videoToBeAddedToPlaylist,
                          authState,
                          authDispatch,
                          navigate,
                          videoState,
                          setNetworkLoader,
                          toast
                        })
                  }
                  checked={isChecked(playlistVideos)}
                />
                <span>{playlistName}</span>
              </div>
            );
          })}
        </div>
        {!videoState.showCreatePlaylistInput ? (
          <div
            onClick={() => videoDispatch({ type: "TOGGLE_CREATE_PLAYLIST" })}
            className="new-playlist"
          >
            <span>
              <AiOutlinePlus />
            </span>{" "}
            Create New Playlist
          </div>
        ) : (
          <div className="new-playlist-input">
            <input
              onChange={(e) => setNewPlaylistState(e.target.value)}
              type="text"
              placeholder="Playlist Name"
            />
            <button onClick={() => createPlaylist()}>CREATE</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddToPlaylistModal;
