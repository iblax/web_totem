// src/pages/CameraPage.js
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CameraPage = () => {
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const hasConsented = useSelector((state) => state.consent.hasConsented);
  const [photo, setPhoto] = useState(null);

  if (!hasConsented) {
    return <p>Devi prima accettare la privacy.</p>;
  }

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPhoto(imageSrc);
  };

  return (
    <div>
      <h2>Scatta il tuo selfie</h2>
      <Webcam ref={webcamRef} screenshotFormat="image/png" />
      <button onClick={capture}>Scatta Selfie</button>
      {photo && <img src={photo} alt="Selfie" />}
      <button onClick={() => navigate("/success")}>Conferma</button>
    </div>
  );
};

export default CameraPage;
