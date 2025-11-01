import React, { useState, useEffect } from "react";
import axios from "axios";

function News() {
  const [articles, setArticles] = useState([]); 
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [loading, setLoading] = useState(true); 

  const fetchNews = async () => {
    try {
      const res = await axios.get("https://newsapi.org/v2/everything", {
        params: {
          q: "apple",
          from: "2025-10-09",
          to: "2025-10-09",
          sortBy: "popularity",
          apiKey: "bbd5f4764e1c40a8a8bb3d909f057d12",
        },
      });
      setArticles(res.data.articles);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors du chargement :", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const nextArticle = () => {
    setCurrentIndex((prev) =>
      prev === articles.length - 1 ? 0 : prev + 1
    );
  };

  const prevArticle = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? articles.length - 1 : prev - 1
    );
  };

  if (loading) {
    return <p className="text-center mt-4">Loading items...</p>;
  }

  if (articles.length === 0) {
    return <p className="text-center mt-4">No items available today.</p>;
  }

  const article = articles[currentIndex];

  return (
    <div className="max-w-lg mx-auto bg-blue-500 p-5 rounded-lg text-center text-white mt-6 shadow-lg">
      <h1 className="text-xl font-bold mb-4">Last News </h1>

      <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt="illustration"
          className="w-full h-52 object-cover rounded mb-3"
        />
      )}
      <p className="text-sm mb-3">{article.description}</p>
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="underline text-black font-medium"
      >
        Read More
      </a>

      <p className="text-sm mt-4">
        Post {currentIndex + 1} / {articles.length}
      </p>

      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={prevArticle}
          className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-800"
        >
          Prev
        </button>
        <button
          onClick={nextArticle}
          className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-800"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default News;
