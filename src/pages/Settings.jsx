// src/pages/Settings.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleAutoplay, setDisplayMode } from "../redux/settingsSlice";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const dispatch = useDispatch();
  const { autoplay, displayMode } = useSelector((state) => state.settings);
  const navigate = useNavigate();

  return (
    <div>
      <h2>Impostazioni</h2>
      <label>
        <input
          type="checkbox"
          checked={autoplay}
          onChange={() => dispatch(toggleAutoplay())}
        />
        Autoplay Galleria
      </label>
      <div>
        <button onClick={() => dispatch(setDisplayMode("grid"))} disabled={displayMode === "grid"}>
          Modalità Griglia
        </button>
        <button onClick={() => dispatch(setDisplayMode("carousel"))} disabled={displayMode === "carousel"}>
          Modalità Slideshow
        </button>
      </div>
      <button onClick={() => navigate("/")}>Torna alla Home</button>
    </div>
  );
};

export default Settings;
