import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { VideoProvider } from "./context/videoContext";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <VideoProvider>
          <App />
        </VideoProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
