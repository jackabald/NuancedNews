from flask import Flask, jsonify
import json

app = Flask(__name__)

@app.route('/api/news', methods=['GET'])
def get_news():
    with open('rss_feed.json', 'r') as file:
        data = json.load(file)
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)
