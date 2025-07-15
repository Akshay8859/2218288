import React, { useState } from "react";
import "../styles/Home.css"; // Assuming you have a CSS file for styling
export default function Home() {
  const [urls, setUrls] = useState([{ url: "", shortcode: "" }]);
  const [results, setResults] = useState([]);

  const handleChange = (index, key, value) => {
    const updated = [...urls];
    updated[index][key] = value;
    setUrls(updated);
  };

  const addField = () => {
    if (urls.length < 5) setUrls([...urls, { url: "", shortcode: "" }]);
  };

  const handleSubmit = async () => {
    const validated = urls.filter((u) => u.url.trim());
    const res = await Promise.all(
      validated.map(async ({ url, shortcode }) => {
        try {
          const response = await fetch("http://localhost:3001/shorten",{ headers: {
  "Content-Type": "application/json"
},method: "POST",
      body: JSON.stringify({
        originalUrl: url,
        customCode: shortcode || undefined,
      }),});
          const data = await response.json();
          console.log("API response:", data.shortUrl);
          
          return {
            original: url,
            short: data.shortUrl || "Failed",
            
            shortcode: shortcode 
          };
        } catch (e) {
            console.error("Error shortening URL:", e);
          return { original: url, short: "Failed", expiry: "-", shortcode: "-" };
        }
      })
    );
    setResults(res);
  };

  return (
    <div className="home-container">
      <h2>URL Shortener</h2>
      {urls.map((item, idx) => (
        <div key={idx} className="url-input-group">
          <input
            type="text"
            placeholder="Long URL"
            value={item.url}
            onChange={(e) => handleChange(idx, "url", e.target.value)}
          />
          <input
            type="text"
            placeholder="Shortcode (optional)"
            value={item.shortcode}
            onChange={(e) => handleChange(idx, "shortcode", e.target.value)}
          />
        </div>
      ))}
      <button onClick={addField}>+ Add More</button>
      <button onClick={handleSubmit}>Shorten URLs</button>

      {results.length > 0 && (
        <div className="results">
          <h3>Results:</h3>
          <ul>
            {results.map((r, idx) => (
              <li key={idx}>
                <strong>{r.original}</strong> → <a href={`https://${r.short}`} target="_blank" rel="noreferrer">{r.short}</a> 
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
