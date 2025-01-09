// ProjectImages.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/ProjectImages.css'

const ProjectImages = ({ projectId }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const getProjectImages = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/projects/${projectId}/images`);
        setImages(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getProjectImages();
  }, [projectId]);

  const handleDeleteImage = async (imageId) => {
    try {
      await axios.delete(`http://localhost:8000/api/projects/${projectId}/images/${imageId}`);
      setImages(images.filter((image) => image.id !== imageId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewFullImage = (image) => {
    setSelectedImage(image);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Project Images</h2>
      <div className="image-gallery">
        {images.map((image) => (
          <div key={image.id} className="card">
            <img src={`http://localhost:8000/${image.image}`} alt={image.image} />
            <div className="card-actions">
              <button className='delete' onClick={() => handleDeleteImage(image.id)}>Delete</button>
              <button onClick={() => handleViewFullImage(image)}>View Full Image</button>
            </div>
          </div>
        ))}
      </div>
      {selectedImage && (
        <div className="full-image-modal">
          <img src={`http://localhost:8000/${selectedImage.image}`} alt={selectedImage.image} />
          <button onClick={() => setSelectedImage(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default ProjectImages;