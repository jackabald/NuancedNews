from flask import Flask, jsonify, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

@app.route('/api/news', methods=['GET'])
def get_news():
    with open('rss_feed.json', 'r') as file:
        data = json.load(file)
    return jsonify(data)

# @app.route('api/save', methods['POST'])
# def save_to_firestore():
#     try:
#         data = request.json
#         doc_ref = db.collection('news').document()
#         doc_ref.set(data)
#         return jsonify({"success": True}), 200
#     except Exception as e:
#         return f"An Error Occurred {e}", 400
    
if __name__ == "__main__":
    app.run(debug=True)
