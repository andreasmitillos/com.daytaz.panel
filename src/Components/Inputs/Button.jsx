import classNames from "classnames";
import React from "react";

const variants = {
  red: "bg-red-700 hover:bg-red-900",
  blue: "bg-blue-700 hover:bg-blue-900",
  indigo: "bg-indigo-700 hover:bg-indigo-900",
  orange: "bg-orange-700 hover:bg-orange-900",
};

const Button = (props) => {
  return (
    <button
      className={`
      ${
        variants[props.variant]
      } px-8 py-3 text-white rounded-lg text-sm font-medium transition duration-300 w-full ${
        props.className
      }`}
    >
      <div className="flex items-center justify-center">
        <div>{props.children}</div>
      </div>
    </button>
  );
};

export default Button;
