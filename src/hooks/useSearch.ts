import { useState, useCallback } from 'react';
import { SearchResponse } from '../types';

interface UseSearchReturn {
  searchResponse: SearchResponse | null;
  isLoading: boolean;
  error: string | null;
  currentOffset: number;
  currentQuery: string;
  searchPublications: (query: string, offset?: number) => Promise<void>;
  resetSearch: () => void;
}

export const useSearch = (): UseSearchReturn => {
  const [searchResponse, setSearchResponse] = useState<SearchResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [currentQuery, setCurrentQuery] = useState('');

  const searchPublications = useCallback(async (query: string, offset: number = 0) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://api.irapi.workers.dev/api/publications/search?q=${encodeURIComponent(
          query
        )}&offset=${offset}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: SearchResponse = await response.json();
      setSearchResponse(data);
      setCurrentOffset(offset);
      setCurrentQuery(query);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      console.error('Error fetching publications:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetSearch = useCallback(() => {
    setSearchResponse(null);
    setError(null);
    setCurrentOffset(0);
    setCurrentQuery('');
  }, []);

  return {
    searchResponse,
    isLoading,
    error,
    currentOffset,
    currentQuery,
    searchPublications,
    resetSearch,
  };
};
