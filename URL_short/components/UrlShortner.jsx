// components/UrlShortener.js
"use client";
import { useState } from "react";

const UrlShortener = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [clicks, setClicks] = useState(0);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");
    setClicks(0);

    try {
      const response = await fetch("/api/url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ longUrl }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const data = await response.json();
      setShortUrl(data.shortUrl);

      // Fetch URL details to get the click count
      const shortCode = data.shortUrl.split("/").pop(); // Extract the short URL code
      const detailsResponse = await fetch(`/api/details/${shortCode}`);
      if (!detailsResponse.ok) {
        throw new Error("Failed to fetch URL details");
      }
      const details = await detailsResponse.json();
      setClicks(details.clicks);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Enter long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          required
        />
        <button type="submit">Shorten URL</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {shortUrl && (
        <div>
          <p>
            Short URL:{" "}
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
          </p>
          <p>Clicks: {clicks}</p>
        </div>
      )}
    </div>
  );
};

export default UrlShortener;
