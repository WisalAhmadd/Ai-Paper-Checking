import React from 'react';
import { BarChart3 } from 'lucide-react';
// import './Navbar.css';

function Navbar({ currentPage, onNavigate }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'search', label: 'Search', icon: '🔍' },
    { id: 'dashboard', label: 'Dashboard', icon: '📊' }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="brand-icon">
            <BarChart3 size={28} />
          </div>
          <div className="brand-text">
            <h1>AI Paper Grading</h1>
            <p>Intelligent Assessment System</p>
          </div>
        </div>

        <div className="navbar-menu">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;


