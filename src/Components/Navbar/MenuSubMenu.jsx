import React from "react";
import { Link, generatePath, useParams } from "react-router-dom";
import routes from "../../Routes";

const MenuSubMenuItem = (props) => {
  return (
    <li class="mr-2 whitespace-nowrap">
      <a
        href="#"
        // rounded-t-lg
        class={`inline-flex items-center justify-center px-3 py-2   group rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition ease-in-out ${
          // border-b-2 border-indigo-600 rounded-t-lg
          props.active
            ? "text-indigo-600 dark:text-indigo-400 rounded active dark:border-indigo-400 active bg-slate-100 dark:bg-slate-800"
            : // hover:border-gray-300 border-b-2
              "hover:text-gray-600 dark:hover:text-gray-300 border-transparent"
        } mx-auto`}
      >
        <span className={props.iconOnly ? "" : "mr-2"}>{props.icon}</span>
        {props.text}
      </a>
    </li>
  );
};

const MenuSubMenu = (props) => {
  let { restaurantId, menuId } = useParams();

  return (
    <>
      {/* border-b border-gray-200 */}
      <div class=" dark:border-gray-700 overflow-x-scroll no-scrollbar overflow-y-hidden">
        <ul class="flex -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          <Link
            to={generatePath(routes.menusRestaurantScreen, {
              restaurantId,
            })}
          >
            <MenuSubMenuItem
              // active={props?.tab === "insights"}
              // text="Back"
              iconOnly
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                  />
                </svg>
              }
            />
          </Link>

          <Link
            to={generatePath(routes.individualMenu, {
              restaurantId,
              menuId,
            })}
          >
            <MenuSubMenuItem
              active={props?.tab === "insights"}
              text="Insights"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                  />
                </svg>
              }
            />
          </Link>

          <Link
            to={generatePath(routes.itemsMenu, {
              restaurantId,
              menuId,
            })}
          >
            <MenuSubMenuItem
              active={props?.tab === "items"}
              text="Items"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
                  />
                </svg>
              }
            />
          </Link>

          {/* <Link
            to={generatePath(routes.categoriesMenu, {
              restaurantId,
              menuId,
            })}
          >
            <MenuSubMenuItem
              active={props?.tab === "categories"}
              text="Categories"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"
                  />
                </svg>
              }
            />
          </Link> */}

          <Link
            to={generatePath(routes.optionListsMenu, {
              restaurantId,
              menuId,
            })}
          >
            <MenuSubMenuItem
              active={props?.tab === "optionLists"}
              text="Option Lists"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 6h.008v.008H6V6z"
                  />
                </svg>
              }
            />
          </Link>
          {/* <li>
            <a class="inline-block p-2 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500">
              Disabled
            </a>
          </li> */}
        </ul>
      </div>
    </>
  );
};

export default MenuSubMenu;
