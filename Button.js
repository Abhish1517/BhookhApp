// src/components/Button.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

const Button = ({ title, onPress, loading, disabled, variant = 'primary' }) => (
  <TouchableOpacity
    style={[
      styles.button,
      variant === 'secondary' && styles.buttonSecondary,
      disabled && styles.buttonDisabled,
    ]}
    onPress={onPress}
    disabled={disabled || loading}
  >
    {loading ? (
      <ActivityIndicator color="#fff" />
    ) : (
      <Text style={[
        styles.buttonText,
        variant === 'secondary' && styles.buttonTextSecondary,
      ]}>
        {title}
      </Text>
    )}
  </TouchableOpacity>
);

const bstyles = StyleSheet.create({
  button: {
    backgroundColor: '#e11d48',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#e11d48',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextSecondary: {
    color: '#e11d48',
  },
});

// src/components/Input.js
const Input = ({ 
  placeholder, 
  value, 
  onChangeText, 
  secureTextEntry,
  autoCapitalize = 'none',
  error,
}) => (
  <View style={styles.inputContainer}>
    <TextInput
      style={[styles.input, error && styles.inputError]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      autoCapitalize={autoCapitalize}
      placeholderTextColor="#9ca3af"
    />
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

const istyles = StyleSheet.create({
  inputContainer: {
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f3f4f6',
    padding: 16,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  inputError: {
    borderColor: '#dc2626',
  },
  errorText: {
    color: '#dc2626',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});

// src/components/RecipeCard.js
const RecipeCard = React.memo(({ recipe }) => (
  <View style={styles.card}>
    <Image
      source={{ uri: recipe.image }}
      style={styles.image}
      resizeMode="cover"
    />
    <View style={styles.content}>
      <Text style={styles.title}>{recipe.name}</Text>
      <Text style={styles.cuisine}>{recipe.cuisine}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {recipe.description}
      </Text>
      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Prep Time</Text>
          <Text style={styles.detailValue}>{recipe.prepTimeMinutes} mins</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Calories</Text>
          <Text style={styles.detailValue}>{recipe.caloriesPerServing}</Text>
        </View>
      </View>
    </View>
  </View>
));

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    height: 200,
    width: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  cuisine: {
    fontSize: 14,
    color: '#e11d48',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 12,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1a1a1a',
  },
});