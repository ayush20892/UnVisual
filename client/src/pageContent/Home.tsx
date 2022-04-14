import React from "react";
import VerticalVideoDisplay from "../components/verticalVideoDisplay/verticalVideoDisplay";
import CategoryRow from "../components/categoryRow/categoryRow";
import { useVideo } from "../context/videoContext";
import { categoryFilter, searchFilter } from "../utils/userUtils";

function Home() {
  const { videoState } = useVideo();

  const categoryVideos = categoryFilter(videoState.videos, videoState.category);
  const videos = searchFilter(categoryVideos, videoState.searchInput);

  return (
    <div>
      <CategoryRow />
      <VerticalVideoDisplay videos={videos} pageType="Watch Later" />
    </div>
  );
}

export default Home;
