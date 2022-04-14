import React from "react";
import HorizontalVideoDisplay from "../components/horizontalVideoDisplay/horizontalVideoDisplay";
import { useAuth } from "../context/authContext";

function History() {
  const { authState } = useAuth();
  return (
    <div>
      <HorizontalVideoDisplay
        videos={[...authState.history].reverse()}
        pageType="History"
      />{" "}
    </div>
  );
}

export default History;
