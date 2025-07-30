import { useState, useEffect } from "react";
import "./Sidebar.css";

type Feed = { name: string; url: string };

interface SidebarProps {
  onFeedsUpdate?: () => void;
}

const Sidebar = ({ onFeedsUpdate }: SidebarProps) => {
  const [open, setOpen] = useState(false);
  const [feedName, setFeedName] = useState("");
  const [feedUrl, setFeedUrl] = useState("");
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [feedHistory, setFeedHistory] = useState<Feed[]>([]);
  const [loading, setLoading] = useState(false);

  const API_BASE = "http://127.0.0.1:8000";

  // Feed history betöltése localStorage-ból
  const loadFeedHistory = () => {
    try {
      const saved = localStorage.getItem("feedHistory");
      if (saved) {
        const history = JSON.parse(saved);
        setFeedHistory(history);
      }
    } catch (error) {
      console.error("Error loading feed history:", error);
    }
  };

  // Feed history mentése localStorage-ba
  const saveFeedHistory = (history: Feed[]) => {
    try {
      localStorage.setItem("feedHistory", JSON.stringify(history));
      setFeedHistory(history);
    } catch (error) {
      console.error("Error saving feed history:", error);
    }
  };

  // Feed hozzáadása a történethez (vagy frissítése ha már benne van)
  const addToHistory = (feed: Feed) => {
    let currentHistory = [...feedHistory];

    // Eltávolítjuk ha már benne van (név VAGY URL alapján)
    currentHistory = currentHistory.filter(
      (f) => !(f.name === feed.name || f.url === feed.url)
    );

    // Hozzáadjuk az elejére (így mindig friss lesz)
    currentHistory.unshift(feed);

    // Limitáljuk 20 elemre
    if (currentHistory.length > 20) {
      currentHistory.pop();
    }

    saveFeedHistory(currentHistory);
  };

  // Feedek betöltése
  const loadFeeds = async () => {
    try {
      const response = await fetch(`${API_BASE}/feeds`);
      if (response.ok) {
        const feedsData = await response.json();
        const feedsArray = Object.entries(feedsData).map(([name, url]) => ({
          name,
          url: url as string,
        }));
        setFeeds(feedsArray);
      }
    } catch (error) {
      console.error("Error loading feeds:", error);
    }
  };

  useEffect(() => {
    loadFeeds();
    loadFeedHistory();
  }, []);

  const handleAddFeed = async () => {
    if (feedName && feedUrl) {
      setLoading(true);
      try {
        const newFeed = { name: feedName, url: feedUrl };

        const response = await fetch(`${API_BASE}/feeds`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newFeed),
        });

        if (response.ok) {
          // Feed hozzáadása a történethez
          addToHistory(newFeed);

          setFeedName("");
          setFeedUrl("");
          await loadFeeds();

          if (onFeedsUpdate) {
            onFeedsUpdate();
          }
        } else {
          console.error("Failed to add feed");
        }
      } catch (error) {
        console.error("Error adding feed:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRemoveFeed = async (feedName: string) => {
    setLoading(true);
    try {
      // Megkeressük a törlendő feedet, hogy hozzáadhassuk a történethez
      const feedToRemove = feeds.find((f) => f.name === feedName);

      const response = await fetch(
        `${API_BASE}/feeds/${encodeURIComponent(feedName)}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Ha sikerült törölni, hozzáadjuk a történethez
        if (feedToRemove) {
          addToHistory(feedToRemove);
        }

        await loadFeeds();

        if (onFeedsUpdate) {
          onFeedsUpdate();
        }
      } else {
        console.error("Failed to remove feed");
      }
    } catch (error) {
      console.error("Error removing feed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Feed visszaállítása a történetből
  const handleRestoreFromHistory = async (feed: Feed) => {
    // Ellenőrizzük, hogy nincs-e már hozzáadva
    const feedExists = feeds.some(
      (f) => f.name === feed.name || f.url === feed.url
    );

    if (feedExists) {
      alert("Ez a feed már hozzá van adva!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/feeds`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feed),
      });

      if (response.ok) {
        await loadFeeds();

        if (onFeedsUpdate) {
          onFeedsUpdate();
        }
      } else {
        console.error("Failed to restore feed");
      }
    } catch (error) {
      console.error("Error restoring feed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Feed törlése a történetből
  const handleRemoveFromHistory = (feedToRemove: Feed) => {
    const updatedHistory = feedHistory.filter(
      (feed) =>
        !(feed.name === feedToRemove.name && feed.url === feedToRemove.url)
    );
    saveFeedHistory(updatedHistory);
  };

  return (
    <>
      <button
        className={`sidebar-toggle ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
      >
        {
          // Hamburger icon
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect y="6" width="32" height="4" rx="1" fill="#ffffffff" />
            <rect y="14" width="32" height="4" rx="1" fill="#ffffffff" />
            <rect y="22" width="32" height="4" rx="1" fill="#ffffffff" />
          </svg>
        }
        {open && <span className="close-text">Close</span>}
      </button>
      <div className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-header"></div>
        <div className="sidebar-form">
          <input
            type="text"
            placeholder="Feed neve"
            value={feedName}
            onChange={(e) => setFeedName(e.target.value)}
            disabled={loading}
          />
          <input
            type="text"
            placeholder="Feed URL-je"
            value={feedUrl}
            onChange={(e) => setFeedUrl(e.target.value)}
            disabled={loading}
          />
          <button
            className="add-feed-btn"
            onClick={handleAddFeed}
            disabled={loading || !feedName || !feedUrl}
          >
            {loading ? "Hozzáadás..." : "Hozzáad"}
          </button>
        </div>
        <div className="sidebar-list">
          <h3>Aktív Feedek</h3>
          <ul>
            {feeds.map((feed, idx) => (
              <li key={idx}>
                <div className="feed-info">
                  <span className="feed-name">{feed.name}</span>
                  <span className="feed-url">{feed.url}</span>
                </div>
                <button
                  className="remove-feed-btn"
                  onClick={() => handleRemoveFeed(feed.name)}
                  disabled={loading}
                >
                  ✕
                </button>
              </li>
            ))}
            {feeds.length === 0 && (
              <li className="no-feeds">Nincsenek aktív feedek</li>
            )}
          </ul>
        </div>

        {feedHistory.filter(
          (historyFeed) =>
            !feeds.some(
              (activeFeed) =>
                activeFeed.name === historyFeed.name ||
                activeFeed.url === historyFeed.url
            )
        ).length > 0 && (
          <div className="sidebar-list">
            <h3>
              Inaktív Feedek (
              {
                feedHistory.filter(
                  (historyFeed) =>
                    !feeds.some(
                      (activeFeed) =>
                        activeFeed.name === historyFeed.name ||
                        activeFeed.url === historyFeed.url
                    )
                ).length
              }
              )
            </h3>
            <ul className="feed-history">
              {feedHistory
                .filter(
                  (historyFeed) =>
                    !feeds.some(
                      (activeFeed) =>
                        activeFeed.name === historyFeed.name ||
                        activeFeed.url === historyFeed.url
                    )
                )
                .map((feed, idx) => (
                  <li key={idx}>
                    <div className="feed-info">
                      <span className="feed-name">{feed.name}</span>
                      <span className="feed-url">{feed.url}</span>
                    </div>
                    <div className="feed-actions">
                      <button
                        className="restore-feed-btn"
                        onClick={() => handleRestoreFromHistory(feed)}
                        disabled={loading}
                        title="Visszaállítás"
                      >
                        ↻
                      </button>
                      <button
                        className="remove-history-btn"
                        onClick={() => handleRemoveFromHistory(feed)}
                        disabled={loading}
                        title="Törlés a történetből"
                      >
                        🗑
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
