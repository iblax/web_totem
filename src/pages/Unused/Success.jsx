// src/pages/Success.js
import React from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Selfie salvato con successo!</h2>
      <button onClick={() => navigate("/")}>Torna alla Home</button>
    </div>
  );
};

export default Success;
