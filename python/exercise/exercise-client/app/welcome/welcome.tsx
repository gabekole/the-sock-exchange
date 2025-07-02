import React, { useState } from 'react';

// Define the type for weather data
interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feels_like: number;
  weather_description: string;
  weather_icon: string;
  wind_speed: number;
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
              <h3 className="text-xl font-semibold">Weather Data for {weatherData.city}, {weatherData.country}:</h3>
              <div className="flex items-center gap-3 mt-2">
                <img
                  src={`http://openweathermap.org/img/wn/${weatherData.weather_icon}@2x.png`}
                  alt={weatherData.weather_description}
                  className="w-14 h-14"
                />
                <p className="text-lg">{weatherData.weather_description}</p>
              </div>
              <p className="text-lg mt-2">Temperature: {weatherData.temperature}°{weatherData.units === 'metric' ? 'C' : 'F'}</p>
              <p className="text-lg">Feels Like: {weatherData.feels_like}°{weatherData.units === 'metric' ? 'C' : 'F'}</p>
              <p className="text-lg">Wind Speed: {weatherData.wind_speed} {weatherData.units === 'metric' ? 'm/s' : 'mph'}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
