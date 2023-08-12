import { Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";

const Button = (props) => {
  const { loading, soft, rounded, size, variant, onClick, full } = props;

  const variants = {
    indigo: soft
      ? // soft indigo
        `border-indigo-50 bg-indigo-50 
        ${
          !loading
            ? "hover:bg-indigo-100 hover:border-indigo-100 dark:hover:bg-indigo-400 dark:hover:border-indigo-400"
            : ""
        }

        text-indigo-700 dark:bg-indigo-300 dark:border-indigo-300 dark:text-indigo-800 `
      : // indigo
        `text-white bg-indigo-600 ${
          !loading ? "hover:bg-indigo-500 hover:border-indigo-500 " : ""
        } border-indigo-600 `,

    blue: soft
      ? // soft blue
        `border-blue-50 bg-blue-50 
      ${
        !loading
          ? "hover:bg-blue-100 hover:border-blue-100 dark:hover:bg-blue-400 dark:hover:border-blue-400"
          : ""
      }

      text-blue-700 dark:bg-blue-300 dark:border-blue-300 dark:text-blue-800 `
      : // indigo
        `text-white bg-blue-600 ${
          !loading ? "hover:bg-blue-500 hover:border-blue-500 " : ""
        } border-blue-600 `,

    red: soft
      ? // soft blue
        `border-red-50 bg-red-50 
      ${
        !loading
          ? "hover:bg-red-100 hover:border-red-100 dark:hover:bg-red-400 dark:hover:border-red-400"
          : ""
      }

      text-red-700 dark:bg-red-300 dark:border-red-300 dark:text-red-800 `
      : // indigo
        `text-white bg-red-600 ${
          !loading ? "hover:bg-red-500 hover:border-red-500 " : ""
        } border-red-600 `,

    transparent: `dark:border-slate-600 dark:text-white ${
      !loading ? "dark:hover:bg-slate-800 hover:bg-slate-100" : ""
    }`,
  };

  const sizes = {
    sm: `${rounded ? "px-3" : "px-2"} py-1`,
    md: `${rounded ? "px-4" : "px-3"} py-1.5`,
    lg: `${rounded ? "px-5" : "px-4"} py-2`,
  };

  return (
    <button
      onClick={onClick}
      className={`
        appearance-none
        focus:outline-0
        shadow-sm
        border
        ${rounded ? "rounded-full" : "rounded"}
        text-sm
        ${sizes[size]} mr-2
        ${variants[variant]}
        font-semibold
        transition ease-in-out
        ${loading ? "cursor-progress" : "cursor-pointer"}
        ${full ? "w-full" : ""}
    `}
    >
      <div className="flex items-center w-fit mx-auto">
        {loading ? (
          <svg
            aria-hidden="true"
            role="status"
            className="inline w-3.5 h-3.5 animate-spin mr-2"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            />
          </svg>
        ) : (
          ""
        )}
        {props.children}
      </div>
    </button>
  );
};

export default Button;
