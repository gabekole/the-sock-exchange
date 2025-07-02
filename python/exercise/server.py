import requests
import os 
from flask import Flask, send_from_directory, request, jsonify
from dotenv import load_dotenv


app = Flask(__name__)

load_dotenv()

API_KEY = os.getenv('WEATHER_API_KEY')
WEATHER_API_URL = os.getenv('WEATHER_API_URL')



@app.route('/api/weather', methods=['GET'])
def get_weather():
    query = request.args.get('q')
    units = 'imperial'

    if not query:
        return jsonify({'error': 'Query parameter is required'}), 400

    if units not in ['standard', 'metric', 'imperial']:
        return jsonify({'error': 'Invalid units parameter'}), 400

    params = {
        'q': query,
        'appid': API_KEY,
        'units': units
    }

    try:
        response = requests.get(WEATHER_API_URL, params=params)
        response.raise_for_status()
        data = response.json()

        print(data)

        weather_info = {
            'city': data.get('name', ''),
            'country': data['sys'].get('country', ''),
            'temperature': data['main']['temp'],
            'feels_like': data['main']['feels_like'],
            'temp_min': data['main']['temp_min'],
            'temp_max': data['main']['temp_max'],
            'weather_description': data['weather'][0]['description'],
            'weather_icon': data['weather'][0]['icon'],
            'wind_speed': data['wind']['speed'],
            'humidity': data['main']['humidity'],
            'pressure': data['main']['pressure'],
            'visibility': data.get('visibility', 0),
            'sunrise': data['sys']['sunrise'],
            'sunset': data['sys']['sunset'],
            'units': units
        }

        return jsonify(weather_info)

    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500

@app.route('/assets/<path:path>')
def serve_assets(path):
    return send_from_directory('./exercise-client/build/client/assets', path)

@app.route('/favicon.ico')
def serve_favicon():
    return send_from_directory('./exercise-client/build/client', 'favicon.ico')

@app.route('/about')
def serve_preloaded():
    path = request.path.strip('/')
    path_file = f"{path}/index.html"
    return send_from_directory('./exercise-client/build/client', path_file)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_index(path):
    return send_from_directory('./exercise-client/build/client', 'index.html')


if __name__ == '__main__':
    app.run(use_reloader=True, port=5000, threaded=True)