import { STORAGE_KEYS } from "../utils/constants";
import { initialBoxes } from "../data/initialBoxes";

class StorageService {
  get(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(
        `Error getting data from localStorage for key: ${key}`,
        error,
      );
      return null;
    }
  }

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(
        `Error setting data to localStorage for key: ${key}`,
        error,
      );
      return false;
    }
  }

  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(
        `Error removing data from localStorage for key: ${key}`,
        error,
      );
      return false;
    }
  }

  clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error("Error clearing localStorage", error);
      return false;
    }
  }

  init() {
    if (!this.get(STORAGE_KEYS.USERS)) {
      this.set(STORAGE_KEYS.USERS, []);
    }
    if (!this.get(STORAGE_KEYS.BOXES)) {
      this.set(STORAGE_KEYS.BOXES, initialBoxes);
    }
    if (!this.get(STORAGE_KEYS.RENTALS)) {
      this.set(STORAGE_KEYS.RENTALS, []);
    }
    if (!this.get(STORAGE_KEYS.TRANSACTIONS)) {
      this.set(STORAGE_KEYS.TRANSACTIONS, []);
    }
  }

  reset() {
    this.set(STORAGE_KEYS.USERS, []);
    this.set(STORAGE_KEYS.BOXES, initialBoxes);
    this.set(STORAGE_KEYS.RENTALS, []);
    this.set(STORAGE_KEYS.TRANSACTIONS, []);
    this.remove(STORAGE_KEYS.CURRENT_USER);
  }
}

export default new StorageService();
