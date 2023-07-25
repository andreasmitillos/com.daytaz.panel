import React, { useState } from "react";

const SideNavItem = (props) => {
  const [expanded, setExpanded] = useState(false);

  let clicked = () => {
    if (props.expandable) setExpanded(!expanded);
  };

  return (
    <div>
      <div
        className={` ${
          expanded ? "" : "mb-2"
        } text-sm font-bold flex items-center hover:bg-gray-100/[0.8] hover:dark:bg-gray-800 p-2 rounded-md cursor-pointer ${
          props.current
            ? "bg-gray-100/[0.8] dark:bg-gray-800 text-indigo-600 dark:text-white"
            : "hover:text-indigo-600 text-gray-700 dark:text-gray-400 dark:hover:text-white"
        }`}
        onClick={() => clicked()}
      >
        <div>
          {props.icon || (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mr-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>
          )}
        </div>
        <span>{props.name}</span>
        {props.expandable ? (
          <div className="w-full text-right">
            {expanded ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 ml-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 15.75l7.5-7.5 7.5 7.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 ml-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            )}
          </div>
        ) : (
          ""
        )}
      </div>

      <div hidden={!expanded}>
        {props.expandable &&
        typeof props.expandable[0] !== "undefined" &&
        typeof props.expandable[0].name !== "undefined"
          ? props.expandable.map((item) => (
              <div
                className={`hover:text-indigo-600 text-gray-700 dark:text-gray-400 dark:hover:text-white ${
                  item == props.expandable[props.expandable.length - 1]
                    ? "mb-2"
                    : ""
                } text-sm flex items-center hover:bg-gray-100/[0.8] hover:dark:bg-gray-800 p-2 rounded-md pl-11 cursor-pointer`}
              >
                {item.name}
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default SideNavItem;
