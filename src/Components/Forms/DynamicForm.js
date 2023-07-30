import React, { useState } from "react";
import Input from "../Inputs/Input";
import Button from "../Inputs/Button";

const DynamicForm = (props) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const onFieldChange = (field, value) => {
    setValues({ ...values, [field]: value });
  };

  const onButtonClickParent = (res, tempValues) => {
    if (typeof props.buttonCallBack === "function") {
      props.buttonCallBack(res, tempValues);
    }
  };

  //   This function is in the parent - run this with the response
  const onButtonClick = (e) => {
    setErrors({});
    setErrorMessage(false);
    setSuccessMessage(false);
    setButtonLoading(true);
    let tempValues = values;
    let valuesToSend = { ...values };
    if (props.hiddenValues) {
      valuesToSend = { ...valuesToSend, ...props.hiddenValues };
    }
    if (typeof props.buttonOnClick === "function") {
      props
        .buttonOnClick(valuesToSend)
        .then((res) => {
          onButtonClickParent(res, tempValues);
          setSuccessMessage(res.status?.message);
          setValues({});
          setButtonLoading(false);
        })
        .catch((error) => {
          onButtonClickParent(error, tempValues);
          setButtonLoading(false);
          if (
            error.status?.validationErrors &&
            error.status?.validationErrors[0]
          ) {
            let errorKey = error.status?.validationErrors[0].context.key;
            let errorMessage = error.status?.validationErrors[0]?.message;
            setErrors({ [errorKey]: errorMessage });
          }

          setErrorMessage(error.status?.message);
        });
    }
  };

  return (
    <div>
      {errorMessage ? (
        <div
          id="alert-border-1"
          class="flex items-center p-4 mb-8 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800"
          role="alert"
        >
          <svg
            class="flex-shrink-0 w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <div class="ml-3 text-sm font-medium">{errorMessage}</div>
        </div>
      ) : (
        ""
      )}

      {successMessage ? (
        <div
          id="alert-border-1"
          class="flex items-center p-4 mb-8 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800"
          role="alert"
        >
          <svg
            class="flex-shrink-0 w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <div class="ml-3 text-sm font-medium">{successMessage}</div>
        </div>
      ) : (
        ""
      )}
      {props.fields.map((field) => (
        <Input
          error={errors[field.key]}
          key={field.key}
          id={field.key}
          type={field.type}
          label={field.label}
          value={values[field.key] || ""}
          onChange={(e) => onFieldChange(field.key, e.target.value)}
          disabled={buttonLoading}
        />
      ))}

      <Button
        variant={props.buttonVariant}
        className="mt-8"
        onClick={onButtonClick}
        loading={buttonLoading}
      >
        {props.button}
      </Button>
    </div>
  );
};

export default DynamicForm;
