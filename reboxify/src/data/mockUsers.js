import { USER_ROLES } from "@utils/constants";

export const mockUsers = [
  {
    id: "user_001",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    role: USER_ROLES.USER,
    wallet: 1500,
    createdAt: "2024-01-15T10:00:00.000Z",
    phone: "9876543210",
    address: "Mumbai, Maharashtra",
  },
  {
    id: "user_002",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    role: USER_ROLES.USER,
    wallet: 2000,
    createdAt: "2024-02-10T14:30:00.000Z",
    phone: "9876543211",
    address: "Delhi, India",
  },
  {
    id: "admin_001",
    name: "Admin User",
    email: "admin@reboxify.com",
    password: "admin123",
    role: USER_ROLES.ADMIN,
    wallet: 5000,
    createdAt: "2024-01-01T00:00:00.000Z",
    phone: "9876543200",
    address: "Bangalore, Karnataka",
  },
];

/**
 * Get mock user by email
 */
export const getMockUserByEmail = (email) => {
  return mockUsers.find((user) => user.email === email);
};

/**
 * Check if email exists in mock users
 */
export const emailExists = (email) => {
  return mockUsers.some((user) => user.email === email);
};
