import { useState, useEffect } from "react";
import NewsCard from "../modules/NewsCard";
import Sidebar from "../modules/Sidebar";
import SearchBox from "../modules/SearchBox";
import "./App.css";
import type { NewsItem } from "../types/NewsTypes";
import { useNewsSearch } from "../hooks/useNewsSearch";
import { useResponsiveLayout } from "../hooks/useResponsiveLayout";

function App() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { filteredNews, uniqueSources, handleSearch, initializeFiltered } =
    useNewsSearch(news);
  const { newsColumns } = useResponsiveLayout(filteredNews);

  const fetchNews = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://127.0.0.1:8000/news");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newsData: NewsItem[] = await response.json();
      setNews(newsData);
      initializeFiltered(); // Kezdetben minden hír látható
    } catch (err) {
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFeedsUpdate = () => {
    fetchNews();
  };

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    initializeFiltered();
  }, [news, initializeFiltered]);

  // Csak akkor loading screen, ha még nincsenek hírek
  if (loading && news.length === 0) {
    return (
      <>
        <Sidebar onFeedsUpdate={handleFeedsUpdate} />
        <div className="news-container">
          <div style={{ textAlign: "center", padding: "50px", color: "white" }}>
            <h2>Hírek betöltése...</h2>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Sidebar onFeedsUpdate={handleFeedsUpdate} />
      <main className="main-content">
        {loading && news.length > 0 && (
          <div
            style={{
              position: "fixed",
              top: "20px",
              right: "20px",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              color: "#fff",
              padding: "8px 16px",
              borderRadius: "20px",
              fontSize: "14px",
              zIndex: 1000,
              border: "1px solid #333",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
            }}
          >
            Hírek frissítése...
          </div>
        )}
        <SearchBox
          onSearch={handleSearch}
          sources={uniqueSources}
          resultCount={filteredNews.length}
          totalCount={news.length}
        />
        {filteredNews.length === 0 ? (
          <div className="news-container">
            <div
              style={{ textAlign: "center", padding: "50px", color: "white" }}
            >
              <h2>Nincsenek hírek</h2>
              <p>
                Adj hozzá RSS feedeket a sidebar-ban vagy módosítsd a szűrési
                feltételeket!
              </p>
            </div>
          </div>
        ) : (
          <div className="news-container">
            {newsColumns.map((column, columnIndex) => (
              <div key={columnIndex} className="news-column">
                {column.map((newsItem, index) => (
                  <NewsCard
                    key={`${newsItem.source}-${columnIndex}-${index}`}
                    title={newsItem.title}
                    date={newsItem.pubDate}
                    author={newsItem.author}
                    description={newsItem.description}
                    link={newsItem.link}
                    source={newsItem.source}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}

export default App;
