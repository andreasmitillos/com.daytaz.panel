import React from "react";

const Input = (props) => {
  return (
    <div className={`${props.noMarginBottom ? "" : "mb-4"}`}>
      {props.label ? (
        <div>
          {props.labelRight ? (
            <div className="grid grid-cols-2">
              <div>
                <label
                  htmlFor={props.id}
                  className={`block mb-2 text-sm font-medium ${
                    props.error
                      ? "text-red-700 dark:text-red-500"
                      : "text-gray-900 dark:text-white"
                  } `}
                >
                  {props.label}
                </label>
              </div>

              <div>{props.labelRight}</div>
            </div>
          ) : (
            <label
              htmlFor={props.id}
              className={`block mb-2 text-sm font-medium ${
                props.error
                  ? "text-red-700 dark:text-red-500"
                  : "text-gray-900 dark:text-white"
              } `}
            >
              {props.label}
            </label>
          )}
        </div>
      ) : (
        ""
      )}
      <input
        type={props.type || "text"}
        id={props.id}
        className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light ${
          props.error
            ? "border-red-500 dark:border-red-500 text-red-900 dark:text-red-500 focus:ring-red-500  dark:bg-gray-700 focus:border-red-500"
            : ""
        } ${props.additionalInputClass}`}
        required
        {...props}
      />
      {props.error ? (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          {props.error}
        </p>
      ) : (
        ""
      )}
    </div>
  );
};

export default Input;
