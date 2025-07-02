from flask import Flask, send_from_directory, send_file

app = Flask(__name__)

@app.route('/api/data', methods=['GET'])
def get_data():
    return "Good"


# Route for the react application
@app.route('/', defaults={'path': 'index.html'})
@app.route('/<path:path>')
def root_route(path):
    print(f"{path}")
    return send_from_directory('./exercise-client/build/client', path)

if __name__ == '__main__':
    app.run(use_reloader=True, port=5000, threaded=True)