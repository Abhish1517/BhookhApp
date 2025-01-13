// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'https://dummyjson.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const fetchRecipes = async (limit = 10, skip = 0) => {
  try {
    const response = await api.get(`/recipes`, {
      params: {
        limit,
        skip,
      },
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch recipes. Please try again.',
    };
  }
};

export const searchRecipes = async (query) => {
  try {
    const response = await api.get(`/recipes/search`, {
      params: {
        q: query,
      },
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Error searching recipes:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to search recipes. Please try again.',
    };
  }
};