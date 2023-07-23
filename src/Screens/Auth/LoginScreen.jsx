import React from "react";
import AuthTemplate from "../../Templates/AuthTemplate";
import Input from "../../Components/Inputs/Input";
import Button from "../../Components/Inputs/Button";
import ButtonLink from "../../Components/Inputs/ButtonLink";
import { Link } from "react-router-dom";
import routes from "../../Routes";

const LoginScreen = (props) => {
  return (
    <AuthTemplate>
      <h2 className="font-bold text-2xl py-8 dark:text-white">
        Sign in to your account
      </h2>

      {/* Email Address */}
      <Input id="email" type="email" label="Email Address" />

      {/* Password Field */}
      <Input
        id="password"
        type="password"
        label="Password"
        labelRight={
          <div className="text-right">
            <Link
              to={routes.forgotPasswordScreen}
              className="font-medium text-sm mb-2 block"
            >
              <ButtonLink>Forgot your password?</ButtonLink>
            </Link>
          </div>
        }
      />

      {/* Sign In Button */}
      <Link to={routes.mfaScreen}>
        <Button variant="blue" className="mt-8">
          Sign In
        </Button>
      </Link>

      {/* Register Button */}
      <Link
        to={routes.registerScreen}
        className="w-full text-center mt-4 block"
      >
        <ButtonLink>Don't have an account? Sign Up now</ButtonLink>
      </Link>
    </AuthTemplate>
  );
};

export default LoginScreen;
