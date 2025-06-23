import React, { useState } from "react";

const Image = () => {
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [prompt, setPrompt] = useState(""); // <-- prompt state

  const generateImage = async () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt!");
      return;
    }

    setLoading(true);
    try {
      const targetUrl = "https://a5e2-34-125-255-155.ngrok-free.app/generate"; // Replace with your ngrok URL

      const response = await fetch(targetUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          negative_prompt:
            "ugly, blurry face, bad eyes, bad lips, bad nose, cross eyed, looking at the screen, unreal, low res, bad anatomy, blurry",
          height: 800,
          width: 640,
          num_inference_steps: 100,
          guidance_scale: 7.5,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const blob = await response.blob();
      const imageObjectURL = URL.createObjectURL(blob);
      setImageURL(imageObjectURL);
    } catch (error) {
      console.error("❌ Error generating image:", error);
      alert("Failed to generate image (likely due to CORS or network error).");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt here"
        style={{
          padding: "10px",
          width: "60%",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "1rem",
          marginBottom: "1rem",
        }}
        disabled={loading}
      />
      <br />
      <button
        onClick={generateImage}
        disabled={loading}
        style={{
          backgroundColor: "#4caf50",
          color: "white",
          padding: "12px 24px",
          border: "none",
          borderRadius: "10px",
          cursor: loading ? "wait" : "pointer",
          fontSize: "1rem",
        }}
      >
        {loading ? "Generating..." : "Generate Image"}
      </button>

      {imageURL && (
        <div style={{ marginTop: "20px" }}>
          <img
            src={imageURL}
            alt="Generated AI Art"
            style={{
              maxWidth: "100%",
              borderRadius: "12px",
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Image;
