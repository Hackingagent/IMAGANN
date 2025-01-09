import React, { useState } from 'react';
import ProjectForm from './ProjectForm';
import LabelForm from './LabelForm';
import ImageUploader from './ImageUploader';
import AnnotationCanvas from './AnnotationCanvas';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ProjectImages from './ProjectImages';

const AnnotationPlatform = ({ projectId }) => {
  const [labels, setLabels] = useState([]);
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [annotations, setAnnotations] = useState([]); // Array for annotations
  const location = useLocation();
  const successMessage = location.state?.successMessage;

  const handleImageUpload = (imageData) => {
    setImages(prevImages => [...prevImages, imageData]);
    setAnnotations(prevAnnotations => [...prevAnnotations, []]); // Initialize annotations for the new image
  };

  const handleAddAnnotation = (annotation) => {
    setAnnotations(prevAnnotations => {
      const newAnnotations = [...prevAnnotations];
      newAnnotations[currentImageIndex] = [...newAnnotations[currentImageIndex], annotation];
      return newAnnotations;
    });
  };

  const handleDeleteAnnotation = (index) => {
    setAnnotations(prevAnnotations => {
      const newAnnotations = [...prevAnnotations];
      newAnnotations[currentImageIndex] = newAnnotations[currentImageIndex].filter((_, i) => i !== index);
      return newAnnotations;
    });
  };

  const handleEditAnnotation = (index, updatedBox) => {
    setAnnotations(prevAnnotations => {
      const newAnnotations = [...prevAnnotations];
      newAnnotations[currentImageIndex][index] = updatedBox; // Update the specific annotation
      return newAnnotations;
    });
  };

  const handleNextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const exportToPascalVOC = (annotations, imageName) => {
    const xmlHeader = `<?xml version="1.0"?>
<annotation>
    <folder>images</folder>
    <filename>${imageName}</filename>
    <path>images/${imageName}</path>
    <source>
        <database>Unknown</database>
    </source>
    <size>
        <width>WIDTH</width>
        <height>HEIGHT</height>
        <depth>3</depth>
    </size>
    <segmented>0</segmented>`;

    const xmlBody = annotations.map(box => `
    <object>
        <name>${box.label}</name>
        <pose>Unspecified</pose>
        <truncated>0</truncated>
        <difficult>0</difficult>
        <bndbox>
            <xmin>${box.x}</xmin>
            <ymin>${box.y}</ymin>
            <xmax>${box.x + box.width}</xmax>
            <ymax>${box.y + box.height}</ymax>
        </bndbox>
    </object>`).join('');

    const xmlFooter = `
</annotation>`;

    const xmlContent = xmlHeader + xmlBody + xmlFooter;
    return new Blob([xmlContent], { type: 'text/xml' });
  };

  const exportToCOCO = (annotations, imageName, imageWidth, imageHeight) => {
    const cocoFormat = {
      images: [{
        id: 1,
        width: imageWidth,
        height: imageHeight,
        file_name: imageName,
      }],
      annotations: annotations.map((box, index) => ({
        id: index + 1,
        image_id: 1,
        category_id: 1, // You can map labels to category IDs if needed
        bbox: [box.x, box.y, box.width, box.height],
        area: box.width * box.height,
        iscrowd: 0,
      })),
      categories: [
        { id: 1, name: 'Your Label Here' } // Adjust according to your labels
      ]
    };

    return new Blob([JSON.stringify(cocoFormat)], { type: 'application/json' });
  };

  const handleExportPascalVOC = () => {
    const annotationsToExport = annotations[currentImageIndex] || [];
    const imageName = images[currentImageIndex].split('/').pop(); // Extracting image file name
    const blob = exportToPascalVOC(annotationsToExport, imageName);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${imageName.split('.')[0]}.xml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleExportCOCO = () => {
    const annotationsToExport = annotations[currentImageIndex] || [];
    const imageName = images[currentImageIndex].split('/').pop(); // Extracting image file name
    const imageWidth = 640; // Replace with actual image width
    const imageHeight = 480; // Replace with actual image height
    const blob = exportToCOCO(annotationsToExport, imageName, imageWidth, imageHeight);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${imageName.split('.')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleSaveImage = async () => {
    const imageData = images[currentImageIndex];
    const projectId = localStorage.getItem('projectId'); // Get the project ID from local storage
    const formData = new FormData();
    formData.append('image', imageData);

    if (!projectId) {
      console.error('Project ID is null');
      return;
    }
    try {
      const response = await axios.post(`http://localhost:8000/api/projects/${projectId}/images`, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      {/* <h1>Image Annotation Platform</h1> */}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <LabelForm setLabels={setLabels} />
      <ImageUploader onImageUpload={handleImageUpload} />
      {images.length > 0 && (
        <AnnotationCanvas 
          image={images[currentImageIndex]} 
          labels={labels} 
          annotations={annotations[currentImageIndex] || []} // Pass only current image annotations
          onAddAnnotation={handleAddAnnotation} 
          onDeleteAnnotation={handleDeleteAnnotation}
          onEditAnnotation={handleEditAnnotation}
        />
      )}
      <div className="button-container">
        <button onClick={handlePreviousImage} disabled={currentImageIndex === 0}>
          &#9664; {/* Left arrow (Previous) */}
        </button>
        <button onClick={handleNextImage} disabled={currentImageIndex === images.length - 1}>
          &#9654; {/* Right arrow (Next) */}
        </button>
        <button onClick={handleSaveImage}>Save Image</button>
        <button onClick={handleExportPascalVOC}>Export to Pascal VOC</button>
        <button onClick={handleExportCOCO}>Export to COCO</button>
      </div>

      <ProjectImages projectId={projectId}/>
    </div>
  );

};

export default AnnotationPlatform;