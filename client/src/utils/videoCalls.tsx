import {
  addToWatchLater,
  deleteFromWatchLater,
} from "./networkCall/watchLaterCalls";
import {
  addToLikedVideos,
  deleteFromLikedVideos,
} from "./networkCall/likedVideosCalls";
import {
  addToHistory,
  deleteFromHistory,
  clearAllHistory,
} from "./networkCall/historyCalls";
import { createPlaylist, deletePlaylist } from "./networkCall/playlistCalls";
import {
  addToSinglePlaylist,
  deleteFromSinglePlaylist,
} from "./networkCall/singlePlaylistCalls";
import { addToComment, deleteFromComment } from "./networkCall/videoCalls";
import {
  AuthInitialStateType,
  VideoInitialStateType,
  videoType,
  playlistType,
} from "./types";

export function getVideo(videoList: videoType[], videoId: string) {
  const video = videoList.find((item) => {
    return item._id === videoId;
  });
  return video;
}

export function getPlaylist(playlists: playlistType[], playlistId: string) {
  const playlist = playlists.find((playlist) => {
    return playlist._id === playlistId;
  });
  return playlist;
}

type videoCallsType = {
  playlistId?: string;
  playlistName?: string;
  comment?: string;
  commentId?: string;
  videoId?: string;
  authState: AuthInitialStateType;
  authDispatch?: Function;
  videoDispatch?: Function;
  navigate: Function;
  videoState?: VideoInitialStateType;
  setNetworkLoader: Function;
  setComment?: Function;
  toast?: Function;
};
export async function addToWatchLaterHandler({
  videoId,
  authState,
  authDispatch,
  navigate,
  videoState,
  setNetworkLoader,
  toast,
}: videoCallsType) {
  if (authState.userId === "") {
    navigate("/user/login", { replace: true });
    return;
  }
  setNetworkLoader(true);
  const data = await addToWatchLater(videoId!);
  setNetworkLoader(false);
  if (data.success) {
    toast!("Video added to watch later.");
    authDispatch!({
      type: "ADD_TO_WATCH_LATER",
      payload: getVideo(videoState!.videos, videoId!),
    });
  }
  if (!data.success) {
    navigate("/user/login", { replace: true });
    return;
  }
}

export async function deleteFromWatchLaterHandler({
  videoId,
  authState,
  authDispatch,
  navigate,
  videoState,
  setNetworkLoader,
  toast,
}: videoCallsType) {
  if (authState.userId === null) {
    navigate("/user/login", { replace: true });
    return;
  }
  setNetworkLoader(true);
  const data = await deleteFromWatchLater(videoId!);
  setNetworkLoader(false);
  if (data.success) {
    toast!("Video removed from watch later.");
    authDispatch!({
      type: "REMOVE_FROM_WATCH_LATER",
      payload: getVideo(videoState!.videos, videoId!),
    });
  }
}

export async function addToLikedVideosHandler({
  videoId,
  authState,
  authDispatch,
  navigate,
  videoState,
  videoDispatch,
  setNetworkLoader,
  toast,
}: videoCallsType) {
  if (authState.userId === null) {
    navigate("/user/login", { replace: true });
    return;
  }
  setNetworkLoader(true);
  const data = await addToLikedVideos(videoId!);
  setNetworkLoader(false);
  if (data.success) {
    toast!("Video added to Liked Videos.");
    authDispatch!({
      type: "ADD_TO_LIKED_VIDEOS",
      payload: getVideo(videoState!.videos, videoId!),
    });
    videoDispatch!({
      type: "LIKE",
      payload: {
        videoId: videoId,
        type: "INC",
      },
    });
  }
  if (!data.success) {
    navigate("/user/login", { replace: true });
    return;
  }
}

export async function deleteFromLikedVideosHandler({
  videoId,
  authState,
  authDispatch,
  navigate,
  videoState,
  videoDispatch,
  setNetworkLoader,
  toast,
}: videoCallsType) {
  if (authState.userId === null) {
    navigate("/user/login", { replace: true });
    return;
  }
  setNetworkLoader(true);
  const data = await deleteFromLikedVideos(videoId!);
  setNetworkLoader(false);
  if (data.success) {
    toast!("Video removed from liked videos.");
    authDispatch!({
      type: "REMOVE_FROM_LIKED_VIDEOS",
      payload: getVideo(videoState!.videos, videoId!),
    });
    videoDispatch!({
      type: "LIKE",
      payload: {
        videoId: videoId,
        type: "DEC",
      },
    });
  }
}

export async function addToHistoryHandler({
  videoId,
  authState,
  authDispatch,
  navigate,
  videoState,
  setNetworkLoader,
}: videoCallsType) {
  if (authState.userId === null) {
    navigate("/user/login", { replace: true });
    return;
  }
  setNetworkLoader(true);
  const data = await addToHistory(videoId!);
  setNetworkLoader(false);
  if (data.success) {
    authDispatch!({
      type: "ADD_TO_HISTORY",
      payload: getVideo(videoState!.videos, videoId!),
    });
  }
}

export async function deleteFromHistoryHandler({
  videoId,
  authState,
  authDispatch,
  navigate,
  videoState,
  setNetworkLoader,
  toast,
}: videoCallsType) {
  if (authState.userId === "") {
    navigate("/user/login", { replace: true });
    return;
  }
  setNetworkLoader(true);
  const data = await deleteFromHistory(videoId!);
  setNetworkLoader(false);
  if (data.success) {
    toast!("Video removed from history.");
    authDispatch!({
      type: "REMOVE_FROM_HISTORY",
      payload: getVideo(videoState!.videos, videoId!),
    });
  }
}

