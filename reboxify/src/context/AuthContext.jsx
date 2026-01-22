import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';
import storageService from '../services/storageService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize storage and load current user on mount
  useEffect(() => {
    storageService.init();
    const user = authService.getCurrentUser();
    setCurrentUser(user);
    setLoading(false);
  }, []);

  // Sync user data across tabs/windows
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'reboxify_currentUser') {
        const user = authService.getCurrentUser();
        setCurrentUser(user);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  /**
   * Register new user
   */
  const register = (name, email, password) => {
    const result = authService.register(name, email, password);
    return result;
  };

  /**
   * Login user
   */
  const login = (email, password) => {
    const result = authService.login(email, password);
    
    if (result.success && result.user) {
      setCurrentUser(result.user);
    }
    
    return result;
  };

  /**
   * Logout user
   */
  const logout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  /**
   * Update user wallet
   */
  const updateUserWallet = (amount) => {
    if (!currentUser) return;

    const result = authService.updateWallet(currentUser.id, amount);
    
    if (result.success) {
      setCurrentUser(prev => ({
        ...prev,
        wallet: result.wallet
      }));
    }
  };

  /**
   * Refresh current user data from storage
   */
  const refreshUser = () => {
    const user = authService.getCurrentUser();
    setCurrentUser(user);
  };

  /**
   * Update user profile
   */
  const updateProfile = (updates) => {
    if (!currentUser) return { success: false, message: 'No user logged in' };

    const result = authService.updateUser(currentUser.id, updates);
    
    if (result.success && result.user) {
      setCurrentUser(result.user);
    }
    
    return result;
  };

  /**
   * Check if user has sufficient balance
   */
  const hasSufficientBalance = (amount) => {
    if (!currentUser) return false;
    return currentUser.wallet >= amount;
  };

  const value = {
    currentUser,
    loading,
    register,
    login,
    logout,
    updateUserWallet,
    refreshUser,
    updateProfile,
    hasSufficientBalance,
    isAuthenticated: !!currentUser,
    isAdmin: currentUser?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export default AuthContext;