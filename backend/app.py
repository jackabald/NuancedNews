import json

from flask import Flask, jsonify, request
from flask_cors import CORS

from article_summarise import scrape_and_summarize
from rss_parser import main as rss_parser  # noqa: F401

app = Flask(__name__)
CORS(app)


with app.app_context():
    """
    Startup function to initialize the app.
    """
    # Note: this used to be called `before_first_request` but that was deprecated.
    # https://flask.palletsprojects.com/en/2.0.x/api/#flask.Flask.before_first_request

    # Example startup functions:
    # print("Connecting to Firestore")
    # db = firestore.Client()

    print("Running RSS Parser")
    # rss_parser()


@app.get("/api/health")
def get_health():
    return jsonify({"status": "ok"})


@app.route("/api/news", methods=["GET"])
def get_news():
    with open("rss_feed.json", "r") as file:
        data = json.load(file)
    return jsonify(data)


# @app.route("api/save", methods["POST"])
# def save_to_firestore():
#     try:
#         data = request.json
#         doc_ref = db.collection("news").document()
#         doc_ref.set(data)
#         return jsonify({"success": True}), 200
#     except Exception as e:
#         return f"An Error Occurred {e}", 400


@app.route("/summarize", methods=["POST"])
def summarize():
    data = request.json
    url = data["url"]
    summary = scrape_and_summarize(url)
    return jsonify({"summary": summary})


if __name__ == "__main__":
    app.run(debug=True)
