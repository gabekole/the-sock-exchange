from flask import Flask, send_from_directory, request

app = Flask(__name__)

@app.route('/api/data', methods=['GET'])
def get_data():
    return "Good"


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