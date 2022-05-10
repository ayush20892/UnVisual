import React, { useEffect, useState } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./pageContent/Home";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Sidebar from "./components/sidebar/sidebar";
import Loader from "./components/loader/loader";
import AddToPlaylistModal from "./components/addToPlaylistModal/addToPlaylistModal";
import History from "./pageContent/history";
import LikedVideos from "./pageContent/likedVideos";
import WatchLater from "./pageContent/watchLater";
import Playlist from "./pageContent/playlist";
import PlaylistSingle from "./pageContent/playlistSingle";
import User from "./pageContent/user";
import VideoPage from "./pageContent/videoPage";
import UpdateUser from "./pageContent/userUpdate";
import PrivateRoute from "./utils/privateRoute";
import loadInitialData from "./utils/loadInitialData";
import { utilHeader } from "./utils/userUtils";
import { useAuth } from "./context/authContext";
import { useVideo } from "./context/videoContext";
import { useMediaQuery } from "react-responsive";
import { ToastContainer } from "react-toastify";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { authDispatch, networkLoader } = useAuth();
  const { videoState, videoDispatch } = useVideo();
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    loadInitialData({
      videoDispatch,
      authDispatch,
      navigate,
      setIsLoading,
    });
  }, []);

  if (isLoading) {
    return (
      <>
        <Header utilHeader={utilHeader(isMobile, pathname)} />
        <div className="loader">
          <Loader />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      {networkLoader && (
        <div className="network-loader">
          <Loader />
        </div>
      )}
      {videoState.showAddToPlaylistModal && <AddToPlaylistModal />}
      <Header utilHeader={utilHeader(isMobile, pathname)} />
      <main>
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/video/:videoId" element={<VideoPage />} />

            <Route
              path="/playlist"
              element={
                <PrivateRoute>
                  <Playlist />
                </PrivateRoute>
              }
            />

            <Route
              path="/playlist/:playlistId"
              element={
                <PrivateRoute>
                  <PlaylistSingle />
                </PrivateRoute>
              }
            />

            <Route
              path="/watchLater"
              element={
                <PrivateRoute>
                  <WatchLater />
                </PrivateRoute>
              }
            />

            <Route
              path="/likedVideos"
              element={
                <PrivateRoute>
                  <LikedVideos />
                </PrivateRoute>
              }
            />

            <Route
              path="/history"
              element={
                <PrivateRoute>
                  <History />
                </PrivateRoute>
              }
            />

            <Route
              path="/user"
              element={
                <PrivateRoute>
                  <User />
                </PrivateRoute>
              }
            />

            <Route path="/user/:action" element={<User />} />
            <Route path="/user/update/:updateType" element={<UpdateUser />} />
          </Routes>
        </div>
      </main>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="dark"
      />
      <Footer />
    </>
  );
}

export default App;
