
import React from 'react';
import { Upload, FileText, CheckCircle } from 'lucide-react';
// import './UploadBox.css';

function UploadBox({ selectedFile, previewUrl, onFileChange, onDrop }) {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="upload-box-container">
      {!previewUrl ? (
        <div
          className="upload-dropzone"
          onDrop={onDrop}
          onDragOver={handleDragOver}
        >
          <input
            type="file"
            id="fileUpload"
            className="file-input"
            accept="image/*,.pdf"
            onChange={onFileChange}
          />
          <label htmlFor="fileUpload" className="upload-label">
            <Upload className="upload-icon" size={64} />
            <p className="upload-title">Drop file here or click to browse</p>
            <p className="upload-subtitle">JPG, PNG, PDF (Max 10MB)</p>
          </label>
        </div>
      ) : (
        <div className="file-preview">
          <div className="file-info">
            <FileText className="file-icon" size={32} />
            <div className="file-details">
              <p className="file-name">{selectedFile.name}</p>
              <p className="file-size">{(selectedFile.size / 1024).toFixed(2)} KB</p>
            </div>
            <CheckCircle className="check-icon" size={32} />
          </div>

          <div className="preview-image-container">
            <img src={previewUrl} alt="Preview" className="preview-image" />
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadBox;