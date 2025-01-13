// src/context/AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(null);

// Mock users for authentication
const MOCK_USERS = [
  { username: 'john.doe', password: 'password123', name: 'John Doe' },
  { username: 'jane.smith', password: 'password456', name: 'Jane Smith' },
  { username: 'sam.wilson', password: 'password789', name: 'Sam Wilson' },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    // Check for stored user on mount
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    const foundUser = MOCK_USERS.find(
      u => u.username === username && u.password === password
    );

    if (foundUser) {
      const userData = {
        username: foundUser.username,
        name: foundUser.name,
      };
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return { success: true };
    }

    return { 
      success: false, 
      error: 'Invalid credentials. Please try again.' 
    };
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};