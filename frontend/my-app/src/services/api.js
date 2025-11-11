// ============================================
// FILE: src/services/api.js
// ============================================

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const api = {
  /**
   * Upload and grade a paper
   * @param {File} file - The image/PDF file to upload
   * @param {string} subject - The subject (e.g., "English Grammar")
   * @returns {Promise} - Grading results
   */
  gradePaper: async (file, subject) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('subject', subject);

      const response = await fetch(`${API_URL}/grade`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to grade paper');
      }

      return await response.json();
    } catch (error) {
      console.error('Grade Paper Error:', error);
      throw error;
    }
  },

  /**
   * Search for students by ID or Name
   * @param {string} query - Student ID or Name
   * @returns {Promise} - Array of matching results
   */
  searchStudents: async (query) => {
    try {
      const response = await fetch(
        `${API_URL}/search?query=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error('Search failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Search Error:', error);
      throw error;
    }
  },

  /**
   * Get all grading history
   * @returns {Promise} - Array of all grading records
   */
  getHistory: async () => {
    try {
      const response = await fetch(`${API_URL}/history`);

      if (!response.ok) {
        throw new Error('Failed to fetch history');
      }

      return await response.json();
    } catch (error) {
      console.error('Get History Error:', error);
      throw error;
    }
  },

  /**
   * Get specific grading result by ID
   * @param {number} id - Result ID
   * @returns {Promise} - Detailed result object
   */
  getResult: async (id) => {
    try {
      const response = await fetch(`${API_URL}/result/${id}`);

      if (!response.ok) {
        throw new Error('Failed to fetch result');
      }

      return await response.json();
    } catch (error) {
      console.error('Get Result Error:', error);
      throw error;
    }
  },

  /**
   * Get dashboard statistics
   * @returns {Promise} - Statistics object
   */
  getStats: async () => {
    try {
      const response = await fetch(`${API_URL}/stats`);

      if (!response.ok) {
        throw new Error('Failed to fetch statistics');
      }

      return await response.json();
    } catch (error) {
      console.error('Get Stats Error:', error);
      throw error;
    }
  },

  /**
   * Get list of available subjects
   * @returns {Promise} - Array of subjects
   */
  getSubjects: async () => {
    try {
      const response = await fetch(`${API_URL}/subjects`);

      if (!response.ok) {
        throw new Error('Failed to fetch subjects');
      }

      return await response.json();
    } catch (error) {
      console.error('Get Subjects Error:', error);
      // Return default subjects if API fails
      return {
        subjects: ['English Grammar', 'Science', 'Mathematics', 'Computer Science']
      };
    }
  }
};

export default api;