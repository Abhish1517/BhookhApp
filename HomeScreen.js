// src/screens/HomeScreen.js
import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { fetchRecipes } from '../services/api';
import RecipeCard from '../components/RecipeCard';
import Button from '../components/Button';

const ITEMS_PER_PAGE = 10;

const HomeScreen = () => {
  const { user, logout } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const loadRecipes = useCallback(async (pageNumber = 0, shouldRefresh = false) => {
    try {
      setError('');
      const skip = pageNumber * ITEMS_PER_PAGE;
      
      const response = await fetchRecipes(ITEMS_PER_PAGE, skip);
      
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
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadRecipes();
  }, [loadRecipes]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(0);
    loadRecipes(0, true);
  }, [loadRecipes]);

  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadRecipes(nextPage);
    }
  }, [loading, hasMore, page, loadRecipes]);

  const renderHeader = () => (
    <View style={styles.header}>
      <View>
        <Text style={styles.greeting}>Hello,</Text>
        <Text style={styles.name}>{user.name}</Text>
      </View>
      <Button
        title="Logout"
        onPress={logout}
        variant="secondary"
      />
    </View>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#e11d48" />
      </View>
    );
  };

  if (loading && !recipes.length) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#e11d48" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#e11d48']}
            tintColor="#e11d48"
          />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
      
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Button
            title="Try Again"
            onPress={handleRefresh}
            variant="secondary"
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  list: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 16,
    color: '#6b7280',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  errorContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  errorText: {
    color: '#dc2626',
    textAlign: 'center',
    marginBottom: 12,
  },
});

export default HomeScreen;