import React, { useState } from "react";
import Inputs from "../Inputs/Inputs";
import Buttons from "../Inputs/Buttons";
import Alerts from "../Alerts/Alerts";

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
            error?.status?.validationErrors &&
            error?.status?.validationErrors[0]
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
        <div className={`mb-8`}>
          <Alerts dark type="error">
            {errorMessage}
          </Alerts>
        </div>
      ) : (
        ""
      )}

      {successMessage ? (
        <div className={`mb-8`}>
          <Alerts type="success">{successMessage}</Alerts>
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
                  <Inputs
                    key={smallerField.key}
                    error={errors[smallerField.key]}
                    onChange={(e) =>
                      onFieldChange(smallerField.key, e.target.value)
                    }
                    type={smallerField.type}
                    label={smallerField.label}
                    value={smallerField.value || values[smallerField.key] || ""}
                    disabled={
                      buttonLoading || smallerField.disabled ? true : false
                    }
                    placeholder={smallerField.placeholder}
                    isInput={smallerField.type !== "textarea"}
                    isTextArea={smallerField.type === "textarea"}
                    icon={smallerField.icon || false}
                    subLabel={smallerField.subLabel}
                    cornerLabel={smallerField.labelRight}
                  />
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        ) : field.key ? (
          <>
            <div className="mb-4">
              <Inputs
                key={field.key}
                error={errors[field.key]}
                dark={props.dark}
                multiple={field.multiple}
                isSelect={field.isSelect}
                isMultiselect={field.isMultiselect}
                fieldSelectLimit={field.fieldSelectLimit}
                type={field.type}
                value={field.value || values[field.key] || null}
                onChange={(e) => {
                  if (field.isSelect) {
                    onFieldChange(field.key, e);
                  } else {
                    onFieldChange(field.key, e.target.value);
                  }
                }}
                label={field.label}
                cornerLabel={field.labelRight}
                disabled={buttonLoading || field.disabled}
                placeholder={field.placeholder}
                isInput={field.type !== "textarea" && field.type}
                isTextArea={field.type === "textarea"}
                icon={field.icon || false}
                isRadio={field.isRadio}
                options={field.options}
                name={field.name}
                subLabel={field.subLabel}
              />
            </div>
          </>
        ) : (
          ""
        ),
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
