// src/utils/errorHandling.js
import { STRINGS } from '../constants/strings';

export class AppError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

export const ERROR_CODES = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  AUTH_ERROR: 'AUTH_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  API_ERROR: 'API_ERROR',
};

export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error
    const status = error.response.status;
    switch (status) {
      case 401:
        return new AppError(STRINGS.invalidCredentials, ERROR_CODES.AUTH_ERROR);
      case 404:
        return new AppError('Resource not found', ERROR_CODES.API_ERROR);
      case 500:
        return new AppError(STRINGS.generalError, ERROR_CODES.API_ERROR);
      default:
        return new AppError(
          error.response.data?.message || STRINGS.generalError,
          ERROR_CODES.API_ERROR
        );
    }
  } else if (error.request) {
    // Request made but no response
    if (error.code === 'ECONNABORTED') {
      return new AppError(STRINGS.timeoutError, ERROR_CODES.TIMEOUT_ERROR);
    }
    return new AppError(STRINGS.networkError, ERROR_CODES.NETWORK_ERROR);
  }
  // Something else happened
  return new AppError(STRINGS.generalError, ERROR_CODES.API_ERROR);
};

export const logError = (error, context = {}) => {
  // In production, you would send this to your error tracking service
  console.error('Error:', {
    message: error.message,
    code: error.code,
    stack: error.stack,
    context,
  });
};

// Hook for error handling
import { useState, useCallback } from 'react';

export const useErrorHandler = () => {
  const [error, setError] = useState(null);

  const handleError = useCallback((error, context = {}) => {
    const appError = error instanceof AppError 
      ? error 
      : handleApiError(error);
    
    logError(appError, context);
    setError(appError);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    handleError,
    clearError,
  };
};