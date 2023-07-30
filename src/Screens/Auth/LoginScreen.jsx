import React, { useEffect, useState } from "react";
import AuthTemplate from "../../Templates/AuthTemplate";
import Input from "../../Components/Inputs/Input";
import Button from "../../Components/Inputs/Button";
import ButtonLink from "../../Components/Inputs/ButtonLink";
import { Link, redirect } from "react-router-dom";
import routes from "../../Routes";
import { useNavigate, useSearchParams } from "react-router-dom";

import { auth } from "../../State/index.js";
import { subscribe } from "valtio";
import DynamicForm from "../../Components/Forms/DynamicForm";

import Alert from "../../Components/Alerts/Alert";

const LoginScreen = (props) => {
  // Access state
  const [authData, setAuthData] = useState(auth.data);
  const [searchParams, setSearchParams] = useSearchParams();
  const [from, setFrom] = useState("");
  useEffect(() => {
    setFrom(searchParams.get("from"));
    setSearchParams({});
  }, []);

  const navigate = useNavigate();

  const callBack = (response, values) => {
    if (response.status.code === "user_login_success") {
      navigate("/");
    }
    switch (response.status?.code) {
      case "user_login_success":
        navigate(routes.dashboardHomeScreen);
        console.log("take user to the dashboard page");
        break;

      case "user_login_mfa_required":
        auth.data.user = response.user;
        auth.data.mfaLoginDetails = values;
        navigate(routes.mfaScreen);
        break;
    }
  };

  subscribe(auth.data, () => {
    setAuthData(auth.data);
  });

  return (
    <AuthTemplate>
      <h2 className="font-bold text-2xl py-8 dark:text-white">
        Sign in to your account
      </h2>

      {from == "email_verified_already" ? (
        <Alert variant="blue">Email Already Verified. Please sign in!</Alert>
      ) : (
        ""
      )}

      {from == "email_verify_success" ? (
        <Alert variant="green">
          Great! Your email address has been verified. You may now login.
        </Alert>
      ) : (
        ""
      )}

      <DynamicForm
        button="Sign In"
        buttonVariant="blue"
        buttonCallBack={callBack}
        buttonOnClick={auth.actions.login}
        fields={[
          {
            key: "email",
            type: "email",
            label: "Email Address",
          },
          {
            key: "password",
            type: "password",
            label: "Password",
            labelRight: (
              <div className="text-right">
                <Link
                  to={routes.forgotPasswordScreen}
                  className="font-medium text-sm mb-2 block"
                >
                  <ButtonLink>Forgot your password?</ButtonLink>
                </Link>
              </div>
            ),
          },
        ]}
      />

      <Link
        to={routes.registerScreen}
        className="w-full text-center mt-4 block mb-8"
      >
        <ButtonLink>Don't have an account? Sign Up now</ButtonLink>
      </Link>
    </AuthTemplate>
  );
};

export default LoginScreen;
