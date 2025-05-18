import React, { useState, useEffect } from 'react';
import '../styles/WeatherApp.css'; // Estilos opcionales (ver más abajo)

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('Madrid'); // Ciudad por defecto

  // Configura tu API key (regístrate en https://openweathermap.org/api para obtener una gratis)
  const API_KEY = '8ca75a3b2a9c719eb2bc674541c9c455'; // Reemplaza esto
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=es&appid=${API_KEY}`;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather:", error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  if (loading) return <div className="weather-loading">Cargando clima...</div>;
  if (!weatherData) return <div className="weather-error">Error al cargar datos</div>;

  return (
    <div className="weather-container">
      <div className="weather-header">
        <h2>{weatherData.name}, {weatherData.sys.country}</h2>
        <input 
          type="text" 
          placeholder="Cambiar ciudad" 
          onKeyPress={(e) => e.key === 'Enter' && setCity(e.target.value)}
        />
      </div>

      <div className="weather-main">
        <img 
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
          alt={weatherData.weather[0].description}
        />
        <div className="weather-temp">{Math.round(weatherData.main.temp)}°C</div>
      </div>

      <div className="weather-desc">{weatherData.weather[0].description}</div>
    </div>
  );
};

export default WeatherApp;