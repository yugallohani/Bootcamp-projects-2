// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // --- State Variables ---
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Delhi'); // Default city
  const [searchQuery, setSearchQuery] = useState('Delhi');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- API Configuration ---
  const apiKey = 'db7d9c6793cb03aebd655494c7dd3de1';
  const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  // --- useEffect Hook to Fetch Data ---
  // This runs when the `city` state changes.
  useEffect(() => {
    if (!city) return; // Don't fetch if city is empty

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      setWeatherData(null); // Clear old data

      try {
        const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
        
        if (response.status === 401) {
          throw new Error('Invalid API Key.');
        }
        if (response.status === 404) {
          throw new Error('City not found. Please check the spelling.');
        }
        if (!response.ok) {
          throw new Error('Could not fetch weather data.');
        }

        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]); // Dependency array: re-run effect when `city` changes

  // --- useEffect Hook to Update Background ---
  // This runs when `weatherData` changes.
  useEffect(() => {
    document.body.className = ''; // Reset classes
    if (weatherData) {
      const condition = weatherData.weather[0].main.toLowerCase();
      let bgClass = 'bg-gradient-main';
      if (condition.includes('clear')) bgClass = 'bg-gradient-sunny';
      else if (condition.includes('cloud')) bgClass = 'bg-gradient-cloudy';
      else if (condition.includes('rain') || condition.includes('drizzle')) bgClass = 'bg-gradient-rainy';
      else if (condition.includes('mist') || condition.includes('haze') || condition.includes('fog')) bgClass = 'bg-gradient-mist';
      document.body.classList.add(bgClass);
    } else {
        document.body.classList.add('bg-gradient-main');
    }
  }, [weatherData]);

  // --- Event Handlers ---
  const handleSearch = () => {
    setCity(searchQuery);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  // --- Render Logic ---
  return (
    <div className="app-container">
      <h1 className="main-title">Yugal’s Weather App</h1>
      <p className="creator-text">Created by Yugal Lohani</p>

      <div className="weather-wrapper">
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Enter city name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="search-btn" onClick={handleSearch}>
            <i className="fas fa-search"></i>
          </button>
        </div>

        <div className="weather-card">
          {loading && <div className="loading-spinner"><i className="fas fa-spinner fa-spin fa-3x"></i></div>}
          
          {error && <div className="error-message"><p>{error}</p></div>}

          {weatherData && !loading && !error && (
            <div className="weather-data">
              <img 
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`} 
                alt={weatherData.weather[0].description}
                className="weather-icon"
              />
              <p className="temperature">{Math.round(weatherData.main.temp)}°C</p>
              <p className="condition">{weatherData.weather[0].main}</p>
              <p className="city-country">{weatherData.name}, {weatherData.sys.country}</p>

              <div className="details-container">
                <div className="detail-item">
                  <i className="fas fa-tint"></i>
                  <div className="detail-text">
                    <p className="value">{weatherData.main.humidity}%</p>
                    <p className="label">Humidity</p>
                  </div>
                </div>
                <div className="detail-item">
                  <i className="fas fa-wind"></i>
                  <div className="detail-text">
                    <p className="value">{(weatherData.wind.speed * 3.6).toFixed(1)} km/h</p>
                    <p className="label">Wind Speed</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
