import React, { useState } from "react";

const DraggableQRCode = ({ qrCodeUrl, onPositionChange }) => {
  const [position, setPosition] = useState({ x: 50, y: 50 }); // Initial position

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", "dragging");
  };

  const handleDragEnd = (e) => {
    const newX = e.clientX - 50; // Adjust based on cursor position
    const newY = e.clientY - 50;
    setPosition({ x: newX, y: newY });
    onPositionChange({ x: newX, y: newY }); // Pass the new position to the parent
  };

  return (
    <img
      src={qrCodeUrl}
      alt="Draggable QR Code"
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: "100px",
        height: "100px",
        cursor: "grab",
      }}
    />
  );
};

export default DraggableQRCode;
