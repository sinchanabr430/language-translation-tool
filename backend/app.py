from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

MYMEMORY_URL = "https://api.mymemory.translated.net/get"


@app.route("/api/health", methods=["GET"])
def health_check():
    """Simple endpoint to confirm the backend is running."""
    return jsonify({"status": "ok", "message": "Backend is running"}), 200


@app.route("/api/translate", methods=["POST"])
def translate_text():
    """
    Accepts JSON: { text, source, target }
    source/target use ISO 639-1 codes (e.g. 'en', 'hi').
    Calls MyMemory Translation API and returns the translated text.
    """
    data = request.get_json(silent=True) or {}

    text = (data.get("text") or "").strip()
    source = data.get("source", "en")
    target = data.get("target", "en")

    if not text:
        return jsonify({"error": "Text field cannot be empty."}), 400

    if len(text) > 500:
        return jsonify({"error": "Text is too long. Please limit to 500 characters."}), 400

    if source == "auto":
        source = "en"

    if source == target:
        return jsonify({"error": "Source and target languages must be different."}), 400

    langpair = f"{source}|{target}"

    try:
        response = requests.get(
            MYMEMORY_URL,
            params={"q": text, "langpair": langpair},
            timeout=10,
        )
        response.raise_for_status()
        result = response.json()

        translated = result.get("responseData", {}).get("translatedText")

        if not translated:
            return jsonify({"error": "Translation service returned no result."}), 502

        return jsonify({
            "translatedText": translated,
            "source": source,
            "target": target,
        }), 200

    except requests.exceptions.Timeout:
        return jsonify({"error": "Translation service timed out. Please try again."}), 504

    except requests.exceptions.RequestException:
        return jsonify({"error": "Could not reach the translation service."}), 502


if __name__ == "__main__":
    app.run(debug=True, port=5000)
