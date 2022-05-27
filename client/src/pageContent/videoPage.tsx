import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import VideoCard from "../components/videoCard/videoCard";
import { useAuth } from "../context/authContext";
import { useVideo } from "../context/videoContext";
import { increaseViewCount } from "../utils/networkCall/videoCalls";
import { videoType } from "../utils/types";
import { addToHistoryHandler } from "../utils/videoCalls";

function VideoPage() {
  const { videoId } = useParams();
  const { videoState, videoDispatch } = useVideo();
  const { authState, authDispatch, setNetworkLoader } = useAuth();
  const navigate = useNavigate();

  const video: videoType = videoState.videos.find(
    (item: videoType) => item.videoId === videoId
  )!;

  async function addVideoToHistory() {
    addToHistoryHandler({
      videoId: video!._id,
      authState,
      authDispatch,
      navigate,
      videoState,
      setNetworkLoader,
    });
    videoDispatch({ type: "VIEW_INCREASE", payload: videoId! });
    await increaseViewCount(videoId!);
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
