import React from 'react';
import { openLinkInNewTab, isValidClickButton, isMiddleMouseButton } from '../utils/linkUtils';

/**
 * Custom hook a NewsCard kattintás kezeléséhez
 */
export const useNewsCardClick = (link?: string) => {
  const handleCardClick = (e: React.MouseEvent) => {
    if (!link) return;
    
    if (isValidClickButton(e.button)) {
      openLinkInNewTab(link);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!link) return;
    
    if (isMiddleMouseButton(e.button)) {
      e.preventDefault();
      openLinkInNewTab(link);
    }
  };

  const preventPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return {
    handleCardClick,
    handleMouseDown,
    preventPropagation,
  };
};
