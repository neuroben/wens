import { useState, useEffect, useCallback } from "react";
import "./SearchBox.css";

interface SearchBoxProps {
  onSearch?: (searchTerm: string, selectedSource: string) => void;
  placeholder?: string;
  sources?: string[];
  resultCount?: number;
  totalCount?: number;
}

const SearchBox = ({
  onSearch,
  placeholder = "Keresés...",
  sources = ["Összes"],
  resultCount,
  totalCount,
}: SearchBoxProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSource, setSelectedSource] = useState("Összes");

  // Debounced search - késleltetett keresés a teljesítmény optimalizálásához
  const debouncedSearch = useCallback(
    (() => {
      let timeoutId: number;
      return (term: string, source: string) => {
        clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
          if (onSearch) {
            onSearch(term, source);
          }
        }, 150); // 150ms késleltetés
      };
    })(),
    [onSearch]
  );

  // Dropdown bezárása kattintásra bárhová máshová
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      const dropdown = target.closest(".custom-dropdown");

      if (!dropdown) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm, selectedSource);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    debouncedSearch("", selectedSource);
  };

  const handleSourceSelect = (source: string) => {
    setSelectedSource(source);
    setIsDropdownOpen(false);
    debouncedSearch(searchTerm, source);
  };

  // Real-time keresés debounce-szal
  const handleSearchTermChange = (value: string) => {
    setSearchTerm(value);
    debouncedSearch(value, selectedSource);
  };

  return (
    <div className="search-box-container">
      <div className="search-box">
        <div className="search-input-container">
          <input
            type="text"
            className="search-input"
            value={searchTerm}
            onChange={(e) => handleSearchTermChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
          />
          {searchTerm && (
            <button className="clear-btn" onClick={handleClear}>
              ✕
            </button>
          )}
        </div>
        {resultCount !== undefined && totalCount !== undefined && (
          <div className="search-stats">
            {searchTerm || selectedSource !== "Összes"
              ? `${resultCount} / ${totalCount} hír`
              : `${totalCount} hír`}
          </div>
        )}
      </div>
      <div className="source-selector">
        <div
          className="custom-dropdown"
          onClick={(e) => {
            e.stopPropagation();
            setIsDropdownOpen(!isDropdownOpen);
          }}
        >
          <div className="dropdown-selected">
            {selectedSource}
            <span className="dropdown-arrow">{isDropdownOpen ? "▲" : "▼"}</span>
          </div>
          {isDropdownOpen && (
            <ul className="dropdown-options">
              {sources.map((source) => (
                <li
                  key={source}
                  className={`dropdown-option ${
                    selectedSource === source ? "selected" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSourceSelect(source);
                  }}
                >
                  {source}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
