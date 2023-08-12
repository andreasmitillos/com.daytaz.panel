import React from "react";

const Alerts = (props) => {
  const { children, type, title, dark } = props;

  return (
    <div
      className={`shadow rounded w-full overflow-hidden flex bg-white dark:bg-slate-800`}
    >
      <div
        className={`flex items-center w-12 justify-center ${
          type == "error" ? "bg-red-500 dark:bg-red-600" : ""
        } ${type == "warning" ? "bg-yellow-400 dark:bg-yellow-500" : ""} ${
          type == "info" ? "bg-blue-600 dark:bg-blue-700" : ""
        } ${type == "success" ? "bg-green-600 dark:bg-green-700" : ""}`}
      >
        {type == "info" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-white dark:text-slate-200 fill-current"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          ""
        )}

        {type == "warning" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-white dark:text-slate-200 fill-current"
          >
            <path
              fillRule="evenodd"
              d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          ""
        )}

        {type == "error" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-white dark:text-slate-200 fill-current"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          ""
        )}

        {type == "success" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-white dark:text-slate-200 fill-current"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          ""
        )}
      </div>
      <div className="grow px-3 py-2 border-t border-r border-b rounded-r dark:border-slate-700">
        <h3
          className={`font-bold ${
            type == "error" ? "text-red-500 dark:text-red-600" : ""
          } ${
            type == "warning" ? "text-yellow-500 dark:text-yellow-500" : ""
          } ${type == "info" ? "text-blue-600 dark:text-blue-500" : ""} ${
            type == "success" ? "text-green-600 dark:text-green-500" : ""
          }`}
        >
          Something went wrong
        </h3>
        <p className="text-slate-700 dark:text-slate-400 text-sm">{children}</p>
      </div>
    </div>
  );
};

export default Alerts;
