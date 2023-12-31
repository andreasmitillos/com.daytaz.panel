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

  // Menus
  individualMenu: "/restaurants/:restaurantId/menus/:menuId",
  itemsMenu: "/restaurants/:restaurantId/menus/:menuId/items",
  categoriesMenu: "/restaurants/:restaurantId/menus/:menuId/categories",
  optionListsMenu: "/restaurants/:restaurantId/menus/:menuId/optionLists",
  otherMenu: "/restaurants/:restaurantId/menus/:menuId/other",

  // Users Routes
  listUsersScreen: "/users",
  createUserScreen: "/users/create",
  individualUserScreen: "/users/:userId",
};

export default routes;
