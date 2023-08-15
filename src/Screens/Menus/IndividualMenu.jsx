import React, { useState } from "react";
import MenuTemplate from "../../Templates/MenuTemplate";
import { useParams } from "react-router-dom";
import { menus } from "../../State";
import { subscribe } from "valtio";
import { current } from "@reduxjs/toolkit";

const MetricCard = (props) => {
  return (
    <div className="col-span-8 sm:col-span-4 lg:col-span-2 border rounded flex flex-col p-4 shadow-sm dark:shadow-md dark:border-slate-700">
      {props.icon ? (
        <div
          className={"rounded mb-4 p-2 bg-slate-100 dark:bg-slate-800 w-fit"}
        >
          {props.icon === "number" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
            </svg>
          ) : (
            ""
          )}

          {props.icon === "boolean" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
              <path
                fillRule="evenodd"
                d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
      <p className={"font-semibold text-slate-500 dark:text-slate-400"}>
        {props.title}
      </p>
      <h3 className={"font-extrabold text-2xl"}>{props.metric}</h3>
      {props.details ? (
        <p className={"text-xs text-slate-500 dark:text-slate-400 mt-2"}>
          {props.details}
        </p>
      ) : (
        ""
      )}
    </div>
  );
};

const IndividualMenu = (props) => {
  // get current menu id
  const { menuId } = useParams();

  // set current menu
  const [currentMenu, setCurrentMenu] = useState(
    menus.data.menuInsights[menuId] || {},
  );

  // subscribe to changes
  subscribe(menus.data, () => {
    setCurrentMenu(menus.data.menuInsights[menuId]);
  });

  return (
    <MenuTemplate tab="insights" tabName="Insights">
      <div className="col-span-6">
        <h2 className="text-2xl font-extrabold">Menu Insights</h2>
        <p className="mb-4 text-sm dark:text-slate-400 text-slate-600 max-w-md">
          Find below some useful insights and metrics of {currentMenu?.name}
        </p>
        <div className="grid grid-cols-8 gap-4 mt-4">
          {/* Is Public Menu ? */}
          <MetricCard
            icon={"boolean"}
            title={"Menu Visibility"}
            metric={
              !currentMenu.draft
                ? "Public"
                : // <span className={"dark:text-green-500 text-green-600"}>
                  //   Yes
                  // </span>
                  "Draft"
              // <span className={"dark:text-red-500 text-red-600"}>No</span>
            }
            details={
              "If your menu is not published, the public will not be able to access it."
            }
          />

          {/* Number of Categories */}
          <MetricCard
            icon={"number"}
            title={"Number of Categories"}
            metric={currentMenu.categoryCount || "None"}
            details={
              "Total number of categories registered and belonging to this menu."
            }
          />

          {/* Number of Subcategories */}
          <MetricCard
            icon={"number"}
            title={"Number of Subcategories"}
            metric={currentMenu.subCategoryCount || "None"}
            details={
              "Total number of subcategories of any category registered."
            }
          />

          {/* Number of Items */}
          <MetricCard
            icon={"number"}
            title={"Number of Items"}
            metric={currentMenu.itemCount || "None"}
            details={"Total number of items of any category or subcategory."}
          />
        </div>
      </div>
    </MenuTemplate>
  );
};

export default IndividualMenu;
