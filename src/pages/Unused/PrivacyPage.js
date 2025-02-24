// src/components/PrivacyPage.js
import React from 'react';

const PrivacyPage = ({ onAccept }) => {
  return (
    <div>
      <h1>Privacy Policy</h1>
      <p>
        Per procedere con il selfie, devi accettare la nostra politica sulla privacy.
      </p>
      <button onClick={onAccept}>Accetta</button>
    </div>
  );
};

export default PrivacyPage;
