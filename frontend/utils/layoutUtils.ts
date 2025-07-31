import type { NewsItem } from '../types/NewsTypes';

/**
 * Hírek oszlopokba rendezése masonry layouthoz
 */
export const organizeIntoColumns = (newsItems: NewsItem[], columnCount: number): NewsItem[][] => {
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

/**
 * Oszlopszám meghatározása képernyő szélesség alapján
 */
export const getColumnCount = (): number => {
  if (typeof window === "undefined") return 3;
  const width = window.innerWidth;
  if (width < 640) return 1;
  if (width < 1000) return 2;
  if (width < 1400) return 3;
  return 4;
};
