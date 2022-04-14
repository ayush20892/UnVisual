import React, { useEffect, useState } from "react";
import "./videoCard.css";
import { videoType } from "../../utils/types";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { RiPlayListAddLine } from "react-icons/ri";
import { MdWatchLater } from "react-icons/md";
import {
  addCommentHandler,
  addToWatchLaterHandler,
  addToLikedVideosHandler,
  deleteFromLikedVideosHandler,
  deleteFromWatchLaterHandler,
  playlistOpenHandler,
} from "../../utils/videoCalls";
import { useAuth } from "../../context/authContext";
import { useVideo } from "../../context/videoContext";
import { useNavigate } from "react-router-dom";
import ActionMenuDropdown from "../actionMenuDropdown/actionMenuDropdown";
import { CheckInList } from "../../utils/userUtils";
import { toast } from "react-toastify";
import { BsX } from "react-icons/bs";

function VideoCard({ video }: { video: videoType }) {
  const { authState, authDispatch, setNetworkLoader } = useAuth();
  const { videoState, videoDispatch } = useVideo();
  const [comment, setComment] = useState("");
  const [commentCross, setCommentCross] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (comment !== "") setCommentCross(true);
  }, [comment]);

  return (
    <div className="video-display">
      <div className="video-card-box">
        {/* Video Box */}
        <div className="video">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="video-details">
          <h3>{video.title}</h3>
          <p>
            {video.creator} &#9734; {video.views}
          </p>
        </div>
        <div className="video-icons">
          {/* Liked Icon */}
          {video.likes !== 0 ? (
            <>
              {video.likes} &nbsp;
              {video.likes > 1 ? <span>Likes</span> : <span>Like</span>}
            </>
          ) : (
            <></>
          )}
          {CheckInList(authState.likedVideos, video._id) ? (
            <AiFillLike
              className="icon"
              style={{ fill: "var(--brand-color)" }}
              onClick={() =>
                deleteFromLikedVideosHandler({
                  videoId: video._id,
                  authState,
                  authDispatch,
                  navigate,
                  videoState,
                  videoDispatch,
                  setNetworkLoader,
                  toast,
                })
              }
            />
          ) : (
            <AiOutlineLike
              className="icon"
              onClick={() =>
                addToLikedVideosHandler({
                  videoId: video._id,
                  authState,
                  authDispatch,
                  navigate,
                  videoState,
                  videoDispatch,
                  setNetworkLoader,
                  toast,
                })
              }
            />
          )}

          {/* Playlist Icon */}
          <RiPlayListAddLine
            className="icon"
            onClick={() =>
              playlistOpenHandler({
                videoId: video._id,
                authState,
                videoDispatch,
                navigate,
              })
            }
          />

          {/* WatchLater Icon */}
          {CheckInList(authState.watchLater, video._id) ? (
            <MdWatchLater
              style={{ fill: "var(--brand-color)" }}
              onClick={() =>
                deleteFromWatchLaterHandler({
                  videoId: video._id,
                  authState,
                  authDispatch,
                  navigate,
                  videoState,
                  setNetworkLoader,
                  toast,
                })
              }
              className="icon"
            />
          ) : (
            <MdWatchLater
              onClick={() =>
                addToWatchLaterHandler({
                  videoId: video._id,
                  authState,
                  authDispatch,
                  navigate,
                  videoState,
                  setNetworkLoader,
                  toast,
                })
              }
              className="icon"
            />
          )}
        </div>

        <hr />
      </div>

      {/* Comment Box */}
      <div className="comment-box">
        {/* Comment Display */}
        <div className="comment-display">
          {video.comments.length === 0 ? (
            <h4>Be the first to comment !!</h4>
          ) : (
            video.comments.map((userComment) => {
              return (
                <div className="comment-old-box" key={userComment._id}>
                  <div className="comment-old" key={userComment._id}>
                    <div className="userName">{userComment.user.name}</div>
                    <div className="comment-old-user">
                      {userComment.comment}
                    </div>
                  </div>
                  <div>
                    {authState.userName === userComment.user.name && (
                      <ActionMenuDropdown item={userComment._id!} />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Comment User Box */}
        {!authState.userId ? (
          <div className="comment-login">
            {" "}
            To Comment{" "}
            <button onClick={() => navigate("/user/login")}>LOGIN</button>
          </div>
        ) : (
          <div className="comment-user">
            <div className="userName">{authState.userName}</div>
            <div className="comment-input">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <div
                className="comment-cross"
                onClick={() => {
                  setComment("");
                  setCommentCross(false);
                }}
              >
                {commentCross ? <BsX /> : <></>}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setCommentCross(false);
                addCommentHandler({
                  comment,
                  videoId: video._id,
                  authState,
                  videoDispatch,
                  navigate,
                  videoState,
                  setNetworkLoader,
                  setComment,
                });
              }}
            >
              Comment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default VideoCard;
