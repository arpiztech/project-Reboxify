import { BOX_CATEGORIES } from "@utils/constants";

export const categories = [
  {
    id: "cat_001",
    name: BOX_CATEGORIES.STANDARD,
    description: "Everyday use boxes for common items",
    icon: "📦",
    color: "#3b82f6",
    features: [
      "Lightweight",
      "Easy to carry",
      "Affordable deposit",
      "Perfect for daily use",
    ],
  },
  {
    id: "cat_002",
    name: BOX_CATEGORIES.PREMIUM,
    description: "High-quality boxes for valuable items",
    icon: "⭐",
    color: "#8b5cf6",
    features: [
      "Extra durable",
      "Secure locking",
      "Premium material",
      "Ideal for valuables",
    ],
  },
  {
    id: "cat_003",
    name: BOX_CATEGORIES.BULK,
    description: "Large capacity boxes for bulk storage",
    icon: "📦",
    color: "#f59e0b",
    features: [
      "Extra large capacity",
      "Heavy-duty",
      "Industrial grade",
      "Best for moving",
    ],
  },
];

/**
 * Get category by name
 */
export const getCategoryByName = (name) => {
  return categories.find((cat) => cat.name === name);
};

/**
 * Get all category names
 */
export const getAllCategoryNames = () => {
  return categories.map((cat) => cat.name);
};

/**
 * Get category color
 */
export const getCategoryColor = (name) => {
  const category = getCategoryByName(name);
  return category ? category.color : "#6b7280";
};