export async function clearAllHistoryHandler({
  videoId,
  authState,
  authDispatch,
  navigate,
  videoState,
  setNetworkLoader,
  toast,
}: videoCallsType) {
  if (authState.userId === "") {
    navigate("/user/login", { replace: true });
    return;
  }
  setNetworkLoader(true);
  const data = await clearAllHistory();
  setNetworkLoader(false);
  if (data.success) {
    toast!("History Cleared");
    authDispatch!({
      type: "CLEAR_HISTORY",
      payload: getVideo(videoState!.videos, videoId!),
    });
  }
}

export async function createPlaylistHandler({
  playlistName,
  authState,
  authDispatch,
  navigate,
  setNetworkLoader,
  toast,
}: videoCallsType) {
  if (authState.userId === "") {
    navigate("/user/login", { replace: true });
    return;
  }
  setNetworkLoader(true);
  const data = await createPlaylist(playlistName!);
  setNetworkLoader(false);
  if (data.success) {
    toast!(`Playlist ${playlistName} created.`);
    authDispatch!({
      type: "CREATE_PLAYLIST",
      payload: data.lastPlaylist,
    });
  }
  if (!data.success) {
    navigate("/user/login", { replace: true });
    return;
  }
}

export async function deletePlaylistHandler({
  playlistId,
  authState,
  authDispatch,
  navigate,
  setNetworkLoader,
  toast,
}: videoCallsType) {
  if (authState.userId === "") {
    navigate("/user/login", { replace: true });
    return;
  }
  setNetworkLoader(true);
  const data = await deletePlaylist(playlistId!);
  setNetworkLoader(false);
  if (data.success) {
    const playlist = getPlaylist(authState.playlists, playlistId!);
    toast!(`Playlist ${playlist?.playlistName} deleted.`);
    authDispatch!({
      type: "REMOVE_PLAYLIST",
      payload: playlist,
    });
  }
}

export async function addToSinglePlaylistHandler({
  playlistId,
  videoId,
  authState,
  authDispatch,
  navigate,
  videoState,
  setNetworkLoader,
  toast,
}: videoCallsType) {
  if (authState.userId === "") {
    navigate("/user/login", { replace: true });
    return;
  }
  setNetworkLoader(true);
  const data = await addToSinglePlaylist(playlistId!, videoId!);
  setNetworkLoader(false);
  if (data.success) {
    const playlist = getPlaylist(authState.playlists, playlistId!);
    toast!(`Video added to ${playlist!.playlistName}`);
    authDispatch!({
      type: "ADD_TO_PLAYLIST",
      payload: {
        playlist: playlist,
        video: getVideo(videoState!.videos, videoId!),
      },
    });
  }
}

export async function deleteFromSinglePlaylistHandler({
  playlistId,
  videoId,
  authState,
  authDispatch,
  navigate,
  videoState,
  setNetworkLoader,
  toast,
}: videoCallsType) {
  if (authState.userId === "") {
    navigate("/user/login", { replace: true });
    return;
  }
  setNetworkLoader(true);
  const data = await deleteFromSinglePlaylist(playlistId!, videoId!);
  setNetworkLoader(false);
  if (data.success) {
    const playlist = getPlaylist(authState.playlists, playlistId!);
    toast!(`Video removed from ${playlist!.playlistName}.`);
    authDispatch!({
      type: "REMOVE_FROM_PLAYLIST",
      payload: {
        playlist: playlist,
        video: getVideo(videoState!.videos, videoId!),
      },
    });
  }
}

export async function addCommentHandler({
  comment,
  videoId,
  authState,
  videoDispatch,
  navigate,
  videoState,
  setNetworkLoader,
  setComment,
}: videoCallsType) {
  if (authState.userId === "") {
    navigate("/user/login", { replace: true });
    return;
  }
  setNetworkLoader(true);
  const data = await addToComment(comment!, videoId!);
  setNetworkLoader(false);
  if (data.success) {
    setComment!("");
    videoDispatch!({
      type: "ADD_COMMENT",
      payload: {
        comment: data.newComment,
        video: getVideo(videoState!.videos, videoId!),
      },
    });
  }
}

export async function deleteCommentHandler({
  commentId,
  videoId,
  authState,
  videoDispatch,
  navigate,
  videoState,
  setNetworkLoader,
  toast,
}: videoCallsType) {
  if (authState.userId === "") {
    navigate("/user/login", { replace: true });
    return;
  }
  setNetworkLoader(true);
  const data = await deleteFromComment(commentId!, videoId!);
  setNetworkLoader(false);
  if (data.success) {
    toast!("Comment deleted");
    videoDispatch!({
      type: "DELETE_COMMENT",
      payload: {
        commentId: commentId,
        videoId: videoId,
      },
    });
  }
}

type playlistOpenHandlerType = {
  videoId: string;
  authState: AuthInitialStateType;
  videoDispatch: Function;
  navigate: Function;
};
export const playlistOpenHandler = ({
  videoId,
  authState,
  videoDispatch,
  navigate,
}: playlistOpenHandlerType) => {
  if (authState.userId === "") {
    navigate("/user/login", { replace: true });
    return;
  }
  videoDispatch!({ type: "SHOW_PLAYLIST_MODAL" });
  videoDispatch!({
    type: "VIDEO_TO_BE_ADDED_TO_PLAYLIST",
    payload: videoId,
  });
};
