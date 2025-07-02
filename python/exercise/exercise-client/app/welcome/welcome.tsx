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
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Weather Query</h1>
        <div className="flex flex-col items-center gap-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="border rounded p-2 w-full"
          />
          <button
            onClick={fetchWeatherData}
            className="bg-blue-500 text-white rounded p-2 w-full hover:bg-blue-600"
          >
            Get Weather
          </button>
          {weatherData && (
            <div className="mt-4 p-4 bg-gray-50 rounded w-full">
              <h3 className="text-lg font-semibold">Weather Data for {weatherData.city}, {weatherData.country}:</h3>
              <div className="flex items-center gap-2">
                <img
                  src={`http://openweathermap.org/img/wn/${weatherData.weather_icon}@2x.png`}
                  alt={weatherData.weather_description}
                  className="w-12 h-12"
                />
                <p className="text-sm">{weatherData.weather_description}</p>
              </div>
              <p className="text-sm">Temperature: {weatherData.temperature}°{weatherData.units === 'metric' ? 'C' : 'F'}</p>
              <p className="text-sm">Feels Like: {weatherData.feels_like}°{weatherData.units === 'metric' ? 'C' : 'F'}</p>
              <p className="text-sm">Wind Speed: {weatherData.wind_speed} {weatherData.units === 'metric' ? 'm/s' : 'mph'}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
