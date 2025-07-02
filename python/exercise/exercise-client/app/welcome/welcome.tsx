import React, { useState } from 'react';

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
  visibility: number;
  sunrise: number;
  sunset: number;
  units: string;
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

  // Function to determine weather icon URL based on time of day and weather code
  const getWeatherIconUrl = (weatherCode: string) => {
    return `https://openweathermap.org/img/wn/${weatherCode}@2x.png`;
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-10 rounded shadow-md w-full max-w-md">
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
              <div className="flex flex-col items-center">
                <img
                  src={getWeatherIconUrl(weatherData.weather_icon)}
                  alt={weatherData.weather_description}
                  className="w-24 h-24"
                />
                <p className="text-4xl font-bold">{weatherData.temperature}°{weatherData.units === 'metric' ? 'C' : 'F'}</p>
                <p className="text-xl">{weatherData.city}, {weatherData.country}</p>
              </div>
              {/* Additional Details */}
              <div className="mt-6">
                <div className="flex items-center gap-2">
                  <p className="text-lg">Feels Like: {weatherData.feels_like}°{weatherData.units === 'metric' ? 'C' : 'F'}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-lg">High: {weatherData.temp_max}°{weatherData.units === 'metric' ? 'C' : 'F'}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-lg">Low: {weatherData.temp_min}°{weatherData.units === 'metric' ? 'C' : 'F'}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-lg">Wind Speed: {weatherData.wind_speed} {weatherData.units === 'metric' ? 'm/s' : 'mph'}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-lg">Humidity: {weatherData.humidity}%</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-lg">Pressure: {weatherData.pressure} hPa</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-lg">Visibility: {weatherData.visibility} meters</p>
                </div>
                <p className="text-lg">Sunrise: {new Date(weatherData.sunrise * 1000).toLocaleTimeString()}</p>
                <p className="text-lg">Sunset: {new Date(weatherData.sunset * 1000).toLocaleTimeString()}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
