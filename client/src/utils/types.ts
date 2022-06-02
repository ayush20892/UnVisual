import { IconType } from "react-icons";

export type commentType = {
  _id?: string;
  user: userType;
  comment: string;
};

export type videoType = {
  _id: string;
  title: string;
  creator: string;
  videoId: string;
  image: string;
  duration: string;
  views: string;
  likes: number;
  category: string;
  comments: commentType[];
};

export type playlistType = {
  _id: string;
  playlistName: string;
  playlistVideos: videoType[];
};

export type userType = {
  _id: string;
  name: string;
  email: string;
  role: string;
  likedVideos: videoType[];
  watchLater: videoType[];
  history: videoType[];
  playlists: playlistType[];
};

export type AuthInitialStateType = {
  userId: string | null;
  userName: string;
  email: string;
  playlists: playlistType[];
  likedVideos: videoType[];
  watchLater: videoType[];
  history: videoType[];
};

type addRemovePlaylistType = {
  playlist: playlistType;
  video: videoType;
};
export type ActionType =
  | { type: "CREATE_SESSION"; payload: userType }
  | { type: "START_SESSION"; payload: userType }
  | { type: "END_SESSION" }
  | { type: "ADD_TO_WATCH_LATER"; payload: videoType }
  | { type: "REMOVE_FROM_WATCH_LATER"; payload: videoType }
  | { type: "ADD_TO_LIKED_VIDEOS"; payload: videoType }
  | { type: "REMOVE_FROM_LIKED_VIDEOS"; payload: videoType }
  | { type: "ADD_TO_HISTORY"; payload: videoType }
  | { type: "REMOVE_FROM_HISTORY"; payload: videoType }
  | { type: "CLEAR_HISTORY" }
  | { type: "CREATE_PLAYLIST"; payload: playlistType }
  | { type: "REMOVE_PLAYLIST"; payload: playlistType }
  | { type: "ADD_TO_PLAYLIST"; payload: addRemovePlaylistType }
  | { type: "REMOVE_FROM_PLAYLIST"; payload: addRemovePlaylistType }
  | { type: "UPDATE_NAME"; payload: string }
  | { type: "UPDATE_EMAIL"; payload: string };

export type AuthContextType = {
  authState: AuthInitialStateType;
  authDispatch: (action: ActionType) => void;
  networkLoader: Boolean;
  setNetworkLoader: Function;
};

export type Children = { children: React.ReactElement };

export type VideoInitialStateType = {
  videos: videoType[];
  showAddToPlaylistModal: boolean;
  videoToBeAddedToPlaylist: string;
  showCreatePlaylistInput: boolean;
  searchInput: string;
  category: string;
};

type commentAddType = {
  comment: commentType;
  video: videoType;
};
type commentDeleteType = {
  commentId: string;
  videoId: string;
};
export type VideoActionType =
  | { type: "LOAD_VIDEOS"; payload: videoType[] }
  | { type: "ADD_COMMENT"; payload: commentAddType }
  | { type: "DELETE_COMMENT"; payload: commentDeleteType }
  | { type: "VIDEO_TO_BE_ADDED_TO_PLAYLIST"; payload: string }
  | { type: "SHOW_PLAYLIST_MODAL" }
  | { type: "HIDE_PLAYLIST_MODAL" }
  | { type: "TOGGLE_CREATE_PLAYLIST" }
  | { type: "SHOW_CREATE_PLAYLIST" }
  | { type: "HIDE_CREATE_PLAYLIST" }
  | { type: "SEARCH_INPUT"; payload: string }
  | { type: "CHANGE_CATEGORY"; payload: string }
  | { type: "LIKE"; payload: { videoId: string; type: string } }
  | { type: "VIEW_INCREASE"; payload: string };

export type VideoContextType = {
  videoState: VideoInitialStateType;
  videoDispatch: (action: VideoActionType) => void;
};

export type ActionMenuItemType = {
  icon: IconType;
  name?: string;
  action: string;
  actionFunction: Function;
  alterAction?: string;
  alterActionFunction?: Function;
};
