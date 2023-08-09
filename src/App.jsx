import { Route, Routes } from "react-router-dom";
import DRoutes from "./Routes";
import "./App.css";

import LoginScreen from "./Screens/Auth/LoginScreen";
import RegisterScreen from "./Screens/Auth/RegisterScreen";
import MFAScreen from "./Screens/Auth/MFAScreen";
import ForgotPasswordScreen from "./Screens/Auth/ForgotPasswordScreen";
import HomeScreen from "./Screens/Dashboard/HomeScreen";
import ProfileScreen from "./Screens/Dashboard/ProfileScreen";
import VerifyEmailScreen from "./Screens/Auth/VerifyEmail";

import ListRestaurantsScreen from "./Screens/Restaurants/ListRestaurants";
import CreateRestaurantScreen from "./Screens/Restaurants/CreateRestaurant";
import IndividualRestaurantScreen from "./Screens/Restaurants/IndividualRestaurantScreen";

import ListUsersScreen from "./Screens/Users/ListUsers";
import CreateUserScreen from "./Screens/Users/CreateUser";
import IndividualUserScreen from "./Screens/Users/IndividualUserScreen";
import MenusRestaurant from "./Screens/Restaurants/MenusRestaurant";
import PaymentsRestaurant from "./Screens/Restaurants/PaymentsRestaurant";
import DetailsRestaurant from "./Screens/Restaurants/DetailsRestaurant";

function App() {
  // subscribe(auth.data, (_) => {
  //   console.log(auth.data);
  // });
  return (
    <div className="">
      <Routes>
        {/* Auth Routes */}
        <Route path={DRoutes.loginScreen} element={<LoginScreen />} />
        <Route path={DRoutes.registerScreen} element={<RegisterScreen />} />
        <Route path={DRoutes.mfaScreen} element={<MFAScreen />} />
        <Route
          path={DRoutes.forgotPasswordScreen}
          element={<ForgotPasswordScreen />}
        />
        <Route
          path={DRoutes.verifyEmailScreen}
          element={<VerifyEmailScreen />}
        />
        <Route path={DRoutes.dashboardHomeScreen} element={<HomeScreen />} />
        <Route path={DRoutes.profileScreen} element={<ProfileScreen />} />
        <Route
          path={DRoutes.listRestaurantsScreen}
          element={<ListRestaurantsScreen />}
        />
        <Route
          path={DRoutes.createRestaurantScreen}
          element={<CreateRestaurantScreen />}
        />
        <Route
          path={DRoutes.individualRestaurantScreen}
          element={<IndividualRestaurantScreen />}
        />
        <Route
          path={DRoutes.menusRestaurantScreen}
          element={<MenusRestaurant />}
        />
        <Route
          path={DRoutes.paymentRestaurantScreen}
          element={<PaymentsRestaurant />}
        />
        <Route
          path={DRoutes.detailsRestaurantScreen}
          element={<DetailsRestaurant />}
        />

        <Route path={DRoutes.listUsersScreen} element={<ListUsersScreen />} />
        <Route path={DRoutes.createUserScreen} element={<CreateUserScreen />} />
        <Route
          path={DRoutes.individualUserScreen}
          element={<IndividualUserScreen />}
        />
      </Routes>
    </div>
  );
}

export default App;
