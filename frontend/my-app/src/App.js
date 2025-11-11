import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Search from './pages/Search';
import Results from './pages/Results';
import Dashboard from './pages/Dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentResult, setCurrentResult] = useState(null);

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} onResultReady={setCurrentResult} />;
      case 'search':
        return <Search onNavigate={setCurrentPage} onResultSelect={setCurrentResult} />;
      case 'results':
        return <Results result={currentResult} onNavigate={setCurrentPage} />;
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      default:
        return <Home onNavigate={setCurrentPage} onResultReady={setCurrentResult} />;
    }
  };

  return (
    <div className="app">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="page-content">
        {renderPage()}
      </div>
      <Footer />
    </div>
  );
}

export default App;