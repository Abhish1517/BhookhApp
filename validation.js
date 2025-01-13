// src/utils/validation.js
export const validateUsername = (username) => {
    if (!username) {
      return 'Username is required';
    }
    if (username.length < 3) {
      return 'Username must be at least 3 characters';
    }
    // Basic username format validation
    const usernameRegex = /^[a-zA-Z0-9._-]+$/;
    if (!usernameRegex.test(username)) {
      return 'Username can only contain letters, numbers, and .-_';
    }
    return '';
  };
  
  export const validatePassword = (password) => {
    if (!password) {
      return 'Password is required';
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters';
    }
    return '';
  };
  
  export const validateForm = (values) => {
    const errors = {};
    
    // Username validation
    const usernameError = validateUsername(values.username);
    if (usernameError) {
      errors.username = usernameError;
    }
    
    // Password validation
    const passwordError = validatePassword(values.password);
    if (passwordError) {
      errors.password = passwordError;
    }
    
    return errors;
  };