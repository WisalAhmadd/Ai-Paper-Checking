// ============================================
// FILE: src/pages/Results.js
// ============================================
import React from 'react';
import { Download } from 'lucide-react';
import './Results.css';
import QuestionCard from '../components/QuestionCard';

function Results({ result, onNavigate }) {
  if (!result) {
    return (
      <div className="no-result">
        <p>No results to display</p>
        <button onClick={() => onNavigate('home')} className="btn-go-home">
          Go to Home
        </button>
      </div>
    );
  }

  const getGradeColor = (score) => {
    if (score >= 80) return 'high';
    if (score >= 60) return 'medium';
    return 'low';
  };

  const getGrade = (score) => {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    return 'D';
  };

  const scoreColor = getGradeColor(result.score);

  return (
    <div className="results-page">
      {/* Score Card */}
      <div className={`score-card ${scoreColor}`}>
        <div className="score-header">
          <div className="score-info">
            <p className="score-label">Total Score</p>
            <p className="score-value">{result.score}%</p>
          </div>
          <div className="grade-badge">
            {getGrade(result.score)}
          </div>
        </div>
        
        <div className="score-stats">
          <StatItem label="Questions" value={result.totalQuestions} />
          <StatItem label="Attempted" value={result.attempted} />
          <StatItem label="Correct" value={result.correctAnswers} />
          <StatItem label="Percentage" value={`${result.score}%`} />
        </div>
      </div>

      {/* Student Info */}
      <div className="student-info-card">
        <h2>Student Information</h2>
        <div className="info-grid">
          <InfoItem label="Student Name" value={result.studentName || 'Not Detected'} />
          <InfoItem label="Student ID" value={result.rollNumber || 'Not Detected'} />
          <InfoItem label="Subject" value={result.subject} />
        </div>
      </div>

      {/* Questions Analysis */}
      <div className="questions-section">
        <div className="questions-header">
          <h2>Question-wise Analysis</h2>
          <button className="export-button">
            <Download size={20} />
            Export PDF
          </button>
        </div>

        <div className="questions-list">
          {result.questions && result.questions.length > 0 ? (
            result.questions.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))
          ) : (
            <p className="no-questions">No question data available</p>
          )}
        </div>
      </div>

      <button onClick={() => onNavigate('home')} className="btn-grade-another">
        Grade Another Paper
      </button>
    </div>
  );
}

function StatItem({ label, value }) {
  return (
    <div className="stat-item">
      <p className="stat-value">{value}</p>
      <p className="stat-label">{label}</p>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="info-item">
      <p className="info-label">{label}</p>
      <p className="info-value">{value}</p>
    </div>
  );
}

export default Results;