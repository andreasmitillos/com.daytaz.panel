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

  // Users Routes
  listUsersScreen: "/users",
  createUserScreen: "/users/create",
};

export default routes;
