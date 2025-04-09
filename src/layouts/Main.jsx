import React, { useState } from "react";
import FileUploader from "../components/FileUploader";
import QRCodeGenerator from "../components/QRCodeGenerator";
import DraggableQRCode from "../components/DraggQRCode";
import { PDFDocument, rgb } from "pdf-lib";
import html2canvas from "html2canvas";

const App = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [qrPosition, setQrPosition] = useState({ x: 50, y: 50 });

  const handleFileUploaded = (file, fileUrl) => {
    setPdfFile(file);
    setPdfUrl(fileUrl);
  };

  const handleSavePDF = async () => {
    if (!pdfFile || !qrCodeUrl) {
      alert("Please upload a PDF and generate a QR code first.");
      return;
    }

    // Load the existing PDF
    const existingPdfBytes = await pdfFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Convert the QR code to an image
    const canvas = await html2canvas(document.querySelector("img"));
    const qrImage = canvas.toDataURL("image/png");
    const qrImageBytes = await fetch(qrImage).then((res) => res.arrayBuffer());

    // Embed the QR code into the PDF
    const qrImageEmbed = await pdfDoc.embedPng(qrImageBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Add the QR code at the specified position
    firstPage.drawImage(qrImageEmbed, {
      x: qrPosition.x,
      y: firstPage.getHeight() - qrPosition.y - 100, // Adjust for PDF coordinates
      width: 100,
      height: 100,
    });

    // Save the updated PDF
    const updatedPdfBytes = await pdfDoc.save();
    const blob = new Blob([updatedPdfBytes], { type: "application/pdf" });
    const updatedPdfUrl = URL.createObjectURL(blob);

    // Prompt the user to download the updated PDF
    const link = document.createElement("a");
    link.href = updatedPdfUrl;
    link.download = "updated-pdf-with-qrcode.pdf";
    link.click();
  };

  return (
    <div>
      <h1>Upload PDF and Add QR Code</h1>

      {/* File Uploader */}
      <FileUploader onFileUploaded={handleFileUploaded} />

      {/* Render Uploaded PDF */}
      {pdfUrl && (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "600px",
            overflow: "auto",
            border: "1px solid #ccc",
          }}
        >
          <iframe
            src={pdfUrl}
            title="Uploaded PDF"
            style={{ width: "100%", height: "100%" }}
          />
          {/* Draggable QR Code */}
          {qrCodeUrl && (
            <DraggableQRCode
              qrCodeUrl={qrCodeUrl}
              onPositionChange={setQrPosition}
            />
          )}
        </div>
      )}

      {/* QR Code Generator */}
      <QRCodeGenerator onQRCodeGenerated={setQrCodeUrl} />

      {/* Save Button */}
      <button onClick={handleSavePDF} disabled={!pdfFile || !qrCodeUrl}>
        Save PDF with QR Code
      </button>
    </div>
  );
};

export default App;
