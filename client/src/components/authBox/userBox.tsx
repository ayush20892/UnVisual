import React, { useState, useEffect } from "react";
import "./userBox.css";
import { Link, useNavigate } from "react-router-dom";
import { AiFillLike } from "react-icons/ai";
import { RiHistoryFill } from "react-icons/ri";
import { useAuth } from "../../context/authContext";
import { logout, userDashboard } from "../../utils/networkCall/userCalls";
import Loader from "../loader/loader";
import { userType } from "../../utils/types";

export function UserBox() {
  const [user, setUser] = useState<userType>();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const { authDispatch, networkLoader, setNetworkLoader } = useAuth();

  useEffect(() => {
    (async () => {
      const data = await userDashboard();
      if (data!.success) {
        setUser(data!.user);
        setLoader(false);
      }
      if (!data!.success) logoutHandler();
    })();
  }, []);

  async function logoutHandler() {
    setNetworkLoader(true);
    await logout();
    setNetworkLoader(false);
    authDispatch({ type: "END_SESSION" });
    navigate("/", { replace: true });
  }

  return (
    <div className="user-container">
      {networkLoader && (
        <div className="network-loader">
          <Loader />
        </div>
      )}
      <>
        {loader ? (
          <div className="loader-inside">
            <Loader />
          </div>
        ) : (
          <div className="user-box">
            <h1>User Info</h1>
            <h4>
              Name: {user?.name}
              <span>
                <Link
                  style={{ textDecoration: "none" }}
                  to="/user/update/name"
                >
                  Update
                </Link>
              </span>{" "}
            </h4>
            <h4>
              Email: {user?.email}
              <span>
                <Link
                  style={{ textDecoration: "none" }}
                  to="/user/update/email"
                >
                  Update
                </Link>
              </span>
            </h4>
            <div className="user-video-pages">
              <Link to="/likedVideos">
                <AiFillLike className="sidebar-icon" />
                <div className="sidebar-icon-name">Liked</div>
              </Link>
            </div>
            <div className="user-video-pages">
              <Link to="/history">
                <RiHistoryFill className="sidebar-icon" />
                <div className="sidebar-icon-name">History</div>
              </Link>
            </div>

            <div className="update-pwd-btn">
              <button>
                <Link
                  style={{ textDecoration: "none" }}
                  to="/user/update/passwordUpdate"
                >
                  Update Password
                </Link>
              </button>
            </div>
            <div className="btn">
              <button onClick={logoutHandler}>Logout</button>
            </div>
          </div>
        )}
      </>
    </div>
  );
}
