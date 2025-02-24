import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SelfiePage = () => {
  const webcamRef = useRef(null);  // ✅ useRef definito correttamente
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Webcam Ref:', webcamRef.current); // 🔍 Debug: Controlla se webcamRef è null
  }, []);

  const capture = async () => {
    if (!webcamRef.current) {
      console.error('webcamRef è null!'); // 🔍 Debug
      return;
    }

    const imageSrc = webcamRef.current.getScreenshot();
    setPhoto(imageSrc);

    try {
      const formData = new FormData();
      formData.append('photo', dataURItoBlob(imageSrc));

      await axios.post('http://localhost:3000/api/upload', formData);
      alert('Foto salvata!');
      navigate('/gallery');
    } catch (error) {
      console.error('Errore nel caricamento:', error);
    }
  };

  const dataURItoBlob = (dataURI) => {
    let byteString = atob(dataURI.split(',')[1]);
    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  return (
    <div>

      <Webcam ref={webcamRef} screenshotFormat="image/png" />
      <button onClick={capture}>Scatta Foto</button>
      {photo && <img src={photo} alt="Selfie" />}
    </div>
  );
};

export default SelfiePage;
