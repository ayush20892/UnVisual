import { VideoActionType, VideoInitialStateType } from "../utils/types";

export function videoReducer(
  state: VideoInitialStateType,
  action: VideoActionType
): VideoInitialStateType {
  switch (action.type) {
    case "LOAD_VIDEOS":
      return { ...state, videos: action.payload };

    case "ADD_COMMENT":
      const updatedVideos = state.videos.map((video) => {
        if (video._id === action.payload.video._id) {
          video.comments.push({
            _id: action.payload.comment._id,
            comment: action.payload.comment.comment,
            user: action.payload.comment.user,
          });
        }
        return video;
      });
      return { ...state, videos: updatedVideos };

    case "DELETE_COMMENT":
      const videos = state.videos.map((video) => {
        if (video._id === action.payload.videoId) {
          video.comments = video.comments.filter(
            (comment) => comment._id !== action.payload.commentId
          );
        }
        return video;
      });
      return { ...state, videos: videos };

    case "VIDEO_TO_BE_ADDED_TO_PLAYLIST":
      return { ...state, videoToBeAddedToPlaylist: action.payload };

    case "SHOW_PLAYLIST_MODAL":
      return { ...state, showAddToPlaylistModal: true };

    case "HIDE_PLAYLIST_MODAL":
      return { ...state, showAddToPlaylistModal: false };

    case "TOGGLE_CREATE_PLAYLIST":
      return {
        ...state,
        showCreatePlaylistInput: !state.showCreatePlaylistInput,
      };

    case "SHOW_CREATE_PLAYLIST":
      return { ...state, showCreatePlaylistInput: true };

    case "HIDE_CREATE_PLAYLIST":
      return { ...state, showCreatePlaylistInput: false };

    case "SEARCH_INPUT":
      return { ...state, searchInput: action.payload };

    case "CHANGE_CATEGORY":
      return { ...state, category: action.payload };

    case "LIKE":
      const newVideos = state.videos.map((vid) => {
        if (vid._id.toString() === action.payload.videoId) {
          if (action.payload.type === "INC") vid.likes = vid.likes + 1;
          else vid.likes = vid.likes - 1;
        }
        return vid;
      });
      return { ...state, videos: newVideos };

    default:
      return state;
  }
}

export const videoInitialState: VideoInitialStateType = {
  videos: [],
  showAddToPlaylistModal: false,
  videoToBeAddedToPlaylist: "",
  showCreatePlaylistInput: false,
  searchInput: "",
  category: "All",
};
