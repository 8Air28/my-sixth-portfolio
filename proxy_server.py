from flask import Flask, request, jsonify
import requests
import base64

app = Flask(__name__)

# ここに Hugging Face APIキーを入れてください
HF_API_KEY = "Yhf_IkWiBdgSqRkVOyPlhIaBEHPKFlhERqZXoCOUR_HUGGINGFACE_API_KEY"

HF_API_URL = "https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4"

@app.route("/generate", methods=["POST"])
def generate():
    data = request.get_json()
    prompt = data.get("prompt", "")

    if not prompt:
        return jsonify({"error": "プロンプトが空です"}), 400

    headers = {
        "Authorization": f"Bearer {HF_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {"inputs": prompt}

    try:
        response = requests.post(HF_API_URL, headers=headers, json=payload, timeout=60)
        response.raise_for_status()
    except Exception as e:
        return jsonify({"error": "API呼び出し失敗", "details": str(e)}), 500

    result = response.json()

    # base64形式で返ってくる画像を取得
    if isinstance(result, list) and "generated_image" in result[0]:
        return jsonify({"image": result[0]["generated_image"]})

    if isinstance(result, dict) and "image" in result:
        return jsonify({"image": result["image"]})

    return jsonify({"error": "画像が生成されませんでした", "details": result}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
