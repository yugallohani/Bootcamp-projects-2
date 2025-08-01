import React, { useState, useEffect } from 'react';
import Header from './Header';
import './App.css';

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  useEffect(() => {
    document.body.className = `${theme}-theme`;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`app ${theme}-theme`}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <div className="content-card">
          <h2>Welcome to the App!</h2>
          <p>
            This is a simple demonstration of a dark and light mode toggle in React.
            Click the button in the header to switch themes. Your choice will be saved
            for your next visit!
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
