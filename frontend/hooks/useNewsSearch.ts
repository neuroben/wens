import { useState, useMemo, useCallback } from 'react';
import type { NewsItem } from '../types/NewsTypes';
import { searchWithRelevanceScore, filterBySource, extractUniqueSources } from '../utils/searchUtils';

/**
 * Custom hook a keresés és szűrés kezeléséhez
 */
export const useNewsSearch = (news: NewsItem[]) => {
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);

  // Egyedi források kinyerése
  const uniqueSources = useMemo(() => extractUniqueSources(news), [news]);

  // Szűrés kezelése FTS5-szerű logikával
  const handleSearch = useCallback((searchTerm: string, selectedSource: string) => {
    let filtered = news;

    // Forrás szerinti szűrés
    filtered = filterBySource(filtered, selectedSource);

    // FTS5-szerű keresés
    filtered = searchWithRelevanceScore(filtered, searchTerm);

    setFilteredNews(filtered);
  }, [news]);

  // Kezdeti állapot beállítása
  const initializeFiltered = useCallback(() => {
    setFilteredNews(news);
  }, [news]);

  return {
    filteredNews,
    uniqueSources,
    handleSearch,
    initializeFiltered,
  };
};
