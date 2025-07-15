import React, { useEffect, useState } from "react";


export default function Stats() {
  const [data, setData] = useState([]);

  useEffect(() => {

    const mock = [
      {
        shortUrl: "https://localhost:3000/abc123",
        createdAt: "2025-07-15T10:00:00Z",
        expiresAt: "2025-07-15T12:00:00Z",
        clicks: 5,
        details: [
          { timestamp: "2025-07-15T10:30:00Z", source: "Chrome", location: "Dehradun" },
          { timestamp: "2025-07-15T10:45:00Z", source: "Edge", location: "Delhi" }
        ]
      }
    ];
    setData(mock);
  }, []);

  return (
    <div className="stats-container">
      <h2>URL Statistics</h2>
      {data.map((entry, idx) => (
        <div key={idx} className="stats-entry">
          <p><strong>Short URL:</strong> <a href={entry.shortUrl}>{entry.shortUrl}</a></p>
          <p>Created: {new Date(entry.createdAt).toLocaleString()}</p>
          <p>Expires: {new Date(entry.expiresAt).toLocaleString()}</p>
          <p>Total Clicks: {entry.clicks}</p>
          <h4>Click Details:</h4>
          <ul>
            {entry.details.map((click, i) => (
              <li key={i}>{click.timestamp} - {click.source} - {click.location}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
