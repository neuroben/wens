import React, { useState } from 'react';
import { openLinkInNewTab, isValidClickButton, isMiddleMouseButton } from '../utils/linkUtils';

/**
 * Custom hook a NewsCard kattintás és hover kezeléséhez
 */
export const useNewsCardClick = (link?: string, imgLink?: string) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  const handleMouseEnter = () => {
    if (imgLink) {
      setIsHovered(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (imgLink) {
      // Minimális offset, majdnem pontosan az egér pozíciójánál
      setMousePosition({ 
        x: e.clientX + 2, 
        y: e.clientY + 2 
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const preventPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return {
    handleCardClick,
    handleMouseDown,
    handleMouseEnter,
    handleMouseMove,
    handleMouseLeave,
    preventPropagation,
    isHovered,
    mousePosition,
    hasImage: Boolean(imgLink),
  };
};
