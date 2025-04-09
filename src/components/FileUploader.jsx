import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const FileUploader = ({ onFileUploaded }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file.type === "application/pdf") {
        const fileUrl = URL.createObjectURL(file);
        onFileUploaded(file, fileUrl); // Pass the file and its URL to the parent
      } else {
        alert("Please upload a valid PDF file.");
      }
    },
    [onFileUploaded]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed #ccc",
        padding: "20px",
        textAlign: "center",
        cursor: "pointer",
      }}
    >
      <input {...getInputProps()} />
      <p>Drag and drop a PDF file here, or click to select one</p>
    </div>
  );
};

export default FileUploader;
