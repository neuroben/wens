import { useState, useEffect, useMemo } from 'react';
import type { NewsItem } from '../types/NewsTypes';
import { organizeIntoColumns, getColumnCount } from '../utils/layoutUtils';

/**
 * Custom hook a reszponzív oszlop layout kezeléséhez
 */
export const useResponsiveLayout = (newsItems: NewsItem[]) => {
  const [columnCount, setColumnCount] = useState(getColumnCount());

  useEffect(() => {
    const handleResize = () => {
      setColumnCount(getColumnCount());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const newsColumns = useMemo(
    () => organizeIntoColumns(newsItems, columnCount),
    [newsItems, columnCount]
  );

  return {
    newsColumns,
    columnCount,
  };
};
