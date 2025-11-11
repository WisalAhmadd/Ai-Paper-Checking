import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import './Home.css';
import UploadBox from '../components/UploadBox';
import { api } from '../services/api';

function Home({ onNavigate, onResultReady }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [subject, setSubject] = useState('English Grammar');

  const subjects = [
    'English Grammar',
    'Science',
    'Mathematics',
    'Computer Science'
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError('');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      if (file.type.includes('image') || file.type.includes('pdf')) {
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
        setError('');
      } else {
        setError('Please upload an image or PDF file');
      }
    }
  };

  const uploadAndGrade = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError('');

    try {
      const result = await api.gradePaper(selectedFile, subject);
      onResultReady(result);
      onNavigate('results');
    } catch (err) {
      setError(err.message || 'Failed to process paper. Please check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setError('');
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-emoji">📝</div>
        <h1 className="hero-title">AI-Powered Paper Grading</h1>
        <p className="hero-description">
          Upload answer sheets and get instant AI-powered grading with detailed feedback and analytics
        </p>
      </div>

      <div className="home-grid">
        {/* Left: Instructions */}
        <div className="instructions-card">
          <h2 className="section-title">
            <span className="title-icon">📖</span>
            How to Use
          </h2>

          <div className="instruction-steps">
            <InstructionStep 
              num="1" 
              title="Prepare Your Answer Sheet"
              desc="Take a clear photo or scan the answer sheet. Ensure good lighting and readable text."
            />
            <InstructionStep 
              num="2" 
              title="Upload the File"
              desc="Click the upload area or drag & drop your file. Supports JPG, PNG, and PDF formats."
            />
            <InstructionStep 
              num="3" 
              title="Select Subject"
              desc="Choose the subject for accurate grading using subject-specific answer keys."
            />
            <InstructionStep 
              num="4" 
              title="Get Results"
              desc="AI will extract text, grade answers, and provide detailed feedback in seconds."
            />
          </div>

          <div className="important-notes">
            <h4>📌 Important Notes:</h4>
            <ul>
              <li>✓ File size limit: 10MB maximum</li>
              <li>✓ Supported formats: JPG, PNG, PDF</li>
              <li>✓ Ensure questions are labeled (Q1, Q2, etc.)</li>
              <li>✓ Student name and ID should be visible</li>
            </ul>
          </div>
        </div>

        {/* Right: Upload Section */}
        <div className="upload-section">
          <div className="upload-card">
            <h2 className="section-title">Upload Answer Sheet</h2>

            <UploadBox
              selectedFile={selectedFile}
              previewUrl={previewUrl}
              onFileChange={handleFileChange}
              onDrop={handleDrop}
            />

            {previewUrl && (
              <>
                <div className="subject-selector">
                  <label>Select Subject:</label>
                  <select 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="subject-dropdown"
                  >
                    {subjects.map(subj => (
                      <option key={subj} value={subj}>{subj}</option>
                    ))}
                  </select>
                </div>

                {error && (
                  <div className="error-message">
                    <p>{error}</p>
                  </div>
                )}

                {loading ? (
                  <div className="loading-box">
                    <Clock className="loading-icon" size={48} />
                    <p className="loading-title">Processing Paper...</p>
                    <p className="loading-subtitle">Extracting text and analyzing answers</p>
                    <div className="progress-bar">
                      <div className="progress-fill"></div>
                    </div>
                  </div>
                ) : (
                  <div className="action-buttons">
                    <button onClick={uploadAndGrade} className="btn-primary">
                      Grade Paper
                    </button>
                    <button onClick={resetUpload} className="btn-secondary">
                      Cancel
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Quick Stats */}
          <div className="quick-stats">
            <div className="stat-card blue">
              <p className="stat-value">85-90%</p>
              <p className="stat-label">Accuracy Rate</p>
            </div>
            <div className="stat-card green">
              <p className="stat-value">&lt;30s</p>
              <p className="stat-label">Grading Time</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InstructionStep({ num, title, desc }) {
  return (
    <div className="instruction-step">
      <div className="step-number">{num}</div>
      <div className="step-content">
        <h4>{title}</h4>
        <p>{desc}</p>
      </div>
    </div>
  );
}

export default Home;