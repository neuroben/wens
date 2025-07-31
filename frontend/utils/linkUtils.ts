/**
 * Nyitja meg a linket új lapon biztonságos módon
 */
export const openLinkInNewTab = (url: string): void => {
  if (url) {
    window.open(url, "_blank", "noopener,noreferrer");
  }
};

/**
 * Ellenőrzi, hogy a megadott gomb bal gomb vagy középső gomb-e
 */
export const isValidClickButton = (button: number): boolean => {
  return button === 0 || button === 1; // Bal gomb vagy középső gomb
};

/**
 * Ellenőrzi, hogy a megadott gomb középső gomb-e
 */
export const isMiddleMouseButton = (button: number): boolean => {
  return button === 1;
};
