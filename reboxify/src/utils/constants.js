// Local Storage Keys
export const STORAGE_KEYS = {
  USERS: "reboxify_users",
  BOXES: "reboxify_boxes",
  RENTALS: "reboxify_rentals",
  CURRENT_USER: "reboxify_currentUser",
  TRANSACTIONS: "reboxify_transactions",
};

// Box Categories
export const BOX_CATEGORIES = {
  STANDARD: "Standard",
  PREMIUM: "Premium",
  BULK: "Bulk",
};

// Rental Status
export const RENTAL_STATUS = {
  ACTIVE: "active",
  RETURNED: "returned",
};

// Box Status
export const BOX_STATUS = {
  AVAILABLE: "available",
  RENTED: "rented",
};

// Return Conditions
export const RETURN_CONDITIONS = {
  GOOD: "good",
  DAMAGED: "damaged",
};

// Transaction Types
export const TRANSACTION_TYPES = {
  RENT: "rent",
  RETURN: "return",
  DEPOSIT: "deposit",
};

// User Roles
export const USER_ROLES = {
  USER: "user",
  ADMIN: "admin",
};

// Initial Wallet Balance
export const INITIAL_WALLET_BALANCE = 1000;

// Refund Percentages
export const REFUND_PERCENTAGES = {
  GOOD: 1.0,
  DAMAGED: 0.8,
};

// Environmental Impact Calculations
export const ENVIRONMENTAL_IMPACT = {
  PLASTIC_SAVED_PER_BOX: 2.5, // kg
  CARBON_REDUCED_PER_BOX: 1.2, // kg
};
