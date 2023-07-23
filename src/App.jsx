import { Route, Routes } from "react-router-dom";
import DRoutes from "./Routes";
import "./App.css";

import LoginScreen from "./Screens/Auth/LoginScreen";
import RegisterScreen from "./Screens/Auth/RegisterScreen";
import MFAScreen from "./Screens/Auth/MFAScreen";
import ForgotPasswordScreen from "./Screens/Auth/ForgotPasswordScreen";

function App() {
  return (
    <>
      <Routes>
        {/* Auth Routes */}
        <Route path={DRoutes.loginScreen} element={<LoginScreen />} />
        <Route path={DRoutes.registerScreen} element={<RegisterScreen />} />
        <Route path={DRoutes.mfaScreen} element={<MFAScreen />} />
        <Route
          path={DRoutes.forgotPasswordScreen}
          element={<ForgotPasswordScreen />}
        />
      </Routes>
    </>
  );
}

export default App;
