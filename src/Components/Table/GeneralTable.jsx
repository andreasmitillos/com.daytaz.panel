import React from "react";

const GeneralTable = (props) => {
  return (
    <div className="rounded">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="uppercase text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
            {props.header?.map((h) => (
              <th className="px-6 py-2">{h}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {props.data?.map((d) => (
            <tr
              className={`border-t border-gray-100 dark:border-gray-700 p-2 text-gray-700 dark:text-gray-300 `}
            >
              {d?.map((iData) => (
                <td className={`px-6 py-3`}>{iData}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GeneralTable;
