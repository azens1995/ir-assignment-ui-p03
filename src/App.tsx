import React from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import { useSearch } from './hooks';
import './App.css';

function App() {
  const {
    searchResponse,
    isLoading,
    error,
    currentOffset,
    currentQuery,
    searchPublications,
    resetSearch,
  } = useSearch();

  const handleSearch = (query: string) => {
    searchPublications(query, 0);
  };

  const handlePageChange = (offset: number) => {
    if (currentQuery) {
      searchPublications(currentQuery, offset);
    }
  };

  return (
    <div className='App'>
      <header className='app-header'>
        <div className='header-content'>
          <h1 className='app-title'>IR Search Engine</h1>
          <p className='app-subtitle'>
            Search academic publications of Coventry University's School of
            Economics, Finance and Accounting
          </p>
        </div>
      </header>

      <main className='app-main'>
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        {error && (
          <div className='error-message'>
            <p>Error: {error}</p>
            <button onClick={resetSearch} className='retry-button'>
              Try Again
            </button>
          </div>
        )}

        <SearchResults
          searchResponse={searchResponse}
          isLoading={isLoading}
          onPageChange={handlePageChange}
          currentOffset={currentOffset}
        />
      </main>

      <footer className='app-footer'>
        <p>&copy; 2024 Scholar Search. Academic publication search engine.</p>
      </footer>
    </div>
  );
}

export default App;
