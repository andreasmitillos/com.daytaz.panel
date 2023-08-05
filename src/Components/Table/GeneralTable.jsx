import React from "react";

const GeneralTable = (props) => {
  return (
    <div className="rounded">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="uppercase text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
            <th className="px-6 py-2">ID</th>
            <th className="px-6 py-2">Name</th>
            <th className="px-6 py-2">Territory</th>
            <th className="px-6 py-2">Currency</th>
            <th className="px-6 py-2"></th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-t border-gray-100 dark:border-gray-700 p-2 text-gray-700 dark:text-gray-300">
            <td className="px-6 py-3">123</td>
            <td className="px-6 py-3">Aldente</td>
            <td className="px-6 py-3">CY</td>
            <td className="px-6 py-3">EUR</td>
            <td className="px-6 py-3">View</td>
          </tr>

          <tr className="border-t border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300">
            <td className="px-6 py-3">123</td>
            <td className="px-6 py-3">TGI Fridays</td>
            <td className="px-6 py-3">CY</td>
            <td className="px-6 py-3">EUR</td>
            <td className="px-6 py-3">View</td>
          </tr>

          <tr className="border-t border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300">
            <td className="px-6 py-3">123</td>
            <td className="px-6 py-3">McDonalds</td>
            <td className="px-6 py-3">CY</td>
            <td className="px-6 py-3">EUR</td>
            <td className="px-6 py-3">View</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default GeneralTable;
