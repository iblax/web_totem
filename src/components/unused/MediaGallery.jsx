// src/components/MediaGallery.js
import React from "react";
import { useSelector } from "react-redux";
import "./MediaGallery.css"; // Stile della galleria

const MediaGallery = () => {
  const selfies = useSelector((state) => state.selfie.selfies);
  const { autoplay, displayMode } = useSelector((state) => state.settings);

  return (
    <div className={`gallery ${displayMode}`}>
      {selfies.length > 0 ? (
        selfies.map((photo, index) => (
          <div key={index} className="media-item">
            <img src={photo} alt={`Selfie ${index}`} />
          </div>
        ))
      ) : (
        <p>Nessuna immagine disponibile.</p>
      )}
    </div>
  );
};

export default MediaGallery;
