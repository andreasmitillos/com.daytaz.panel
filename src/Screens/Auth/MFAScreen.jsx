import React, { useEffect, useState } from "react";
import AuthTemplate from "../../Templates/AuthTemplate";
import Input from "../../Components/Inputs/Input";
import Button from "../../Components/Inputs/Button";
import ButtonLink from "../../Components/Inputs/ButtonLink";
import { Link, useNavigate } from "react-router-dom";
import routes from "../../Routes";
import DynamicForm from "../../Components/Forms/DynamicForm.js";

import { auth } from "../../State/index.js";
import { subscribe } from "valtio";

const MFAScreen = (props) => {
  const [authData, setAuthData] = useState(auth.data);
  subscribe(auth.data, (_) => setAuthData(auth.data));

  const navigate = useNavigate();

  useEffect(() => {
    if (
      !authData.user.mfaEnabled ||
      typeof authData.user.mfaEnabled === "undefined"
    ) {
      navigate(routes.loginScreen);
    }
  });

  const callBack = (res, values) => {
    switch (res.status?.code) {
      case "user_login_success":
        auth.data.user = res.user;
        delete auth.data.mfaLoginDetails;
        navigate(routes.dashboardHomeScreen);
        break;

      default:
        break;
    }
  };

  return (
    <AuthTemplate>
      <h2 className="font-bold text-2xl pt-8 dark:text-white">
        Hi, {authData.user.firstName}!
      </h2>
      <p className="dark:text-gray-400 pt-3 pb-8">
        We just want to make sure it's you trying to sign in to your account.
      </p>

      <DynamicForm
        button="Verify"
        buttonVariant="indigo"
        buttonCallBack={callBack}
        buttonOnClick={auth.actions.login}
        fields={[
          {
            key: "mfaToken",
            type: "string",
            label: "Two Factor Authentication (2FA) Code",
          },
        ]}
        hiddenValues={authData.mfaLoginDetails}
      />

      <Link to={routes.loginScreen} className="w-full text-center mt-4 block">
        <ButtonLink>Wrong account? Try again</ButtonLink>
      </Link>
    </AuthTemplate>
  );
};

export default MFAScreen;
