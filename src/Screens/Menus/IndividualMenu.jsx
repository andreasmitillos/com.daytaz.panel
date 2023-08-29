import React, { useEffect, useState } from "react";
import MenuTemplate from "../../Templates/MenuTemplate";
import { useParams } from "react-router-dom";
import { menus } from "../../State";
import { subscribe } from "valtio";
import { current } from "@reduxjs/toolkit";
import IconForm from "../../Components/Forms/IconForm";

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
  const [update, setUpdate] = useState(0);

  // set current menu
  const [currentMenu, setCurrentMenu] = useState(
    menus.data.menuInsights[menuId] || {},
  );

  // subscribe to changes
  subscribe(menus.data, () => {
    setCurrentMenu(menus.data.menuInsights[menuId]);
    setUpdate(update + 1);
  });

  // toggle menu visibility callBack
  const callBack = (response, values) => {};

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
              !currentMenu.draft ? (
                <span className={"flex"}>
                  <span className={"mr-2"}>Public</span>{" "}
                  <IconForm
                    callBack={callBack}
                    action={menus.actions.editMenu}
                    values={{ menuId, draft: true }}
                    closeCode={"edit_menu_success"}
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className={`w-6 h-6 text-slate-600 dark:text-slate-400 p-1 rounded hover:bg-slate-100 transition ease-in-out cursor-pointer dark:hover:bg-slate-800`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                        />
                      </svg>
                    }
                    containerClass={`mr-2`}
                    loadingIconClass={
                      "text-blue-600 dark:text-blue-400 w-5 h-5"
                    }
                    loadingIconContainerClass={
                      "p-1 rounded bg-slate-100 transition ease-in-out dark:bg-slate-800 cursor-not-allowed"
                    }
                  />
                </span>
              ) : (
                <span className={"flex"}>
                  <span className={"mr-2"}>Draft</span>{" "}
                  <IconForm
                    callBack={callBack}
                    action={menus.actions.editMenu}
                    values={{ menuId, draft: false }}
                    closeCode={"edit_menu_success"}
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className={`w-6 h-6 text-slate-600 dark:text-slate-400 p-1 rounded hover:bg-slate-100 transition ease-in-out cursor-pointer dark:hover:bg-slate-800`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                        />
                      </svg>
                    }
                    containerClass={`mr-2`}
                    loadingIconClass={
                      "text-blue-600 dark:text-blue-400 w-5 h-5"
                    }
                    loadingIconContainerClass={
                      "p-1 rounded bg-slate-100 transition ease-in-out dark:bg-slate-800 cursor-not-allowed"
                    }
                  />
                </span>
              )
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
