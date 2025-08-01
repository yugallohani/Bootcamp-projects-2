import React from 'react';

const Header = ({ theme, toggleTheme }) => {
  return (
    <header className="header">
      <h1 className="header-title">Yugal’s Theme Toggle App</h1>
      <button onClick={toggleTheme} className="theme-toggle-btn">
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </header>
  );
};

export default Header;
