import React from "react";
import "./footer.css";
import { useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { RiPlayListAddFill } from "react-icons/ri";
import { MdWatchLater } from "react-icons/md";
import { HiUserCircle } from "react-icons/hi";

function Footer() {
  const navigate = useNavigate();
  return (
    <footer>
      <div onClick={() => navigate("/")} className="footer-pill">
        <AiFillHome className="footer-icon" />
        <div className="footer-icon-name">Home</div>
      </div>
      <div onClick={() => navigate("/playlist")} className="footer-pill">
        <RiPlayListAddFill className="footer-icon" />
        <div className="footer-icon-name">Playlist</div>
      </div>
      <div onClick={() => navigate("/watchLater")} className="footer-pill">
        <MdWatchLater className="footer-icon" />
        <div className="footer-icon-name">Watch Later</div>
      </div>
      <div onClick={() => navigate("/user")} className="footer-pill">
        <HiUserCircle className="footer-icon" />
        <div className="footer-icon-name">My Account</div>
      </div>
    </footer>
  );
}

export default Footer;
