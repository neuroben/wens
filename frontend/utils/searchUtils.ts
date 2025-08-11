import type { NewsItem } from '../types/NewsTypes';

/**
 * Egyszerű gyors keresés
 */
export const searchWithRelevanceScore = (items: NewsItem[], searchTerm: string): NewsItem[] => {
  if (!searchTerm.trim()) return items;

  const query = searchTerm.toLowerCase().trim();
  
  return items.filter((item) => {
    const searchableText = [
      item.title || "",
      item.description || "",
      item.author || "",
      item.source || ""
    ].join(" ").toLowerCase();
    
    return searchableText.includes(query);
  });
};

/**
 * Szűrés forrás alapján
 */
export const filterBySource = (items: NewsItem[], selectedSource: string): NewsItem[] => {
  if (selectedSource === "Összes") {
    return items;
  }
  return items.filter((item) => item.source === selectedSource);
};

/**
 * Egyedi források kinyerése a hírekből
 */
export const extractUniqueSources = (news: NewsItem[]): string[] => {
  const sources = news
    .map((item) => item.source)
    .filter((source): source is string => Boolean(source))
    .filter((source, index, array) => array.indexOf(source) === index)
    .sort();
  return ["Összes", ...sources];
};
