
import React from 'react';
import './QuestionCard.css';

function QuestionCard({ question }) {
  const getScoreColor = (score, max) => {
    const percentage = (score / max) * 100;
    if (percentage >= 80) return 'high';
    if (percentage >= 50) return 'medium';
    return 'low';
  };

  const scoreColor = getScoreColor(question.score, question.maxScore);

  return (
    <div className={`question-card ${scoreColor}`}>
      <div className="question-header">
        <h3 className="question-title">
          Q{question.id}. {question.question}
        </h3>
        <div className={`score-badge ${scoreColor}`}>
          {question.score}/{question.maxScore}
        </div>
      </div>

      <div className="answer-comparison">
        <div className="answer-box student-answer">
          <p className="answer-label">Student's Answer</p>
          <p className="answer-text">{question.studentAnswer}</p>
        </div>

        <div className="answer-box expected-answer">
          <p className="answer-label">Expected Answer</p>
          <p className="answer-text">{question.correctAnswer}</p>
        </div>
      </div>

      <div className="feedback-box">
        <p className="feedback-label">AI Feedback</p>
        <p className="feedback-text">{question.feedback}</p>
      </div>
    </div>
  );
}

export default QuestionCard;