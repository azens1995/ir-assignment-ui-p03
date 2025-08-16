import React from 'react';
import { SearchResponse } from '../types';
import { usePagination } from '../hooks';
import PublicationCard from './PublicationCard';
import './SearchResults.css';

interface SearchResultsProps {
  searchResponse: SearchResponse | null;
  isLoading: boolean;
  onPageChange: (offset: number) => void;
  currentOffset: number;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  searchResponse,
  isLoading,
  onPageChange,
  currentOffset,
}) => {
  // Initialize pagination with default values
  const paginationData = searchResponse ? {
    total: searchResponse.total,
    limit: searchResponse.limit,
    currentOffset,
    onPageChange,
  } : {
    total: 0,
    limit: 20,
    currentOffset: 0,
    onPageChange,
  };

  const {
    currentPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
    pageNumbers,
    goToPage,
    goToNextPage,
    goToPrevPage,
    goToFirstPage,
    goToLastPage,
  } = usePagination(paginationData);

  if (isLoading) {
    return (
      <div className='search-results'>
        <div className='loading-container'>
          <div className='loading-spinner'></div>
          <p>Searching publications...</p>
        </div>
      </div>
    );
  }

  if (!searchResponse) {
    return null;
  }

  const { publications, total, limit, search_metadata } = searchResponse;

  const renderPagination = () => {
    if (total <= limit) return null;

    const pages = [];

    // Previous button
    if (hasPrevPage) {
      pages.push(
        <button
          key='prev'
          onClick={goToPrevPage}
          className='pagination-button'
        >
          Previous
        </button>
      );
    }

    // First page
    if (pageNumbers[0] > 1) {
      pages.push(
        <button
          key='1'
          onClick={goToFirstPage}
          className='pagination-button'
        >
          1
        </button>
      );
      if (pageNumbers[0] > 2) {
        pages.push(
          <span key='ellipsis1' className='pagination-ellipsis'>
            ...
          </span>
        );
      }
    }

    // Page numbers
    pageNumbers.forEach((pageNum) => {
      pages.push(
        <button
          key={pageNum}
          onClick={() => goToPage(pageNum)}
          className={`pagination-button ${pageNum === currentPage ? 'active' : ''}`}
        >
          {pageNum}
        </button>
      );
    });

    // Last page
    if (pageNumbers[pageNumbers.length - 1] < totalPages) {
      if (pageNumbers[pageNumbers.length - 1] < totalPages - 1) {
        pages.push(
          <span key='ellipsis2' className='pagination-ellipsis'>
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={totalPages}
          onClick={goToLastPage}
          className='pagination-button'
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    if (hasNextPage) {
      pages.push(
        <button
          key='next'
          onClick={goToNextPage}
          className='pagination-button'
        >
          Next
        </button>
      );
    }

    return pages;
  };

  return (
    <div className='search-results'>
      <div className='results-header'>
        <div className='results-info'>
          <p>
            About {search_metadata.total_results.toLocaleString()} results (
            {search_metadata.search_time_ms}ms)
          </p>
        </div>
      </div>

      <div className='results-list'>
        {publications.map((publication) => (
          <PublicationCard key={publication.id} publication={publication} />
        ))}
      </div>

      {total > 0 && <div className='pagination'>{renderPagination()}</div>}

      {publications.length === 0 && (
        <div className='no-results'>
          <p>No publications found for your search.</p>
          <p>Try different keywords or check your spelling.</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
