import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import VideoCard from "../components/videoCard/videoCard";
import { useAuth } from "../context/authContext";
import { useVideo } from "../context/videoContext";
import { videoType } from "../utils/types";
import { addToHistoryHandler } from "../utils/videoCalls";

function VideoPage() {
  const { videoId } = useParams();
  const { videoState } = useVideo();
  const { authState, authDispatch, setNetworkLoader } = useAuth();
  const navigate = useNavigate();

  const video: videoType = videoState.videos.find(
    (item: videoType) => item.videoId === videoId
  )!;

  function addVideoToHistory() {
    const videoPresentInHistory: boolean | undefined =
      authState.history.find((vid) => vid.videoId === videoId) !== undefined;
    if (!videoPresentInHistory)
      addToHistoryHandler({
        videoId: video!._id,
        authState,
        authDispatch,
        navigate,
        videoState,
        setNetworkLoader,
      });
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    addVideoToHistory();
  }, []);

  return (
    <div>
      <VideoCard video={video!} />
    </div>
  );
}

export default VideoPage;
