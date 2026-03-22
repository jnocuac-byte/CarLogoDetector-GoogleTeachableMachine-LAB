import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="main-header">
      <div className="header-content">
        <div className="logo-area">
          
          <h1>AutoBrand AI</h1>
          <span className="badge">v1.0</span>
        </div>
        <div className="student-info">
          <span>👨‍🎓 Juan Esteban Nocua Camacho</span>
          <span style={{ margin: '0 8px' }}>•</span>
          <span>📚 Ing. Sistemas y Computación</span>
        </div>
      </div>
    </header>
  );
};

export default Header;