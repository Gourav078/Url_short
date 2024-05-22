"use client";
import { useEffect, useState } from "react";

const UrlList = () => {
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await fetch("/api/url/all");
        if (!response.ok) {
          throw new Error("Failed to fetch URLs");
        }
        const data = await response.json();
        setUrls(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUrls();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* <h2 className="text-2xl font-bold mb-4">List of URLs</h2> */}
      {error && <p className="text-red-500">{error}</p>}
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border border-gray-200">Long URL</th>
            <th className="p-2 border border-gray-200">Short URL</th>
            <th className="p-2 border border-gray-200">Clicks</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="p-2 border border-gray-200">{url.longUrl}</td>
              <td className="p-2 border border-gray-200">
                <a
                  href={url.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {url.shortUrl}
                </a>
              </td>
              <td className="p-2 border border-gray-200">{url.clicks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UrlList;
