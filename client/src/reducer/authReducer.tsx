import { ActionType, AuthInitialStateType } from "../utils/types";

export const authInitialState: AuthInitialStateType = {
  userId: "",
  userName: "",
  playlists: [],
  likedVideos: [],
  watchLater: [],
  history: [],
};

export function authReducer(
  state: AuthInitialStateType,
  action: ActionType
): AuthInitialStateType {
  switch (action.type) {
    case "CREATE_SESSION": {
      localStorage.setItem(
        "session",
        JSON.stringify({ userId: action.payload._id })
      );
      return {
        ...state,
        userId: action.payload._id,
        userName: action.payload.name,
        playlists: action.payload.playlists,
        likedVideos: action.payload.likedVideos,
        watchLater: action.payload.watchLater,
        history: action.payload.history,
      };
    }

    case "START_SESSION": {
      return {
        ...state,
        userId: action.payload._id,
        userName: action.payload.name,
        playlists: action.payload.playlists,
        likedVideos: action.payload.likedVideos,
        watchLater: action.payload.watchLater,
        history: action.payload.history,
      };
    }

    case "END_SESSION": {
      localStorage.setItem("session", JSON.stringify({ userId: null }));
      return {
        ...state,
        userId: "",
        userName: "",
        playlists: [],
        likedVideos: [],
        watchLater: [],
        history: [],
      };
    }

    case "ADD_TO_WATCH_LATER":
      return { ...state, watchLater: [...state.watchLater, action.payload] };

    case "REMOVE_FROM_WATCH_LATER":
      return {
        ...state,
        watchLater: state.watchLater.filter(
          (video) => video._id !== action.payload._id
        ),
      };

    case "ADD_TO_LIKED_VIDEOS":
      return { ...state, likedVideos: [...state.likedVideos, action.payload] };

    case "REMOVE_FROM_LIKED_VIDEOS":
      return {
        ...state,
        likedVideos: state.likedVideos.filter(
          (video) => video._id !== action.payload._id
        ),
      };

    case "ADD_TO_HISTORY":
      return { ...state, history: [...state.history, action.payload] };

    case "REMOVE_FROM_HISTORY":
      return {
        ...state,
        history: state.history.filter(
          (video) => video._id !== action.payload._id
        ),
      };

    case "CLEAR_HISTORY":
      return { ...state, history: [] };

    case "CREATE_PLAYLIST":
      return { ...state, playlists: [...state.playlists, action.payload] };

    case "REMOVE_PLAYLIST":
      return {
        ...state,
        playlists: state.playlists.filter(
          (playlist) => playlist._id !== action.payload._id
        ),
      };

    case "ADD_TO_PLAYLIST":
      const playlist = state.playlists.map((playlist) => {
        if (playlist._id === action.payload.playlist._id) {
          if (
            playlist.playlistVideos.find(
              (video) => video._id === action.payload.video._id
            ) === undefined
          ) {
            playlist.playlistVideos = [
              ...playlist.playlistVideos,
              action.payload.video,
            ];
          }
        }
        return playlist;
      });
      return { ...state, playlists: playlist };

    case "REMOVE_FROM_PLAYLIST":
      const updatedPlaylist = state.playlists.map((playlist) => {
        if (playlist._id === action.payload.playlist._id) {
          playlist.playlistVideos = playlist.playlistVideos.filter(
            (pl) => pl._id !== action.payload.video._id
          );
        }
        return playlist;
      });
      return { ...state, playlists: updatedPlaylist };

    default:
      return state;
  }
}
