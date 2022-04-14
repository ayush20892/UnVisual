import React from "react";
import { category } from "../../utils/categoryList";
import { useVideo } from "../../context/videoContext";
import "./categoryRow.css";

function CategoryRow() {
  const { videoState, videoDispatch } = useVideo();
  return (
    <div className="category-row">
      {category.map((categoryName) => {
        return (
          <div
            className="category-badge"
            style={
              videoState.category === categoryName
                ? { backgroundColor: "#fff", color: "#121212" }
                : {}
            }
            key={categoryName}
            onClick={() =>
              videoDispatch({ type: "CHANGE_CATEGORY", payload: categoryName })
            }
          >
            {categoryName}
          </div>
        );
      })}
    </div>
  );
}

export default CategoryRow;
