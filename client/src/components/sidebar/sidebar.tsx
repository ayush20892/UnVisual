import React from "react";
import "./sidebar.css";
import { useLocation, useNavigate } from "react-router-dom";
import { AiFillHome, AiFillLike } from "react-icons/ai";
import { RiPlayListAddFill } from "react-icons/ri";
import { MdWatchLater } from "react-icons/md";
import { RiHistoryFill } from "react-icons/ri";

function Sidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function activeIcon(path: string) {
    if (path === pathname) return { backgroundColor: "#ffffff33" };
    return;
  }

  return (
    <ul className="sidebar">
      <li
        onClick={() => navigate("/")}
        className="sidebar-pill"
        style={activeIcon("/")}
      >
        <AiFillHome className="sidebar-icon" />
        <div className="sidebar-icon-name">Home</div>
      </li>
      <li
        onClick={() => navigate("/playlist")}
        className="sidebar-pill"
        style={activeIcon("/playlist")}
      >
        <RiPlayListAddFill className="sidebar-icon" />
        <div className="sidebar-icon-name">Playlist</div>
      </li>
      <li
        onClick={() => navigate("/likedVideos")}
        className="sidebar-pill"
        style={activeIcon("/likedVideos")}
      >
        <AiFillLike className="sidebar-icon" />
        <div className="sidebar-icon-name">Liked</div>
      </li>
      <li
        onClick={() => navigate("/watchLater")}
        className="sidebar-pill"
        style={activeIcon("/watchLater")}
      >
        <MdWatchLater className="sidebar-icon" />
        <div className="sidebar-icon-name">Watch Later</div>
      </li>
      <li
        onClick={() => navigate("/history")}
        className="sidebar-pill"
        style={activeIcon("/history")}
      >
        <RiHistoryFill className="sidebar-icon" />
        <div className="sidebar-icon-name">History</div>
      </li>
    </ul>
  );
}

export default Sidebar;
