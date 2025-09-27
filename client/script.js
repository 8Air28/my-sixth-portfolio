async function generate() {
  const prompt = document.getElementById("prompt").value;

  if (!prompt) {
    alert("プロンプトを入力してください");
    return;
  }

  const res = await fetch("http://localhost:5000/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  const data = await res.json();

  if (data.image) {
    document.getElementById("result").src =
      "data:image/png;base64," + data.image;
  } else {
    alert("画像生成に失敗しました");
    console.error(data.details);
  }
}
