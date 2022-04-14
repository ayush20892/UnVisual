import React, { useEffect, useState } from "react";
import "./header.css";
import { useLocation, useNavigate } from "react-router-dom";
import icon64 from "../../icon/Utility-UI-64.png";
import { AiOutlineSearch } from "react-icons/ai";
import { HiUserCircle } from "react-icons/hi";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsX } from "react-icons/bs";
import { useVideo } from "../../context/videoContext";
import { useAuth } from "../../context/authContext";

function Header({ utilHeader }: { utilHeader: boolean }) {
  const [search, setSearch] = useState("");
  const [searchCross, setSearchCross] = useState(false);
  const { authState } = useAuth();
  const { videoDispatch } = useVideo();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (search !== "") setSearchCross(true);
  }, [search]);

  return (
    <header>
      <div className="brand">
        {!utilHeader ? (
          <img src={icon64} alt="brand-logo" onClick={() => navigate("/")} />
        ) : (
          <div onClick={() => navigate(-1)}>
            <AiOutlineArrowLeft className="back-arrow" />
          </div>
        )}
        <div className="brand-name" onClick={() => navigate("/")}>
          UNVISUAL
        </div>
      </div>
      <div className="search-box">
        <div className="search-input">
          <input
            type="text"
            placeholder="SEARCH"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div
            className="search-cross"
            onClick={() => {
              videoDispatch({ type: "SEARCH_INPUT", payload: "" });
              setSearch("");
              setSearchCross(false);
            }}
          >
            {searchCross ? <BsX /> : <></>}
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            videoDispatch({ type: "SEARCH_INPUT", payload: search });
            if (pathname !== "/") {
              navigate("/", { replace: true });
              return;
            }
          }}
        >
          <AiOutlineSearch style={{ color: "#fff", fontSize: "20px" }} />
        </button>
      </div>
      <div onClick={() => navigate("/user")} className="user-profile">
        <h4>
          {authState.userId !== "" ? <>Hi, {authState.userName}</> : <>LOGIN</>}
        </h4>
        <HiUserCircle className="user-icon" />
      </div>
    </header>
  );
}

export default Header;
