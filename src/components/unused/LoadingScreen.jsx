import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useNavigate } from 'react-router-dom';

const QRCodeDisplay = ({ onAcceptPrivacy }) => {
  const navigate = useNavigate();

  const handleAccept = () => {
    onAcceptPrivacy();
    navigate('/selfie'); // Dopo l'accettazione, passa alla fotocamera
  };

  return (
    <div>
      <h2>Scansiona il QR Code per accettare la privacy</h2>
      <QRCodeSVG value="https://example.com/privacy" size={200} />
      <p>Una volta accettata, potrai scattare il tuo selfie.</p>
      <button onClick={handleAccept}>Ho accettato</button>
    </div>
  );
};

export default QRCodeDisplay;