import { useCallback, useMemo } from 'react';

interface UsePaginationProps {
  total: number;
  limit: number;
  currentOffset: number;
  onPageChange: (offset: number) => void;
}

interface UsePaginationReturn {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  pageNumbers: number[];
  goToPage: (page: number) => void;
  goToNextPage: () => void;
  goToPrevPage: () => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
}

export const usePagination = ({
  total,
  limit,
  currentOffset,
  onPageChange,
}: UsePaginationProps): UsePaginationReturn => {
  const currentPage = Math.floor(currentOffset / limit) + 1;
  const totalPages = Math.ceil(total / limit);

  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        const newOffset = (page - 1) * limit;
        onPageChange(newOffset);
      }
    },
    [totalPages, limit, onPageChange]
  );

  const goToNextPage = useCallback(() => {
    if (hasNextPage) {
      goToPage(currentPage + 1);
    }
  }, [hasNextPage, currentPage, goToPage]);

  const goToPrevPage = useCallback(() => {
    if (hasPrevPage) {
      goToPage(currentPage - 1);
    }
  }, [hasPrevPage, currentPage, goToPage]);

  const goToFirstPage = useCallback(() => {
    goToPage(1);
  }, [goToPage]);

  const goToLastPage = useCallback(() => {
    goToPage(totalPages);
  }, [totalPages, goToPage]);

  const pageNumbers = useMemo(() => {
    const maxVisiblePages = 10;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const pages: number[] = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }, [currentPage, totalPages]);

  return {
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
  };
};
