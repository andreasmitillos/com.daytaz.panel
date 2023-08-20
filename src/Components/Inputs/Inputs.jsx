import React, { useEffect, useState } from "react";

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
    isRadio,
    isMultiselect,
    value,
    onChange,
    options,
    name,
    dark,
  } = props;

  const [counts, setCounts] = useState({});

  const multiSelectOnChange = (x) => {
    let countName = x.name;
    let add = x.add;
    let limit = x.limit || -1;
    let fieldLimit = x.fieldSelectLimit || -1;

    let sCounts = counts;

    if (sCounts[countName] === 1 && !add) {
      delete sCounts[countName];
    } else if (!sCounts[countName] && fieldLimit === -1) {
      sCounts = { ...counts, [countName]: 1 };
    } else if (
      !sCounts[countName] &&
      (Object.keys(sCounts).length < fieldLimit || fieldLimit === -1)
    ) {
      sCounts = { ...counts, [countName]: 1 };
    } else if (sCounts[countName] > 0 && add) {
      if (limit > -1 && sCounts[countName] < limit) {
        sCounts[countName] = sCounts[countName] + 1;
      }
      if (limit === -1) {
        sCounts[countName] = sCounts[countName] + 1;
      }
    } else if (sCounts[countName] > 1 && !add) {
      sCounts[countName] = sCounts[countName] - 1;
    }

    setCounts(sCounts);

    if (typeof onChange === "function") {
      onChange({ target: { value: JSON.stringify(sCounts) } });
    }
  };

  return (
    <div className="flex flex-col dark:text-white">
      {label ? (
        <div className="mb-2 text-sm flex">
          <label className="font-semibold grow">{label}</label>
          <label className="text-slate-500 dark:text-slate-400">
            {cornerLabel}
          </label>
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
            name={name}
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
            value={value}
            onChange={onChange}
            name={name}
          />
        ) : (
          ""
        )}

        {isRadio ? (
          <div className={"grid grid-cols-6 gap-2 w-full"}>
            {options.map((option, index) => (
              <div className={"col-span-6"}>
                <div
                  className={`relative hover:cursor-pointer flex items-center bg-slate-100 ${
                    dark ? "dark:bg-slate-700" : "dark:bg-slate-800"
                  } transition ease-in-out pl-3 pr-6 py-2 rounded-lg ${
                    error ? "outline outline-red-300 dark:outline-red-500" : ""
                  }`}
                >
                  <div className="flex items-center h-5">
                    <input
                      id={option.value}
                      value={option.value}
                      name={name}
                      onChange={onChange}
                      disabled={disabled}
                      type="radio"
                      className="border-gray-200 rounded-full text-indigo-600 focus:ring-indigo-500 w-4 h-4 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-indigo-500 dark:checked:border-indigo-500 dark:focus:ring-offset-gray-800"
                    />
                  </div>
                  <label
                    htmlFor={option.value}
                    className="ml-4 w-full hover:cursor-pointer"
                  >
                    <span className="block text-sm font-semibold text-gray-800 dark:text-gray-300">
                      {option.text}
                    </span>
                    <span className="block text-sm text-gray-600 dark:text-gray-400">
                      {option.subText}
                    </span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}

        {isMultiselect ? (
          <div className={"grid grid-cols-6 gap-2 w-full"}>
            {options.map((option, index) => (
              <div className={"col-span-6"}>
                <div
                  className={`relative hover:cursor-pointer flex items-center bg-slate-100 ${
                    dark ? "dark:bg-slate-700" : "dark:bg-slate-800"
                  } transition ease-in-out pl-3 pr-3 py-2 rounded-lg ${
                    error ? "outline outline-red-300 dark:outline-red-500" : ""
                  }`}
                >
                  <div className="flex items-center h-8 ml-1">
                    {!counts[option.value] || option.limit === 1 ? (
                      <input
                        id={option.value}
                        value={option.value}
                        name={name}
                        checked={counts[option.value] || false}
                        disabled={
                          disabled ||
                          (!counts[option.value] &&
                            Object.keys(counts).length >=
                              props.fieldSelectLimit &&
                            props.fieldSelectLimit !== -1)
                        }
                        onChange={() =>
                          multiSelectOnChange({
                            name: option.value,
                            add: false,
                            fieldSelectLimit: props.fieldSelectLimit,
                          })
                        }
                        type="checkbox"
                        className="border-gray-200 rounded-full text-indigo-600 focus:ring-indigo-500 w-4 h-4 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-indigo-500 dark:checked:border-indigo-500 dark:focus:ring-offset-gray-800"
                      />
                    ) : (
                      <div className={"text-sm flex"}>
                        <div
                          className={
                            "py-2 bg-white dark:bg-slate-700 dark:border-slate-600 hover:dark:bg-slate-800 px-1.5 border rounded-tl-lg rounded-bl-lg flex items-center hover:bg-gray-50 transition ease-in-out"
                          }
                          onClick={() =>
                            multiSelectOnChange({
                              name: option.value,
                              add: false,
                              fieldSelectLimit: props.fieldSelectLimit,
                            })
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2.3}
                            stroke="currentColor"
                            className="w-3 h-3"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 12h-15"
                            />
                          </svg>
                        </div>
                        <div
                          className={
                            "py-1 bg-gray-50 dark:bg-slate-700 dark:border-slate-600 px-1.5 w-8 text-center border-t border-b flex items-center hover:cursor-not-allowed"
                          }
                        >
                          <p className={"text-xs font-semibold mx-auto"}>
                            {counts[option.value]}
                          </p>
                        </div>
                        <div
                          className={`flex items-center py-1 bg-white dark:bg-slate-700 hover:dark:bg-slate-800 dark:border-slate-600 hover:bg-gray-50 transition ease-in-out px-1.5 border rounded-tr-lg rounded-br-lg`}
                          onClick={() =>
                            multiSelectOnChange({
                              name: option.value,
                              add: true,
                              limit: option.limit,
                              fieldSelectLimit: props.fieldSelectLimit,
                            })
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2.3}
                            stroke="currentColor"
                            className="w-3 h-3"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 4.5v15m7.5-7.5h-15"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                  <label
                    htmlFor={option.value}
                    className="pl-4 w-full hover:cursor-pointer"
                  >
                    <span className="block text-sm font-semibold text-gray-800 dark:text-gray-300">
                      {option.text}
                    </span>
                    <span className="block text-sm text-gray-600 dark:text-gray-400">
                      {option.subText}
                    </span>
                  </label>
                  <span className={"ml-3"}>{option.right}</span>
                </div>
              </div>
            ))}
          </div>
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
        {error && !isRadio ? (
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
