import React from "react";
import ReactDOM from "react-dom/client";
import Main from "./Router"; // this is the router you showed earlier
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Main /> {/* This mounts your routes */}
  </React.StrictMode>
);