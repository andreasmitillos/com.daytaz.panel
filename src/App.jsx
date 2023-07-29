import { Route, Routes } from "react-router-dom";
import DRoutes from "./Routes";
import "./App.css";

import LoginScreen from "./Screens/Auth/LoginScreen";
import RegisterScreen from "./Screens/Auth/RegisterScreen";
import MFAScreen from "./Screens/Auth/MFAScreen";
import ForgotPasswordScreen from "./Screens/Auth/ForgotPasswordScreen";
import HomeScreen from "./Screens/Dashboard/HomeScreen";

function App() {
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

        <Route path={DRoutes.dashboardHomeScreen} element={<HomeScreen />} />
      </Routes>
    </div>
  );
}

export default App;
