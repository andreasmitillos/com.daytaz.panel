import React from "react";

const GeneralTable = (props) => {
  return (
    <>
      <div className={`${props.data?.length > 0 ? "min-w-full" : "max-w-xl"}`}>
        <div
          className={`overflow-x-scroll border md:rounded-lg border-slate-200 dark:border-slate-700 ${
            props.data?.length > 0 ? "" : "border-dashed"
          }`}
        >
          {!(props.data && props.data?.length > 0) ? (
            <div className="flex flex-col items-center text-sm py-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.0}
                stroke="currentColor"
                className="w-10 h-10 text-slate-500 mb-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>

              <p className="font-semibold">No {props.model || ""}</p>
              <p className="font-normal text-slate-600 mt-1">
                We found no {props.model || ""}
              </p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr className="text-slate-500 dark:text-slate-400 text-left text-sm">
                  {props.header?.map((h) => (
                    <th className="font-normal py-3.5 px-4 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                {props.data?.map((d) => (
                  <tr>
                    {d?.map((individual) => (
                      <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        <div className="text-sm font-normal text-gray-600 dark:text-gray-400">
                          {individual}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default GeneralTable;
