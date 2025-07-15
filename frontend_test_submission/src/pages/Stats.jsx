import React, { useEffect, useState } from "react";
import "../styles/Stats.css"; 

export default function Stats() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/all-urls")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch URLs");
        }
        return res.json();
      })
      .then((data) => {
        setUrls(data);
      })
      .catch((err) => {
        console.error("Error fetching URLs:", err);
      });
  }, []);

  return (
    <div className="url-table-container">
      <h2> All Shortened URLs</h2>
      <table className="url-table">
        <thead>
          <tr>
            <th>Short URL</th>
            <th>Original URL</th>
            <th>Clicks</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((item, idx) => (
            <tr key={idx}>
              <td>
                <a className="url-link" href={item.shortUrl} target="_blank" rel="noreferrer">
                  {item.shortUrl}
                </a>
              </td>
              <td>{item.originalUrl}</td>
              <td>{item.clicks}</td>
              <td>{item.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
