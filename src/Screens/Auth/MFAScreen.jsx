import React from "react";
import AuthTemplate from "../../Templates/AuthTemplate";
import Input from "../../Components/Inputs/Input";
import Button from "../../Components/Inputs/Button";
import ButtonLink from "../../Components/Inputs/ButtonLink";
import { Link } from "react-router-dom";
import routes from "../../Routes";

const MFAScreen = (props) => {
  return (
    <AuthTemplate>
      <h2 className="font-bold text-2xl pt-8 dark:text-white">Hi, Andreas!</h2>
      <p className="dark:text-gray-400 pt-3 pb-8">
        We just want to make sure it's you trying to sign in to your account.
      </p>

      <Input id="mfaCode" label="Two Factor Authentication (2FA) Code" />

      <Link to={routes.dashboardHomeScreen}>
        <Button className="mt-8" variant="indigo">
          Verify
        </Button>
      </Link>

      <Link to={routes.loginScreen} className="w-full text-center mt-4 block">
        <ButtonLink>Wrong account? Try again</ButtonLink>
      </Link>
    </AuthTemplate>
  );
};

export default MFAScreen;
