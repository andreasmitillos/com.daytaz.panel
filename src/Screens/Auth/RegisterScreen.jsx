import React from "react";
import AuthTemplate from "../../Templates/AuthTemplate";
import { Link } from "react-router-dom";
import routes from "../../Routes";
import Input from "../../Components/Inputs/Input";
import Button from "../../Components/Inputs/Button";
import ButtonLink from "../../Components/Inputs/ButtonLink";

const RegisterScreen = () => {
  return (
    <AuthTemplate>
      <h2 className="font-bold text-2xl py-8 dark:text-white">
        Create a DaytaZ Account
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <Input id="firstName" label="First Name" />
        <Input id="lastName" label="Last Name" />
      </div>

      <Input id="email" label="Email Address" type="email" />
      <Input id="password" label="Password" />
      <Input id="confirmPassword" label="Confirm Password" />

      <Button variant="blue" className=" mt-8">
        Sign Up
      </Button>

      <Link to={routes.loginScreen} className="w-full text-center mt-4 block">
        <ButtonLink>Already have an account? Sign In now</ButtonLink>
      </Link>
    </AuthTemplate>
  );
};

export default RegisterScreen;
