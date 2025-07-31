import type { Feed } from '../types/NewsTypes';

/**
 * Feed history betöltése localStorage-ból
 */
export const loadFeedHistory = (): Feed[] => {
  try {
    const saved = localStorage.getItem("feedHistory");
    if (saved) {
      return JSON.parse(saved);
    }
    return [];
  } catch (error) {
    console.error("Error loading feed history:", error);
    return [];
  }
};

/**
 * Feed history mentése localStorage-ba
 */
export const saveFeedHistory = (history: Feed[]): void => {
  try {
    localStorage.setItem("feedHistory", JSON.stringify(history));
  } catch (error) {
    console.error("Error saving feed history:", error);
  }
};

/**
 * Feed hozzáadása a történethez (vagy frissítése ha már benne van)
 */
export const addToHistory = (feed: Feed, currentHistory: Feed[]): Feed[] => {
  let newHistory = [...currentHistory];

  // Eltávolítjuk ha már benne van (név VAGY URL alapján)
  newHistory = newHistory.filter(
    (f) => !(f.name === feed.name || f.url === feed.url)
  );

  // Hozzáadjuk az elejére (így mindig friss lesz)
  newHistory.unshift(feed);

  // Limitáljuk 20 elemre
  if (newHistory.length > 20) {
    newHistory.pop();
  }

  return newHistory;
};

/**
 * Feed törlése a történetből
 */
export const removeFromHistory = (feedToRemove: Feed, currentHistory: Feed[]): Feed[] => {
  return currentHistory.filter(
    (feed) =>
      !(feed.name === feedToRemove.name && feed.url === feedToRemove.url)
  );
};
