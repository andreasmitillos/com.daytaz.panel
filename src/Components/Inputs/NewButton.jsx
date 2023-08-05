import React from "react";

const NewButton = (props) => {
  const variants = {
    transparent:
      "text-gray-900 bg-white  border-gray-300  hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 border focus:ring-gray-300 dark:focus:ring-gray-800",

    red: "text-white bg-red-700 hover:bg-red-800 dark:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300  dark:hover:bg-red-700 dark:focus:ring-red-800 focus:ring-red-300 border border-red-700 dark:border-red-600 hover:border-red-800 hover:dark:border-red-700",

    blue: "text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300  dark:hover:bg-blue-700 dark:focus:ring-blue-800 focus:ring-blue-300 border border-blue-700 dark:border-blue-600 hover:border-blue-800 hover:dark:border-blue-700",
  };
  return (
    <button
      href="#"
      className={`px-3 py-2 mb-3 mr-3 text-sm font-medium text-center focus:ring-4 rounded-lg  ${
        variants[props.variant] || variants.blue
      }`}
      {...props}
    >
      {props.children}
    </button>
  );
};

export default NewButton;
