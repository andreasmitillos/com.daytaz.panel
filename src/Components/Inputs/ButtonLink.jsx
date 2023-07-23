import React from "react";

const ButtonLink = (props) => {
  return (
    <div className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-300 dark:hover:text-indigo-400">
      {props.children}
    </div>
  );
};

export default ButtonLink;
