import { MdWatchLater } from "react-icons/md";
import { RiPlayListAddLine } from "react-icons/ri";
import { AiOutlineLike } from "react-icons/ai";
import { RiHistoryFill } from "react-icons/ri";
import { AiOutlineComment } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useVideo } from "../context/videoContext";
import { toast } from "react-toastify";
import {
  addToWatchLaterHandler,
  deleteFromHistoryHandler,
  deleteFromLikedVideosHandler,
  deleteFromWatchLaterHandler,
  deletePlaylistHandler,
  deleteFromSinglePlaylistHandler,
  deleteCommentHandler,
  playlistOpenHandler,
} from "./videoCalls";

export const ActionMenuItems = (pathName: string) => {
  const { authState, authDispatch, setNetworkLoader } = useAuth();
  const { videoState, videoDispatch } = useVideo();
  const navigate = useNavigate();

  const playlistActions = {
    icon: RiPlayListAddLine,
    name: "playlists",
    action: "Add To Playlist",
    actionFunction: (videoId: string) =>
      playlistOpenHandler({ videoId, authState, videoDispatch, navigate }),
  };

  const watchLaterAddRemove = {
    icon: MdWatchLater,
    name: "watchLater",
    action: "Add To Watch Later",
    actionFunction: (videoId: string) =>
      addToWatchLaterHandler({
        videoId,
        authState,
        authDispatch,
        navigate,
        videoState,
        setNetworkLoader,
        toast,
      }),
    alterAction: "Remove From Watch Later",
    alterActionFunction: (videoId: string) =>
      deleteFromWatchLaterHandler({
        videoId,
        authState,
        authDispatch,
        navigate,
        videoState,
        setNetworkLoader,
        toast,
      }),
  };

  const watchLaterRemove = {
    icon: MdWatchLater,
    name: "watchLater",
    action: "Remove From Watch Later",
    actionFunction: (videoId: string) =>
      deleteFromWatchLaterHandler({
        videoId,
        authState,
        authDispatch,
        navigate,
        videoState,
        setNetworkLoader,
        toast,
      }),
  };

  const likedVideosRemove = {
    icon: AiOutlineLike,
    name: "likedVideos",
    action: "Remove From Liked Videos",
    actionFunction: (videoId: string) =>
      deleteFromLikedVideosHandler({
        videoId,
        authState,
        authDispatch,
        navigate,
        videoState,
        videoDispatch,
        setNetworkLoader,
        toast,
      }),
  };

  const historyRemove = {
    icon: RiHistoryFill,
    name: "history",
    action: "Remove From History",
    actionFunction: (videoId: string) =>
      deleteFromHistoryHandler({
        videoId,
        authState,
        authDispatch,
        navigate,
        videoState,
        setNetworkLoader,
        toast,
      }),
  };

  const playlistDelete = {
    icon: RiPlayListAddLine,
    name: "playlist",
    action: "Delete Playlist",
    actionFunction: (playlistId: string) =>
      deletePlaylistHandler({
        playlistId,
        authState,
        authDispatch,
        navigate,
        setNetworkLoader,
        toast,
      }),
  };

  const value = pathName.substring(10);
  const playlist = authState.playlists.find(
    (playlist) => playlist.playlistName === value
  );
  const singlePlaylistRemove = {
    icon: RiPlayListAddLine,
    name: "singlePlaylist",
    action: `Delete from ${value}`,
    actionFunction: (videoId: string) =>
      deleteFromSinglePlaylistHandler({
        playlistId: playlist?._id,
        videoId,
        authState,
        authDispatch,
        navigate,
        videoState,
        setNetworkLoader,
        toast,
      }),
  };

  const pathValue = pathName.substring(7);
  const video = videoState.videos.find((vid) => vid.videoId === pathValue);
  const deleteComment = {
    icon: AiOutlineComment,
    name: "videoComment",
    action: "Delete Comment",
    actionFunction: (commentId: string) =>
      deleteCommentHandler({
        commentId,
        videoId: video!._id,
        authState,
        videoDispatch,
        navigate,
        videoState,
        setNetworkLoader,
        toast,
      }),
  };

  switch (true) {
    case pathName.includes("/watchLater"):
      return [watchLaterRemove, playlistActions];
    case pathName.includes("/likedVideos"):
      return [likedVideosRemove, watchLaterAddRemove, playlistActions];
    case pathName.includes("/history"):
      return [historyRemove, watchLaterAddRemove, playlistActions];
    case pathName.includes("/playlist/"):
      return [watchLaterAddRemove, singlePlaylistRemove];
    case pathName.includes("/playlist"):
      return [playlistDelete];
    case pathName.includes("/video/"):
      return [deleteComment];
    case pathName.includes("/"):
      return [watchLaterAddRemove, playlistActions];
    default:
      return [];
  }
};
