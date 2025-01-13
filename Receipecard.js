// src/components/RecipeCard.js
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS } from '../constants/theme';

const RecipeCard = React.memo(({ recipe, onPress }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.95));
  
  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const animatedStyle = {
    opacity: fadeAnim,
    transform: [{ scale: scaleAnim }],
  };

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.98,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    onPress?.(recipe);
  };

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={handlePress}>
      <Animated.View style={[styles.card, animatedStyle]}>
        <Image
          source={{ uri: recipe.image }}
          style={styles.image}
          resizeMode="cover"
        />
        
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{recipe.name}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>★ {recipe.rating.toFixed(1)}</Text>
            </View>
          </View>

          <Text style={styles.cuisine}>{recipe.cuisine}</Text>
          
          <Text style={styles.description} numberOfLines={2}>
            {recipe.description}
          </Text>

          <View style={styles.metadata}>
            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>⏱️</Text>
              <Text style={styles.metaText}>
                {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min
              </Text>
            </View>

            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>🔥</Text>
              <Text style={styles.metaText}>
                {recipe.caloriesPerServing} cal
              </Text>
            </View>

            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>👥</Text>
              <Text style={styles.metaText}>
                {recipe.servings} serv
              </Text>
            </View>
          </View>

          <View style={styles.tags}>
            {recipe.tags.slice(0, 3).map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    marginBottom: SPACING.lg,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  image: {
    height: 200,
    width: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  content: {
    padding: SPACING.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  title: {
    flex: 1,
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text,
  },
  ratingContainer: {
    backgroundColor: COLORS.primaryLight + '20',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 8,
  },
  rating: {
    color: COLORS.primary,
    fontWeight: FONT_WEIGHTS.semibold,
  },
  cuisine: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    marginBottom: SPACING.sm,
  },
  description: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
    lineHeight: 20,
  },
  metadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaIcon: {
    fontSize: FONT_SIZES.md,
    marginRight: SPACING.xs,
  },
  metaText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
  },
  tag: {
    backgroundColor: COLORS.divider,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 16,
  },
  tagText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
  },
});

export default RecipeCard;