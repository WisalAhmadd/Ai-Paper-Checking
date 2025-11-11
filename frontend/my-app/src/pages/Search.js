// ============================================
// FILE: src/pages/Search.js
// ============================================
import React, { useState } from 'react';
import { Search as SearchIcon, Clock } from 'lucide-react';
import './Search.css';
import { api } from '../services/api';

function Search({ onNavigate, onResultSelect }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError('Please enter a Student ID or Name');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const results = await api.searchStudents(searchQuery);
      setSearchResults(results);
      
      if (results.length === 0) {
        setError(`No results found for "${searchQuery}"`);
      }
    } catch (err) {
      setError('Search failed. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const viewResult = async (result) => {
    try {
      // If result has full data, use it directly
      if (result.questions) {
        onResultSelect(result);
        onNavigate('results');
      } else {
        // Otherwise fetch full details
        const fullResult = await api.getResult(result.id);
        onResultSelect(fullResult);
        onNavigate('results');
      }
    } catch (err) {
      console.error('Failed to fetch result details:', err);
    }
  };

  return (
    <div className="search-page">
      <div className="search-container">
        <h1 className="search-title">
          <SearchIcon size={40} />
          Search Student Results
        </h1>

        <div className="search-bar-container">
          <div className="search-input-wrapper">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter Student ID or Name..."
              className="search-input"
            />
            <SearchIcon className="search-input-icon" size={24} />
          </div>
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>

        {error && (
          <div className="search-error">
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="search-loading">
            <Clock className="loading-spinner" size={48} />
            <p>Searching...</p>
          </div>
        ) : searchResults.length > 0 ? (
          <div className="search-results">
            <p className="results-count">
              Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
            </p>
            <div className="results-grid">
              {searchResults.map((result, index) => (
                <ResultCard 
                  key={index} 
                  result={result} 
                  onClick={() => viewResult(result)}
                />
              ))}
            </div>
          </div>
        ) : searchQuery && !error ? (
          <div className="no-results">
            <SearchIcon size={64} />
            <p>No results found for "{searchQuery}"</p>
          </div>
        ) : (
          <div className="search-placeholder">
            <SearchIcon size={64} />
            <p>Enter Student ID or Name to search</p>
            <div className="search-examples">
              <p>Examples:</p>
              <ul>
                <li>CS-2021-001</li>
                <li>John Doe</li>
                <li>Ahmed</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ResultCard({ result, onClick }) {
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
    <div className="result-card" onClick={onClick}>
      <div className="result-header">
        <div className="result-info">
          <h3>{result.studentName || result.student_name}</h3>
          <p className="result-id">ID: {result.rollNumber || result.roll_number || 'N/A'}</p>
          <p className="result-subject">{result.subject}</p>
        </div>
        <div className={`result-score ${scoreColor}`}>
          <span className="score-value">{result.score}%</span>
          <span className="score-grade">{getGrade(result.score)}</span>
        </div>
      </div>
      
      {result.date && (
        <div className="result-date">
          <span>📅 {result.date}</span>
        </div>
      )}
      
      <div className="result-action">
        <button className="view-button">View Details →</button>
      </div>
    </div>
  );
}

export default Search;