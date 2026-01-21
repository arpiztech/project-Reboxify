export const routes = {
  // Public Routes
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",

  // Protected Routes
  DASHBOARD: "/dashboard",
  BOXES: "/boxes",
  MY_RENTALS: "/my-rentals",
  RENTAL_HISTORY: "/rental-history",
  PROFILE: "/profile",
  ADMIN: "/admin",

  // Error Routes
  NOT_FOUND: "/404",
};

export const publicRoutes = [routes.HOME, routes.LOGIN, routes.REGISTER];

export const protectedRoutes = [
  routes.DASHBOARD,
  routes.BOXES,
  routes.MY_RENTALS,
  routes.RENTAL_HISTORY,
  routes.PROFILE,
  routes.ADMIN,
];

export const navigationItems = [
  { path: routes.DASHBOARD, label: "Dashboard", icon: "Home" },
  { path: routes.BOXES, label: "Boxes", icon: "Package" },
  { path: routes.MY_RENTALS, label: "My Rentals", icon: "Box" },
  { path: routes.RENTAL_HISTORY, label: "History", icon: "History" },
  { path: routes.PROFILE, label: "Profile", icon: "User" },
];
