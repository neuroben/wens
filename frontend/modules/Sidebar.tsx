import { useState } from 'react';
import './Sidebar.css';
type Feed = { name: string; url: string };

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [feedName, setFeedName] = useState('');
  const [feedUrl, setFeedUrl] = useState('');
  const [feeds, setFeeds] = useState<Feed[]>([]);

  const handleAddFeed = () => {
    if (feedName && feedUrl) {
      setFeeds([...feeds, { name: feedName, url: feedUrl }]);
      setFeedName('');
      setFeedUrl('');
    }
  };

  return (
    <>
      <button className={`sidebar-toggle ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
        {
          // Hamburger icon
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="6" width="32" height="4" rx="2" fill="#646cff"/>
            <rect y="14" width="32" height="4" rx="2" fill="#646cff"/>
            <rect y="22" width="32" height="4" rx="2" fill="#646cff"/>
          </svg>
        }
        {open && <span>Close</span>}
      </button>
      <div className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-header">
        </div>
        <div className="sidebar-form">
          <input
            type="text"
            placeholder="Feed neve"
            value={feedName}
            onChange={e => setFeedName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Feed URL-je"
            value={feedUrl}
            onChange={e => setFeedUrl(e.target.value)}
          />
          <button className="add-feed-btn" onClick={handleAddFeed}>Add</button>
        </div>
        <div className="sidebar-list">
          <h3>Feedek</h3>
          <ul>
            {feeds.map((feed, idx) => (
              <li key={idx}>
                <span className="feed-name">{feed.name}</span>
                <span className="feed-url">{feed.url}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
