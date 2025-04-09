import React, { useState } from "react";
import QRCode from "qrcode";

const QRCodeGenerator = ({ onQRCodeGenerated }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const generateQRCode = async () => {
    const url = await QRCode.toDataURL("https://example.com"); // Replace with your desired URL
    setQrCodeUrl(url);
    onQRCodeGenerated(url); // Pass the QR code URL to the parent component
  };

  return (
    <div>
      <button onClick={generateQRCode}>Generate QR Code</button>
      {qrCodeUrl && (
        <img
          src={qrCodeUrl}
          alt="QR Code"
          style={{ width: "100px", height: "100px" }}
        />
      )}
    </div>
  );
};

export default QRCodeGenerator;
