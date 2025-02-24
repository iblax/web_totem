// src/components/PhotoGallery.js
import React from 'react';
import { useSelector } from 'react-redux';

const PhotoGallery = () => {
  const photos = useSelector((state) => state.photos.photos); // Ottieni le foto dallo stato Redux

  return (
    <div>
      <h2>Galleria Foto</h2>
      <div>
        {photos.length === 0 ? (
          <p>No photos available</p>
        ) : (
          photos.map((photo, index) => (
            <img key={index} src={photo} alt={`Foto ${index}`} width="100" />
          ))
        )}
      </div>
    </div>
  );
};

export default PhotoGallery;
