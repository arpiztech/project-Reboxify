/**
 * Get item from localStorage
 */
export const getItem = (key, defaultValue = null) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error getting localStorage key "${key}":`, error);
    return defaultValue;
  }
};

/**
 * Set item in localStorage
 */
export const setItem = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error);
    return false;
  }
};

/**
 * Remove item from localStorage
 */
export const removeItem = (key) => {
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error);
    return false;
  }
};

/**
 * Clear all localStorage
 */
export const clearAll = () => {
  try {
    window.localStorage.clear();
    return true;
  } catch (error) {
    console.error("Error clearing localStorage:", error);
    return false;
  }
};

/**
 * Get all localStorage keys
 */
export const getAllKeys = () => {
  try {
    return Object.keys(window.localStorage);
  } catch (error) {
    console.error("Error getting localStorage keys:", error);
    return [];
  }
};

/**
 * Check if key exists
 */
export const hasKey = (key) => {
  return window.localStorage.getItem(key) !== null;
};

/**
 * Get localStorage size (approximate)
 */
export const getStorageSize = () => {
  let total = 0;
  for (let key in window.localStorage) {
    if (window.localStorage.hasOwnProperty(key)) {
      total += window.localStorage[key].length + key.length;
    }
  }
  return (total / 1024).toFixed(2) + " KB";
};
