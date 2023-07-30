import React, { useEffect, useState } from "react";
import AuthTemplate from "../../Templates/AuthTemplate";
import Input from "../../Components/Inputs/Input";
import Button from "../../Components/Inputs/Button";
import ButtonLink from "../../Components/Inputs/ButtonLink";
import {
  Link,
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import routes from "../../Routes";
import DynamicForm from "../../Components/Forms/DynamicForm.js";

import { auth } from "../../State/index.js";
import { subscribe } from "valtio";

const VerifyEmailScreen = (props) => {
  const [authData, setAuthData] = useState(auth.data);
  subscribe(auth.data, (_) => setAuthData(auth.data));

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const userId = searchParams.get("id");

  const callBack = (res, values) => {
    switch (res?.status?.code) {
      case "user_email_verified":
        navigate({
          pathname: routes.loginScreen,
          search: `?${createSearchParams({ from: "email_verify_success" })}`,
        });
        break;

      case "user_email_already_verified":
        navigate({
          pathname: routes.loginScreen,
          search: `?${createSearchParams({ from: "email_verified_already" })}`,
        });
        break;
    }
  };

  return (
    <AuthTemplate>
      <h2 className="font-bold text-2xl pt-8 dark:text-white">
        Hi
        {auth.data.registerUser.firstName
          ? `, ${authData.registerUser.firstName}`
          : ""}
        !
      </h2>
      <p className="dark:text-gray-400 pt-3 pb-8">
        Let's verify your email address. We've sent you an email containing a
        code. Please enter the code below
      </p>

      <DynamicForm
        button="Verify"
        buttonVariant="indigo"
        buttonCallBack={callBack}
        buttonOnClick={auth.actions.verifyEmail}
        fields={[
          {
            key: "emailToken",
            type: "string",
            label: "Email Verification Code",
          },
        ]}
        hiddenValues={{ userId }}
      />

      {/* <Link to={routes.loginScreen} className="w-full text-center mt-4 block">
        <ButtonLink>Wrong account? Try again</ButtonLink>
      </Link> */}
    </AuthTemplate>
  );
};

export default VerifyEmailScreen;
