import React from "react";

const Input = (props) => {
  return (
    <div>
      {props.label ? (
        <div>
          {props.labelRight ? (
            <div className="grid grid-cols-2">
              <div>
                <label
                  for={props.id}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {props.label}
                </label>
              </div>

              <div>{props.labelRight}</div>
            </div>
          ) : (
            <label
              for={props.id}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light mb-4"
        required
      />
    </div>
  );
};

export default Input;
