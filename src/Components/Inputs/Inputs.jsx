import React from "react";

const Input = (props) => {
  let {
    label,
    cornerLabel,
    subLabel,
    placeholder,
    disabled,
    error,
    type,
    icon,
    isInput,
    isTextArea,
    isSelect,
    value,
    onChange,
  } = props;

  return (
    <div className="flex flex-col dark:text-white">
      {label ? (
        <div className="mb-2 text-sm flex">
          <label className="font-semibold grow">{label}</label>
          <label className="text-slate-500">{cornerLabel}</label>
        </div>
      ) : (
        ""
      )}
      <div className="relative flex items-center">
        {isInput ? (
          <input
            className={`appearance-none dark:bg-slate-800 rounded shadow px-3 py-2 text-sm outline outline-1 focus:outline-2 w-full ${
              !error
                ? "outline-slate-200 dark:outline-slate-600 focus:outline-indigo-600 dark:focus:outline-indigo-500"
                : "outline-red-300 focus:outline-red-600 dark:outline-red-500 pr-11 text-red-800 dark:text-red-400"
            } ${disabled ? "cursor-not-allowed" : ""} ${icon ? "pl-12" : ""}`}
            placeholder={placeholder || ""}
            disabled={disabled}
            type={type}
            value={value}
            onChange={onChange}
          />
        ) : (
          ""
        )}
        {isTextArea ? (
          <textarea
            className={`appearance-none dark:bg-slate-800 rounded shadow px-3 py-2 text-sm outline outline-1 focus:outline-2 w-full ${
              !error
                ? "outline-slate-200 dark:outline-slate-600 focus:outline-indigo-600 dark:focus:outline-indigo-500"
                : "outline-red-300 focus:outline-red-600 dark:outline-red-500 pr-11 text-red-800 dark:text-red-400"
            } ${disabled ? "cursor-not-allowed" : ""} ${icon ? "pl-12" : ""}`}
            placeholder={placeholder || ""}
            disabled={disabled}
            type={type}
          />
        ) : (
          ""
        )}

        {/* Is Select */}
        {isSelect ? (
          <>
            <select
              className={`appearance-none dark:bg-slate-800 rounded shadow px-3 py-2 text-sm outline outline-1 focus:outline-2 w-full ${
                !error
                  ? "outline-slate-200 dark:outline-slate-600 focus:outline-indigo-600 dark:focus:outline-indigo-500"
                  : "outline-red-300 focus:outline-red-600 dark:outline-red-500 pr-11 text-red-800 dark:text-red-400"
              } ${disabled ? "cursor-not-allowed" : ""} ${icon ? "pl-12" : ""}`}
              placeholder={placeholder || ""}
              disabled={disabled}
              type={type}
            >
              <option>Andreas</option>
              <option>Mitillos</option>
            </select>
            <div className="absolute right-0 ml-3 text-slate-400 pr-2 dark:text-slate-500 dark:border-slate-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
          </>
        ) : (
          ""
        )}

        {icon ? (
          <div className="absolute left-0 ml-3 text-slate-400 border-r pr-2 dark:text-slate-500 dark:border-slate-500">
            {icon}
          </div>
        ) : (
          ""
        )}
        {error ? (
          <div className="absolute right-0 mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-red-500"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        ) : (
          ""
        )}
      </div>
      {subLabel && !error ? (
        <label className="mt-2 text-sm text-slate-500">{subLabel}</label>
      ) : (
        ""
      )}
      {error ? (
        <label className="mt-2 text-sm text-red-600 dark:text-red-500">
          {error}
        </label>
      ) : (
        ""
      )}
    </div>
  );
};

export default Input;
