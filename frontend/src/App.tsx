import { useState, useEffect, useMemo } from "react";
import NewsCard from "../modules/NewsCard";
import Sidebar from "../modules/Sidebar";
import SearchBox from "../modules/SearchBox";
import "./App.css";

interface NewsItem {
  title?: string;
  link?: string;
  pubDate?: string;
  pubTime?: string;
  pubDateTime?: string;
  author?: string;
  category?: string;
  description?: string;
  imgLink?: string;
  source?: string;
}

function App() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("http://127.0.0.1:8000/news");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newsData: NewsItem[] = await response.json();
      setNews(newsData);
      setFilteredNews(newsData); // Kezdetben minden hír látható
    } catch (err) {
      console.error("Error fetching news:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch news");
    } finally {
      setLoading(false);
    }
  };

  const handleFeedsUpdate = () => {
    fetchNews();
  };

  // Egyedi források kinyerése
  const uniqueSources = useMemo(() => {
    const sources = news
      .map((item) => item.source)
      .filter((source): source is string => Boolean(source))
      .filter((source, index, array) => array.indexOf(source) === index)
      .sort();
    return ["Összes", ...sources];
  }, [news]);

  // FTS5-szerű keresés implementáció
  const searchWithRelevanceScore = (items: NewsItem[], searchTerm: string) => {
    if (!searchTerm.trim()) return items;

    const query = searchTerm.toLowerCase().trim();
    const tokens = query.split(/\s+/).filter((token) => token.length > 0);

    const scoredItems = items.map((item) => {
      let score = 0;
      const title = (item.title || "").toLowerCase();
      const description = (item.description || "").toLowerCase();
      const author = (item.author || "").toLowerCase();
      const source = (item.source || "").toLowerCase();

      // Teljes kifejezés pontszámok (magasabb súly)
      if (title.includes(query)) score += 10;
      if (description.includes(query)) score += 5;
      if (author.includes(query)) score += 3;
      if (source.includes(query)) score += 2;

      // Token alapú pontszámok
      tokens.forEach((token) => {
        // Címben található token (legmagasabb súly)
        if (title.includes(token)) {
          score += title.startsWith(token) ? 8 : 4; // Kezdő pozíció bonus
        }

        // Leírásban található token
        if (description.includes(token)) {
          score += 2;
        }

        // Szerzőben található token
        if (author.includes(token)) {
          score += 3;
        }

        // Forrásban található token
        if (source.includes(token)) {
          score += 1;
        }

        // Fuzzy matching (részleges egyezés)
        if (token.length > 2) {
          if (title.includes(token.substring(0, token.length - 1))) score += 1;
          if (description.includes(token.substring(0, token.length - 1)))
            score += 0.5;
        }
      });

      return { item, score };
    });

    // Csak releváns elemek visszaadása (score > 0) relevancia szerint rendezve
    return scoredItems
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ item }) => item);
  };

  // Szűrés kezelése FTS5-szerű logikával
  const handleSearch = (searchTerm: string, selectedSource: string) => {
    let filtered = news;

    // Forrás szerinti szűrés
    if (selectedSource !== "Összes") {
      filtered = filtered.filter((item) => item.source === selectedSource);
    }

    // FTS5-szerű keresés
    filtered = searchWithRelevanceScore(filtered, searchTerm);

    setFilteredNews(filtered);
  };

  const organizeIntoColumns = (newsItems: NewsItem[], columnCount: number) => {
    const columns: NewsItem[][] = Array.from({ length: columnCount }, () => []);

    newsItems.forEach((item) => {
      const shortestColumnIndex = columns.reduce(
        (minIndex, column, currentIndex) => {
          return columns[minIndex].length <= column.length
            ? minIndex
            : currentIndex;
        },
        0
      );

      columns[shortestColumnIndex].push(item);
    });

    return columns;
  };

  const getColumnCount = () => {
    if (typeof window === "undefined") return 3;
    const width = window.innerWidth;
    if (width < 640) return 1;
    if (width < 1000) return 2;
    if (width < 1400) return 3;
    return 4;
  };

  const [columnCount, setColumnCount] = useState(getColumnCount());

  useEffect(() => {
    const handleResize = () => {
      setColumnCount(getColumnCount());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const newsColumns = useMemo(
    () => organizeIntoColumns(filteredNews, columnCount),
    [filteredNews, columnCount]
  );

  useEffect(() => {
    fetchNews();
  }, []);

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
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)"
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
