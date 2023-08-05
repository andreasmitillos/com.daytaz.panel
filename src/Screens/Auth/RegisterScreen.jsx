import React from "react";
import AuthTemplate from "../../Templates/AuthTemplate";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import routes from "../../Routes";
import Input from "../../Components/Inputs/Input";
import Button from "../../Components/Inputs/Button";
import ButtonLink from "../../Components/Inputs/ButtonLink";
import DynamicForm from "../../Components/Forms/DynamicForm";
import { auth } from "../../State";

const RegisterScreen = () => {
  const navigate = useNavigate();

  const callBack = (response, values) => {
    if (response.status?.code == "user_created_not_verified") {
      let params = { id: response.user.id };
      auth.data.registerUser = {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
      };
      navigate({
        pathname: routes.verifyEmailScreen,
        search: `?${createSearchParams(params)}`,
      });
    }
  };

  return (
    <AuthTemplate>
      <h2 className="font-bold text-2xl py-8 dark:text-white">
        Create a DaytaZ Account
      </h2>

      <DynamicForm
        fields={[
          [
            {
              key: "firstName",
              type: "string",
              label: "First Name",
              responsive: true,
            },
            {
              key: "lastName",
              type: "string",
              label: "Last Name",
              responsive: true,
            },
          ],
          { key: "email", type: "email", label: "Email Address" },
          { key: "password", type: "password", label: "Password" },
          {
            key: "confirmPassword",
            type: "password",
            label: "Confirm Password",
          },
        ]}
        button="Sign Up"
        buttonVariant="indigo"
        buttonCallBack={callBack}
        buttonOnClick={auth.actions.register}
      />

      <Link to={routes.loginScreen} className="w-full text-center mt-4 block">
        <ButtonLink>Already have an account? Sign In now</ButtonLink>
      </Link>
    </AuthTemplate>
  );
};

export default RegisterScreen;
