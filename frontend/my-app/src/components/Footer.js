
import React from 'react';
// import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-section">
            <h3>AI Paper Grading</h3>
            <p>Intelligent assessment system powered by Machine Learning and Natural Language Processing</p>
            <div className="footer-icons">
              <span>🤖</span>
              <span>📊</span>
              <span>🎓</span>
            </div>
          </div>

          <div className="footer-section">
            <h4>Features</h4>
            <ul>
              <li>Instant AI Grading</li>
              <li>Detailed Feedback</li>
              <li>Student Analytics</li>
              <li>History Tracking</li>
              <li>Export Reports</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Technology</h4>
            <ul>
              <li>React.js Frontend</li>
              <li>Python Flask Backend</li>
              <li>Tesseract OCR</li>
              <li>Sentence-BERT AI</li>
              <li>PostgreSQL Database</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 AI Paper Grading System. All rights reserved.</p>
          <p className="footer-powered">Powered by Artificial Intelligence & Machine Learning</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;