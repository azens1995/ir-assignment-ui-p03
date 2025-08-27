import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import TabHeader from './components/TabHeader';
import DocumentClassification from './components/DocumentClassification';
import { useSearch } from './hooks';
import { TabType } from './types';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('search');

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

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  return (
    <div className='App'>
      <header className='app-header'>
        <div className='header-content'>
          <h1 className='app-title'>
            Information Retrieval Assignment by Eklak Dangaura
          </h1>
        </div>
      </header>

      <TabHeader activeTab={activeTab} onTabChange={handleTabChange} />

      <main className='app-main'>
        <div className='content-container'>
          {activeTab === 'search' && (
            <>
              <div className='search-header'>
                <h2>Search Engine</h2>
                <p>
                  Search academic publications of Coventry University's School
                  of Economics, Finance and Accounting
                </p>
              </div>

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
            </>
          )}

          {activeTab === 'classification' && <DocumentClassification />}
        </div>
      </main>

      <footer className='app-footer'>
        <p>
          &copy; {new Date().getFullYear()} Eklak Dangaura. Academic publication
          search engine and document classification.
        </p>
      </footer>
    </div>
  );
}

export default App;
