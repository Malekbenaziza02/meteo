import { useState } from 'react';
import './index.css';

function App() {
  const [weather, setWeather] = useState({
    city: 'Paris',
    temperature: 18,
    condition: 'Nuageux',
    humidity: 65,
    windSpeed: 15,
    pressure: 1013,
    visibility: 10
  });

  const cities = [
    { name: 'Paris', temp: 18, condition: 'Nuageux', humidity: 65, wind: 15 },
    { name: 'Londres', temp: 15, condition: 'Pluvieux', humidity: 80, wind: 20 },
    { name: 'New York', temp: 22, condition: 'Ensoleillé', humidity: 50, wind: 10 },
    { name: 'Tokyo', temp: 25, condition: 'Ensoleillé', humidity: 55, wind: 12 },
    { name: 'Berlin', temp: 16, condition: 'Nuageux', humidity: 70, wind: 18 }
  ];

  const handleCityChange = (cityName) => {
    const selectedCity = cities.find(c => c.name === cityName);
    if (selectedCity) {
      setWeather({
        city: selectedCity.name,
        temperature: selectedCity.temp,
        condition: selectedCity.condition,
        humidity: selectedCity.humidity,
        windSpeed: selectedCity.wind,
        pressure: 1013,
        visibility: 10
      });
    }
  };

  const getWeatherIcon = (condition) => {
    switch(condition) {
      case 'Ensoleillé':
        return '☀️';
      case 'Pluvieux':
        return '🌧️';
      default:
        return '☁️';
    }
  };

  const getWeatherClass = (condition) => {
    switch(condition) {
      case 'Ensoleillé':
        return 'sunny';
      case 'Pluvieux':
        return 'rainy';
      default:
        return 'cloudy';
    }
  };

  return (
    <div className="app-container">
      <div className="content-wrapper">
        {/* Header */}
        <div className="header-card">
          <h1>☁️ Dashboard Météo</h1>
          <p>Application React + Vite pour votre pipeline DevOps</p>
        </div>

        {/* City Selector */}
        <div className="city-selector-card">
          <label>Sélectionnez une ville</label>
          <div className="city-buttons">
            {cities.map(c => (
              <button
                key={c.name}
                onClick={() => handleCityChange(c.name)}
                className={`city-btn ${weather.city === c.name ? 'active' : ''}`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Main Weather Card */}
        <div className={`weather-main-card ${getWeatherClass(weather.condition)}`}>
          <div className="weather-main-content">
            <div className="weather-info">
              <h2>{weather.city}</h2>
              <p>{weather.condition}</p>
            </div>
            <div className="weather-icon-temp">
              <div className="weather-icon">{getWeatherIcon(weather.condition)}</div>
              <div className="temperature">{weather.temperature}°C</div>
            </div>
          </div>
        </div>

        {/* Weather Details */}
        <div className="weather-details-grid">
          <div className="detail-card">
            <div className="detail-icon">💧</div>
            <div className="detail-value">{weather.humidity}%</div>
            <div className="detail-label">Humidité</div>
          </div>

          <div className="detail-card">
            <div className="detail-icon">💨</div>
            <div className="detail-value">{weather.windSpeed} km/h</div>
            <div className="detail-label">Vent</div>
          </div>

          <div className="detail-card">
            <div className="detail-icon">🌡️</div>
            <div className="detail-value">{weather.pressure} hPa</div>
            <div className="detail-label">Pression</div>
          </div>

          <div className="detail-card">
            <div className="detail-icon">👁️</div>
            <div className="detail-value">{weather.visibility} km</div>
            <div className="detail-label">Visibilité</div>
          </div>
        </div>

        {/* Footer */}
        <div className="footer-card">
          <p>🚀 Application prête pour Jenkins, Docker, GitHub Actions</p>
          <p className="build-info">Version 1.0.0 - Build #{Math.floor(Math.random() * 1000)}</p>
        </div>
      </div>
    </div>
  );
}

export default App;