import React, { createContext, useState, useContext, useEffect } from 'react';
import boxService from '../services/boxService';
import rentalService from '../services/rentalService';
import storageService from '../services/storageService';
import { STORAGE_KEYS } from '../utils/constants';
import { useAuth } from './AuthContext';

const BoxContext = createContext();

export const BoxProvider = ({ children }) => {
  const [boxes, setBoxes] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  // Reload data when user changes
  useEffect(() => {
    if (currentUser) {
      loadData();
    }
  }, [currentUser]);

  // Sync data across tabs/windows
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key && e.key.startsWith('reboxify_')) {
        loadData();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  /**
   * Load all data from storage
   */
  const loadData = () => {
    setLoading(true);
    try {
      const loadedBoxes = boxService.getAllBoxes();
      const loadedRentals = rentalService.getAllRentals();
      const loadedTransactions = storageService.get(STORAGE_KEYS.TRANSACTIONS) || [];
      
      setBoxes(loadedBoxes);
      setRentals(loadedRentals);
      setTransactions(loadedTransactions);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Rent a box
   */
  const rentBox = (boxId) => {
    if (!currentUser) {
      return { success: false, message: 'Please login first' };
    }

    const result = rentalService.rentBox(currentUser.id, boxId);
    
    if (result.success) {
      loadData();
    }
    
    return result;
  };

  /**
   * Return a box
   */
  const returnBox = (rentalId, condition) => {
    if (!currentUser) {
      return { success: false, message: 'Please login first' };
    }

    const result = rentalService.returnBox(rentalId, condition);
    
    if (result.success) {
      loadData();
    }
    
    return result;
  };

  /**
   * Get user's rentals
   */
  const getUserRentals = () => {
    if (!currentUser) return [];
    return rentalService.getUserRentals(currentUser.id);
  };

  /**
   * Get active rentals
   */
  const getActiveRentals = () => {
    if (!currentUser) return [];
    return rentalService.getActiveRentals(currentUser.id);
  };

  /**
   * Get rental history
   */
  const getRentalHistory = () => {
    if (!currentUser) return [];
    return rentalService.getRentalHistory(currentUser.id);
  };

  /**
   * Get user's transactions
   */
  const getUserTransactions = () => {
    if (!currentUser) return [];
    return transactions.filter(t => t.userId === currentUser.id);
  };

  /**
   * Get available boxes
   */
  const getAvailableBoxes = () => {
    return boxService.getAvailableBoxes();
  };

  /**
   * Search boxes
   */
  const searchBoxes = (searchTerm) => {
    return boxService.searchBoxes(searchTerm);
  };

  /**
   * Get boxes by category
   */
  const getBoxesByCategory = (category) => {
    return boxService.getBoxesByCategory(category);
  };

  /**
   * Get box by ID
   */
  const getBoxById = (boxId) => {
    return boxService.getBoxById(boxId);
  };

  /**
   * Get rental by ID
   */
  const getRentalById = (rentalId) => {
    return rentalService.getRentalById(rentalId);
  };

  const value = {
    boxes,
    rentals,
    transactions,
    loading,
    rentBox,
    returnBox,
    getUserRentals,
    getActiveRentals,
    getRentalHistory,
    getUserTransactions,
    getAvailableBoxes,
    searchBoxes,
    getBoxesByCategory,
    getBoxById,
    getRentalById,
    refreshData: loadData
  };

  return (
    <BoxContext.Provider value={value}>
      {children}
    </BoxContext.Provider>
  );
};

export const useBoxes = () => {
  const context = useContext(BoxContext);
  if (!context) {
    throw new Error('useBoxes must be used within BoxProvider');
  }
  return context;
};

export default BoxContext;