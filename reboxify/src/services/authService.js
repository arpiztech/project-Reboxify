import storageService from "./storageService";
import {
  STORAGE_KEYS,
  INITIAL_WALLET_BALANCE,
  USER_ROLES,
} from "../utils/constants";

class AuthService {
  register(name, email, password) {
    const users = storageService.get(STORAGE_KEYS.USERS) || [];

    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return { success: false, message: "Email already registered" };
    }

    if (!name || !email || !password) {
      return { success: false, message: "All fields are required" };
    }

    if (password.length < 6) {
      return {
        success: false,
        message: "Password must be at least 6 characters",
      };
    }

    const newUser = {
      id: `user_${Date.now()}`,
      name,
      email,
      password,
      role: USER_ROLES.USER,
      wallet: INITIAL_WALLET_BALANCE,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    storageService.set(STORAGE_KEYS.USERS, users);

    return { success: true, message: "Registration successful! Please login." };
  }

  login(email, password) {
    const users = storageService.get(STORAGE_KEYS.USERS) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!user) {
      return { success: false, message: "Invalid email or password" };
    }

    storageService.set(STORAGE_KEYS.CURRENT_USER, user.id);
    return { success: true, message: "Login successful", user };
  }

  logout() {
    storageService.remove(STORAGE_KEYS.CURRENT_USER);
    return { success: true, message: "Logged out successfully" };
  }

  getCurrentUser() {
    const userId = storageService.get(STORAGE_KEYS.CURRENT_USER);
    if (!userId) return null;

    const users = storageService.get(STORAGE_KEYS.USERS) || [];
    return users.find((u) => u.id === userId) || null;
  }

  updateUser(userId, updates) {
    const users = storageService.get(STORAGE_KEYS.USERS) || [];
    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      return { success: false, message: "User not found" };
    }

    users[userIndex] = { ...users[userIndex], ...updates };
    storageService.set(STORAGE_KEYS.USERS, users);

    return {
      success: true,
      message: "User updated successfully",
      user: users[userIndex],
    };
  }

  updateWallet(userId, amount) {
    const users = storageService.get(STORAGE_KEYS.USERS) || [];
    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      return { success: false, message: "User not found" };
    }

    users[userIndex].wallet += amount;
    storageService.set(STORAGE_KEYS.USERS, users);

    return { success: true, wallet: users[userIndex].wallet };
  }

  isAuthenticated() {
    return !!this.getCurrentUser();
  }
}

export default new AuthService();
