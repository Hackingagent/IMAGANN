import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

// Define a set of colors for the bounding boxes
const colors = ['red', 'blue', 'green', 'orange', 'yellow'];

const AnnotationCanvas = ({ image, labels, annotations, onAddAnnotation, onDeleteAnnotation, setImage }) => {
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startCoords, setStartCoords] = useState(null);
  const [currentBox, setCurrentBox] = useState(null); // Current box being drawn
  const canvasRef = useRef(null);

  // Load the image
  useEffect(() => {
    const img = new Image();
    img.src = image;
  }, [image]);

  const handleMouseDown = (e) => {
    if (!selectedLabel) return; // Prevent drawing if no label is selected

    e.preventDefault();

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    setStartCoords({ x, y });
    setCurrentBox({ x, y, width: 0, height: 0 }); // Initialize current box
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || !startCoords) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    // Update dimensions of the current bounding box
    setCurrentBox({
      x: Math.min(startCoords.x, currentX),
      y: Math.min(startCoords.y, currentY),
      width: Math.abs(startCoords.x - currentX),
      height: Math.abs(startCoords.y - currentY),
    });
  };

  const handleMouseUp = (e) => {
    if (!isDrawing || !startCoords) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const endCoords = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    // Create bounding box directly from mouse coordinates
    const newBox = {
      label: selectedLabel,
      x: Math.min(startCoords.x, endCoords.x),
      y: Math.min(startCoords.y, endCoords.y),
      width: Math.abs(startCoords.x - endCoords.x),
      height: Math.abs(startCoords.y - endCoords.y),
      color: colors[Math.floor(Math.random() * colors.length)], // Assign a color randomly
    };

    onAddAnnotation(newBox); // Create a new bounding box
    setIsDrawing(false);
    setStartCoords(null);
    setCurrentBox(null); // Reset current box
  };

  const handleLabelChange = (e) => {
    setSelectedLabel(e.target.value);
  };

  const handleDelete = (index) => {
    onDeleteAnnotation(index);
  };

  // Drag and drop handlers
  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const validImages = files.filter(file => file.type.startsWith('image/'));

    if (validImages.length) {
      const imgURL = URL.createObjectURL(validImages[0]); // Use the first valid image
      setImage(imgURL); // Update the image state
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Prevent default to allow drop
  };

  const handleSaveImage = async () => {
  const projectId = localStorage.getItem('projectId'); // Get the project ID from local storage
  if (!projectId) {
    console.error('Project ID is null');
    return;
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();
  img.src = image;

  // Wait for the image to load
  await new Promise((resolve) => {
    img.onload = resolve;
  });

  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  annotations.forEach((annotation) => {
    ctx.beginPath();
    ctx.strokeStyle = annotation.color;
    ctx.lineWidth = 2;
    ctx.rect(annotation.x, annotation.y, annotation.width, annotation.height);
    ctx.stroke();

    ctx.font = '14px Arial';
    ctx.fillStyle = annotation.color;
    ctx.fillText(annotation.label, annotation.x, annotation.y - 4);
  });

  canvas.toBlob((blob) => {
    const formData = new FormData();
    formData.append('image', blob);
    formData.append('projectId', projectId);

    axios.post(`http://localhost:8000/api/projects/images`, formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  });
};

  return (
    <div>
      <select onChange={handleLabelChange}>
        <option value="">Select a label</option>
        {labels.map((label, index) => (
          <option key={index} value={label}>{label}</option>
        ))}
      </select>

      <div
        className="annotation-canvas"
        ref={canvasRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '500px',
          border: '1px solid #ccc',
          cursor: 'crosshair',
          overflow: 'hidden',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {image && (
          <img
            src={image}
            alt="Uploaded"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              display: 'block',
              margin: 'auto',
              border: 'none',
              position: 'absolute',
              zIndex: 1,
            }}
            onDragStart={(e) => e.preventDefault()} // Prevent image dragging
          />
        )}

        {annotations.map((box, index) => (
          <div
            key={index}
            className="annotation-box"
            style={{
              position: 'absolute',
              border: `2px solid ${box.color}`, // Use the assigned color
              left: box.x,
              top: box.y,
              width: box.width,
              height: box.height,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              padding: '2px',
              boxSizing: 'border-box',
              zIndex: 2,
            }}
          >
            <span style={{ color: 'red', zIndex: 1 }}>{box.label}</span>
            <button 
              onClick={() => handleDelete(index)} 
              style={{ 
                background: 'transparent', 
                border: 'none', 
                color: 'red', 
                cursor: 'pointer',
                fontSize: '16px',
                zIndex: 1,
              }}
            >
              X
            </button>
          </div>
        ))}

        {/* Draw the current bounding box while drawing */}
        {currentBox && (
          <div
            style={{
              position: 'absolute',
              border: '2px dashed blue', // Different style for current box
              left: currentBox.x,
              top: currentBox.y,
              width: currentBox.width,
              height: currentBox.height,
              zIndex: 2,
            }}
          />
        )}
      </div>
      <button onClick={handleSaveImage}>Save Image</button>
    </div>
  );
};

export default AnnotationCanvas;