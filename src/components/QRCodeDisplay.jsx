// src/components/QRCodeDisplay.js
import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';  // Usa QRCodeCanvas invece di QRCode

const QRCodeDisplay = () => {
  // L'URL del QR Code (per esempio, un URL per accettare la privacy)
  const privacyURL = "https://example.com/privacy";  // Puoi sostituirlo con l'URL desiderato
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <QRCodeCanvas value={privacyURL} size={256} level="H" includeMargin={true} />
      {/* 'value' è l'URL che vuoi codificare nel QR Code */}
    </div>
  );
};

export default QRCodeDisplay;
