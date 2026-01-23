import storageService from "./storageService";
import { STORAGE_KEYS } from "../utils/constants";

class UserService {
  getAllUsers() {
    return storageService.get(STORAGE_KEYS.USERS) || [];
  }

  getUserById(userId) {
    const users = this.getAllUsers();
    return users.find((u) => u.id === userId) || null;
  }

  getUserByEmail(email) {
    const users = this.getAllUsers();
    return users.find((u) => u.email === email) || null;
  }

  updateUser(userId, updates) {
    const users = this.getAllUsers();
    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      return { success: false, message: "User not found" };
    }

    users[userIndex] = { ...users[userIndex], ...updates };
    storageService.set(STORAGE_KEYS.USERS, users);

    return { success: true, message: "User updated", user: users[userIndex] };
  }

  deleteUser(userId) {
    const users = this.getAllUsers();
    const filteredUsers = users.filter((u) => u.id !== userId);

    if (users.length === filteredUsers.length) {
      return { success: false, message: "User not found" };
    }

    storageService.set(STORAGE_KEYS.USERS, filteredUsers);
    return { success: true, message: "User deleted successfully" };
  }

  getTotalUsers() {
    return this.getAllUsers().length;
  }

  searchUsers(searchTerm) {
    const users = this.getAllUsers();
    const term = searchTerm.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term),
    );
  }
}

export default new UserService();
