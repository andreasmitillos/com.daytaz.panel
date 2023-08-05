import React, { useState } from "react";
import AuthTemplate from "../../Templates/AuthTemplate";
import Input from "../../Components/Inputs/Input";
import Button from "../../Components/Inputs/Button";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import ButtonLink from "../../Components/Inputs/ButtonLink";
import routes from "../../Routes";
import { auth } from "../../State";
import DynamicForm from "../../Components/Forms/DynamicForm";

const ForgotPasswordScreen = (props) => {
  const [sentRequest, setSentRequest] = useState(false);
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [verified, setVerified] = useState(false);

  const [tempUser, setTempUser] = useState({});

  const navigate = useNavigate();

  const callBack = (res, values) => {
    if (res.status.code === "forgot_password_mfa_enabled_user") {
      setSentRequest(values.email);
      setMfaEnabled(res.mfaEnabled);
    }

    if (res.status.code === "forgot_password_verify_success") {
      setVerified(true);
      setTempUser({
        userId: res.userId,
        passwordResetToken: res.passwordResetToken,
        firstName: res.firstName,
      });
    }

    if (res.status.code === "forgot_password_change_success") {
      navigate({
        pathname: routes.loginScreen,
        search: `?${createSearchParams({
          from: "forgot_password_change_success",
        })}`,
      });
    }
  };

  return (
    <AuthTemplate>
      <h2 className="font-bold text-2xl pt-8 dark:text-white">
        Password Reset
      </h2>
      <p className="dark:text-gray-400 pt-3 pb-8">
        Forgot your password? Don't worry, it happens to everyone.
      </p>

      {/* <Input id="email" type="email" label="Email Address" />

      <Button className="mt-8" variant="indigo">
        Request Password Reset
      </Button> */}

      {verified ? (
        <DynamicForm
          button="Change Password"
          buttonVariant="green"
          buttonCallBack={callBack}
          buttonOnClick={auth.actions.changeForgotPassword}
          fields={[
            {
              key: "newPassword",
              type: "password",
              label: "New Password",
            },
            {
              key: "confirmNewPassword",
              type: "password",
              label: "Confirm New Password",
            },
          ]}
          hiddenValues={{
            userId: tempUser.userId,
            passwordResetToken: tempUser.passwordResetToken,
          }}
        />
      ) : (
        <DynamicForm
          button="Request Password Reset"
          buttonVariant="indigo"
          buttonCallBack={callBack}
          buttonOnClick={
            sentRequest
              ? !verified
                ? auth.actions.verifyForgotPassword
                : auth.actions.changeForgotPassword
              : auth.actions.requestForgotPassword
          }
          fields={[
            {
              key: "email",
              type: "string",
              label: "Email Address",
              disabled: sentRequest,
              value: sentRequest ? sentRequest : false,
            },
            mfaEnabled
              ? {
                  key: "mfaToken",
                  type: "number",
                  label: "Two Factor Authentication (2FA) Token",
                }
              : false,
            ,
            sentRequest
              ? {
                  key: "emailToken",
                  type: "number",
                  label: "Email Verification Token",
                }
              : false,
          ]}
          hiddenValues={sentRequest ? { email: sentRequest } : {}}
        />
      )}

      <Link to={routes.loginScreen} className="block text-center mt-4">
        <ButtonLink>Remembered your password? Sign In</ButtonLink>
      </Link>
    </AuthTemplate>
  );
};

export default ForgotPasswordScreen;
