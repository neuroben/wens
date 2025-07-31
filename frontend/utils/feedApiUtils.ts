import type { Feed } from '../types/NewsTypes';

const API_BASE = "http://127.0.0.1:8000";

/**
 * Feedek betöltése a backend-ről
 */
export const fetchFeeds = async (): Promise<Feed[]> => {
  const response = await fetch(`${API_BASE}/feeds`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch feeds: ${response.status}`);
  }

  const feedsData = await response.json();
  return Object.entries(feedsData).map(([name, url]) => ({
    name,
    url: url as string,
  }));
};

/**
 * Feed hozzáadása a backend-en
 */
export const addFeed = async (feed: Feed): Promise<void> => {
  const response = await fetch(`${API_BASE}/feeds`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(feed),
  });

  if (!response.ok) {
    throw new Error(`Failed to add feed: ${response.status}`);
  }
};

/**
 * Feed törlése a backend-ről
 */
export const deleteFeed = async (feedName: string): Promise<void> => {
  const response = await fetch(
    `${API_BASE}/feeds/${encodeURIComponent(feedName)}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to delete feed: ${response.status}`);
  }
};
