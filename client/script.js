document.getElementById("generate-btn").addEventListener("click", () => {
  const prompt = document.getElementById("prompt").value;
  if (!prompt) {
    alert("画像の説明を入力してください");
    return;
  }

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "生成中…";

  fetch("http://127.0.0.1:5000/generate", {
    // URLを明示的に指定
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        resultDiv.innerHTML = `<p style="color:red;">エラー: ${data.error}</p>`;
        return;
      }
      const img = document.createElement("img");
      img.src = `data:image/png;base64,${data.image}`;
      img.alt = prompt;
      resultDiv.innerHTML = "";
      resultDiv.appendChild(img);
    })
    .catch((error) => {
      resultDiv.innerHTML = `<p style="color:red;">通信エラー: ${error}</p>`;
    });
});
