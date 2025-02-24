import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GalleryPage = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/photos')
      .then(response => setPhotos(response.data.photos))
      .catch(error => console.error('Errore nel caricamento delle foto:', error));
  }, []);

  return (
    <div>
      <h1>Galleria</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {photos.map((photo, index) => (
          <img key={index} src={photo} alt={`Selfie ${index}`} style={{ width: '200px', margin: '10px' }} />
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
