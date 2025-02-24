// src/components/Camera.js
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addPhoto } from '../../redux/photoSlice';

const Camera = ({ onPhotoTaken }) => {
  const dispatch = useDispatch();
  const webcamRef = useRef(null);
  const [photo, setPhoto] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPhoto(imageSrc);
    onPhotoTaken(imageSrc);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("photo", photo);
      
      const response = await axios.post("http://localhost:3000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Foto caricata: ", response.data);
      dispatch(addPhoto(response.data.photoURL)); // Aggiungi la foto in Redux
    } catch (error) {
      console.error("Errore nel caricamento della foto", error);
    }
  };

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width="100%"
      />
      <button onClick={capture}>Scatta Foto</button>
      {photo && <img src={photo} alt="Foto scattata" />}
      {photo && <button onClick={handleUpload}>Carica Foto</button>}
    </div>
  );
};

export default Camera;
