// src/hooks/useRecipes.js
import { useState, useCallback, useRef } from 'react';
import { fetchRecipes, searchRecipes } from '../services/api';
import { useErrorHandler } from '../utils/errorhandling';

const ITEMS_PER_PAGE = 10;

export const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { error, handleError, clearError } = useErrorHandler();
  const searchTimeoutRef = useRef(null);

  const loadRecipes = useCallback(async (pageNumber = 0, shouldRefresh = false) => {
    try {
      setLoading(true);
      clearError();
      
      const skip = pageNumber * ITEMS_PER_PAGE;
      const response = searchQuery
        ? await searchRecipes(searchQuery)
        : await fetchRecipes(ITEMS_PER_PAGE, skip);

      if (!response.success) {
        throw new Error(response.error);
      }

      const newRecipes = response.data.recipes;
      setHasMore(newRecipes.length === ITEMS_PER_PAGE);

      if (shouldRefresh) {
        setRecipes(newRecipes);
      } else {
        setRecipes(prev => [...prev, ...newRecipes]);
      }
    } catch (err) {
      handleError(err, { page: pageNumber, searchQuery });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [searchQuery, handleError, clearError]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(0);
    loadRecipes(0, true);
  }, [loadRecipes]);

  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore && !searchQuery) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadRecipes(nextPage);
    }
  }, [loading, hasMore, page, loadRecipes, searchQuery]);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    
    // Debounce search
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      setPage(0);
      loadRecipes(0, true);
    }, 500);
  }, [loadRecipes]);

  return {
    recipes,
    loading,
    refreshing,
    error,
    hasMore,
    searchQuery,
    handleRefresh,
    handleLoadMore,
    handleSearch,
    clearError,
  };
};