const routes = {
  index: "/",

  // Auth Routes
  loginScreen: "/auth/login",
  registerScreen: "/auth/register",
  mfaScreen: "/auth/mfa",
  forgotPasswordScreen: "/auth/forgotPassword",
  verifyEmailScreen: "/auth/verifyEmail",

  // Dashboard Routes
  dashboardHomeScreen: "/",
  profileScreen: "/profile",

  // Restaurant Routes
  listRestaurantsScreen: "/restaurants",
  createRestaurantScreen: "/restaurants/create",

  individualRestaurantScreen: "/restaurants/:restaurantId",
  paymentRestaurantScreen: "/restaurants/:restaurantId/payments",
  menusRestaurantScreen: "/restaurants/:restaurantId/menus",
  detailsRestaurantScreen: "/restaurants/:restaurantId/details",

  // Users Routes
  listUsersScreen: "/users",
  createUserScreen: "/users/create",
  individualUserScreen: "/users/:userId",
};

export default routes;
