import React, { useState } from 'react';
import { FaTemperatureHigh, FaTemperatureLow, FaWind, FaTint, FaSun, FaMoon } from 'react-icons/fa';

// Define the type for weather data
interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  weather_description: string;
  weather_icon: string;
  wind_speed: number;
  humidity: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  units: string;
  dew_point: number;
}

export function Welcome() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`/api/weather?q=${city}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data: WeatherData = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Function to determine weather icon URL based on weather code
  const getWeatherIconUrl = (weatherCode: string) => {
    return `https://openweathermap.org/img/wn/${weatherCode}@2x.png`;
  };

  // Function to format time
  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <main className="flex items-start justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-10 rounded shadow-md w-full max-w-xl mt-10">
        <h1 className="text-3xl font-bold mb-6 text-center">Weather Query</h1>
        <div className="flex flex-col items-center gap-6">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="border rounded p-3 w-full bg-gray-700 text-white"
          />
          <button
            onClick={fetchWeatherData}
            className="bg-blue-600 text-white rounded p-3 w-full hover:bg-blue-700"
          >
            Get Weather
          </button>
          {weatherData && (
            <div className="mt-6 p-6 bg-gray-700 rounded w-full">
              {/* Partial Widget */}
              <div className="flex flex-col items-center mb-6">
                <img
                  src={getWeatherIconUrl(weatherData.weather_icon)}
                  alt={weatherData.weather_description}
                  className="w-32 h-32 mb-4"
                />
                <p className="text-4xl font-bold mb-2">{Math.round(weatherData.temperature)}°{weatherData.units === 'metric' ? 'C' : 'F'}</p>
                <p className="text-xl mb-2">{weatherData.city}, {weatherData.country}</p>
                <p className="text-lg">{weatherData.weather_description}</p>
              </div>
              <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
              {/* Additional Details */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 mb-4">
                  <FaTemperatureHigh size={24} />
                  <p className="text-lg">High: {Math.round(weatherData.temp_max)}°{weatherData.units === 'metric' ? 'C' : 'F'}</p>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <FaTemperatureLow size={24} />
                  <p className="text-lg">Low: {Math.round(weatherData.temp_min)}°{weatherData.units === 'metric' ? 'C' : 'F'}</p>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <FaWind size={24} />
                  <p className="text-lg">Wind Speed: {Math.round(weatherData.wind_speed)} {weatherData.units === 'metric' ? 'm/s' : 'mph'}</p>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <FaTint size={24} />
                  <p className="text-lg">Humidity: {weatherData.humidity}%</p>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <FaSun size={24} />
                  <p className="text-lg">Sunrise: {formatTime(weatherData.sunrise)}</p>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <FaMoon size={24} />
                  <p className="text-lg">Sunset: {formatTime(weatherData.sunset)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
