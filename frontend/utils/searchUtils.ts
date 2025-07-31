import type { NewsItem } from '../types/NewsTypes';

/**
 * FTS5-szerű keresés implementáció relevancia pontszámmal
 */
export const searchWithRelevanceScore = (items: NewsItem[], searchTerm: string): NewsItem[] => {
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
