import React, { useRef, useState, useEffect } from "react";

const SelfieCamera = ({ settings = {buttonText: "Ciao"} }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" }
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play(); // 🔥 Forza la riproduzione se in griglia non parte
          };
        }
      } catch (error) {
        console.error("Errore nell'accesso alla fotocamera:", error);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const takePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      setPhoto(canvas.toDataURL("image/png"));
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "10px", width: "100%", height: "100%" }}>
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        style={{ width: "100%", maxWidth: "100%", borderRadius: "10px", height: "100%" }} 
      />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <button 
        onClick={takePhoto} 
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "none",
          background: "#1976d2",
          color: "white",
          cursor: "pointer"
        }}>
        {/*📸 Scatta Foto */}
        {settings.buttonText}
      </button>
      {photo && (
        <div style={{ marginTop: "10px" }}>
          <h3>📷 Anteprima Foto</h3>
          <img src={photo} alt="Scatto" style={{ width: "100%", maxWidth: "100%", borderRadius: "10px" }} />
        </div>
      )}
    </div>
  );
};

export default SelfieCamera;
