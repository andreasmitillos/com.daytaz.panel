import React, { useEffect, useState } from "react";
import Input from "../Inputs/Input";
import Inputs from "../Inputs/Inputs";
import NewButton from "../Inputs/NewButton";
import Buttons from "../Inputs/Buttons";

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
          className={`flex items-center p-4  text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800 ${
            props.onlyButton ? "" : "mb-8"
          }`}
          role="alert"
        >
          <svg
            className="flex-shrink-0 w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <div className="ml-3 text-sm font-medium">{errorMessage}</div>
        </div>
      ) : (
        ""
      )}

      {successMessage ? (
        <div
          id="alert-border-1"
          className={`flex items-center p-4 mb-8 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800 ${props.addAlertClassName}`}
          role="alert"
        >
          <svg
            className="flex-shrink-0 w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <div className="ml-3 text-sm font-medium">{successMessage}</div>
        </div>
      ) : (
        ""
      )}
      {props.fields.map((field, index) =>
        typeof field.length !== "undefined" ? (
          <div key={index} className="grid grid-cols-6 gap-4 mb-4">
            {field.map((smallerField) => (
              <div
                key={smallerField.key}
                className={`${
                  smallerField.responsive
                    ? "sm:col-span-3 col-span-6"
                    : "col-span-3"
                } `}
              >
                {smallerField.key ? (
                  // <Input
                  //   noMarginBottom
                  //   error={errors[smallerField.key]}
                  //   key={smallerField.key}
                  //   id={smallerField.key}
                  //   type={smallerField.type}
                  //   label={smallerField.label}
                  //   value={smallerField.value || values[smallerField.key] || ""}
                  //   onChange={(e) =>
                  //     onFieldChange(smallerField.key, e.target.value)
                  //   }
                  //   disabled={buttonLoading || smallerField.disabled}
                  //   labelRight={smallerField.labelRight}
                  //   additionalInputClass={smallerField.extraClass}
                  // />
                  <Inputs
                    key={smallerField.key}
                    error={errors[smallerField.key]}
                    isInput
                    onChange={(e) =>
                      onFieldChange(smallerField.key, e.target.value)
                    }
                    type={smallerField.type}
                    label={smallerField.label}
                    value={smallerField.value || values[smallerField.key] || ""}
                    disabled={
                      buttonLoading || smallerField.disabled ? true : false
                    }
                  />
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        ) : field.key ? (
          <>
            {/* <Input
              error={errors[field.key]}
              key={field.key}
              id={field.key}
              type={field.type}
              label={field.label}
              value={field.value || values[field.key] || ""}
              onChange={(e) => onFieldChange(field.key, e.target.value)}
              disabled={buttonLoading || field.disabled}
              labelRight={field.labelRight}
              additionalInputClass={field.extraClass}
            /> */}

            <div className="mb-4">
              <Inputs
                key={field.key}
                error={errors[field.key]}
                isInput
                type={field.type}
                value={field.value || values[field.key] || ""}
                onChange={(e) => onFieldChange(field.key, e.target.value)}
                label={field.label}
                cornerLabel={field.labelRight}
                disabled={buttonLoading || field.disabled ? true : false}
              />
            </div>
          </>
        ) : (
          ""
        )
      )}

      <Buttons
        variant={props.buttonVariant}
        size="md"
        full
        loading={buttonLoading}
        onClick={buttonLoading ? () => "" : onButtonClick}
      >
        {props.button}
      </Buttons>
    </div>
  );
};

export default DynamicForm;
