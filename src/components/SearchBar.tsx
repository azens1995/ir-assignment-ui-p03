import React, { useState, KeyboardEvent, useEffect, useRef } from 'react';
import { useDebounce, useLocalStorage, useClickOutside } from '../hooks';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  isLoading = false,
}) => {
  const [query, setQuery] = useState('');
  const [searchHistory, setSearchHistory] = useLocalStorage<string[]>(
    'searchHistory',
    []
  );
  const [showHistory, setShowHistory] = useState(false);
  const [selectedHistoryIndex, setSelectedHistoryIndex] = useState(-1);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce the query to avoid too many API calls
  const debouncedQuery = useDebounce(query, 300);

  // Close history dropdown when clicking outside
  useClickOutside(searchContainerRef, () => {
    setShowHistory(false);
    setSelectedHistoryIndex(-1);
  });

  // Auto-search when debounced query changes (optional feature)
  useEffect(() => {
    if (debouncedQuery && debouncedQuery.length > 2) {
      // Uncomment the line below to enable auto-search
      // onSearch(debouncedQuery);
    }
  }, [debouncedQuery, onSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      addToSearchHistory(query.trim());
      setShowHistory(false);
      setSelectedHistoryIndex(-1);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      onSearch(query.trim());
      addToSearchHistory(query.trim());
      setShowHistory(false);
      setSelectedHistoryIndex(-1);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!showHistory || searchHistory.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedHistoryIndex((prev) =>
          prev < searchHistory.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedHistoryIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Escape':
        setShowHistory(false);
        setSelectedHistoryIndex(-1);
        inputRef.current?.blur();
        break;
      case 'Tab':
        setShowHistory(false);
        setSelectedHistoryIndex(-1);
        break;
    }
  };

  const addToSearchHistory = (searchTerm: string) => {
    setSearchHistory((prev) => {
      const filtered = prev.filter((item) => item !== searchTerm);
      return [searchTerm, ...filtered].slice(0, 10); // Keep only last 10 searches
    });
  };

  const handleHistoryItemClick = (historyItem: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setQuery(historyItem);
    onSearch(historyItem);
    addToSearchHistory(historyItem);
    setShowHistory(false);
    setSelectedHistoryIndex(-1);

    // Focus back to input after a short delay to ensure the click event is fully processed
    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  };

  const clearHistory = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSearchHistory([]);
    setSelectedHistoryIndex(-1);
  };

  const handleInputFocus = () => {
    if (searchHistory.length > 0) {
      setShowHistory(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSelectedHistoryIndex(-1);
    if (e.target.value && searchHistory.length > 0) {
      setShowHistory(true);
    } else {
      setShowHistory(false);
    }
  };

  const handleClearButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuery('');
    setSelectedHistoryIndex(-1);
    setShowHistory(false);
    inputRef.current?.focus();
  };

  return (
    <div className='search-container' ref={searchContainerRef}>
      <form onSubmit={handleSubmit} className='search-form'>
        <div className='search-box'>
          <div className='search-icon'>
            <svg viewBox='0 0 24 24' fill='currentColor'>
              <path d='M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' />
            </svg>
          </div>
          <input
            ref={inputRef}
            type='text'
            value={query}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            onKeyDown={handleKeyDown}
            onFocus={handleInputFocus}
            placeholder='Search publications...'
            className='search-input'
            disabled={isLoading}
            autoComplete='off'
            spellCheck='false'
          />
          {query && (
            <button
              type='button'
              onClick={handleClearButtonClick}
              className='clear-button'
              disabled={isLoading}
              aria-label='Clear search'
            >
              <svg viewBox='0 0 24 24' fill='currentColor'>
                <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' />
              </svg>
            </button>
          )}
        </div>

        {/* Search History Dropdown */}
        {showHistory && searchHistory.length > 0 && (
          <div className='search-history'>
            <div className='history-header'>
              <span>Recent searches</span>
              <button
                type='button'
                onClick={clearHistory}
                className='clear-history-btn'
              >
                Clear
              </button>
            </div>
            <div className='history-list'>
              {searchHistory.map((item, index) => (
                <button
                  key={index}
                  type='button'
                  onClick={(e) => handleHistoryItemClick(item, e)}
                  className={`history-item ${
                    index === selectedHistoryIndex ? 'selected' : ''
                  }`}
                  onMouseEnter={() => setSelectedHistoryIndex(index)}
                >
                  <svg
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='history-icon'
                  >
                    <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' />
                  </svg>
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          type='submit'
          className='search-button'
          disabled={isLoading || !query.trim()}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
