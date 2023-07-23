import React from "react";
import AuthTemplate from "../../Templates/AuthTemplate";
import Input from "../../Components/Inputs/Input";
import Button from "../../Components/Inputs/Button";
import { Link } from "react-router-dom";
import ButtonLink from "../../Components/Inputs/ButtonLink";
import routes from "../../Routes";

const ForgotPasswordScreen = (props) => {
  return (
    <AuthTemplate>
      <h2 className="font-bold text-2xl pt-8 dark:text-white">
        Password Reset
      </h2>
      <p className="dark:text-gray-400 pt-3 pb-8">
        Forgot your password? Don't worry, it happens to everyone.
      </p>

      <Input id="email" type="email" label="Email Address" />

      <Button className="mt-8" variant="indigo">
        Request Password Reset
      </Button>

      <Link to={routes.loginScreen} className="block text-center mt-4">
        <ButtonLink>Remembered your password? Sign In</ButtonLink>
      </Link>
    </AuthTemplate>
  );
};

export default ForgotPasswordScreen;
