// src/components/QrScanner.js
import React, { useState, useRef, useEffect } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';  // Importa la libreria per il QR scanning

const QrScanner = ({ onScanSuccess }) => {
  const videoRef = useRef(null);
  const [scanning, setScanning] = useState(true);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [error, setError] = useState(null);

  const codeReader = new BrowserMultiFormatReader();

  useEffect(() => {
    // Avvia la scansione quando il componente è montato
    if (scanning && !privacyAccepted) {
      codeReader
        .decodeFromVideoDevice(null, videoRef.current, (result, err) => {
          if (result) {
            if (result.getText().includes("privacy")) {
              setPrivacyAccepted(true);
              onScanSuccess(result.getText());
            }
          }
          if (err) {
            setError(err);
            console.error('Errore nella scansione:', err);
          }
        })
        .catch((err) => {
          setError(err);
          console.error('Errore nella lettura del QR code:', err);
        });
    }
    // Cleanup quando il componente viene smontato
    return () => {
      codeReader.reset();
    };
  }, [scanning, privacyAccepted, codeReader, onScanSuccess]);

  return (
    <div>
      {scanning && !privacyAccepted ? (
        <div>
          <video ref={videoRef} style={{ width: '100%' }} />
          {error && <p>Errore: {error.message}</p>}
        </div>
      ) : (
        <div>
          {privacyAccepted ? (
            <p>Privacy accettata. Dispositivo registrato!</p>
          ) : (
            <p>Scansiona il QR Code per accettare la privacy.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default QrScanner;
