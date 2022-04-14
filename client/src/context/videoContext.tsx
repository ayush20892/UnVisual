import { createContext, useContext, useReducer } from "react";
import { videoReducer, videoInitialState } from "../reducer/videoReducer";
import { Children, VideoContextType } from "../utils/types";

export const VideoContext = createContext<VideoContextType>(
  {} as VideoContextType
);

export const VideoProvider = ({ children }: Children) => {
  const [videoState, videoDispatch] = useReducer(
    videoReducer,
    videoInitialState
  );

  return (
    <VideoContext.Provider
      value={{
        videoState,
        videoDispatch,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => {
  return useContext(VideoContext);
};
