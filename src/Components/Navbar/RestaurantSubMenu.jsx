import React from "react";
import { Link, generatePath, useParams } from "react-router-dom";
import routes from "../../Routes";

const RestaurantSubMenuItem = (props) => {
  return (
    <li class="mr-2">
      <a
        href="#"
        // rounded-t-lg
        class={`inline-flex items-center justify-center px-3 py-2   group rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition ease-in-out ${
          // border-b-2 border-indigo-600 rounded-t-lg
          props.active
            ? "text-indigo-600 dark:text-indigo-400 rounded-lg active dark:border-indigo-400 active bg-slate-100 dark:bg-slate-800"
            : // hover:border-gray-300 border-b-2
              "hover:text-gray-600 dark:hover:text-gray-300 border-transparent"
        }`}
      >
        <span className="mr-2">{props.icon}</span>
        {props.text}
      </a>
    </li>
  );
};

const RestaurantSubMenu = (props) => {
  let { restaurantId } = useParams();

  return (
    <>
      {/* border-b border-gray-200 */}
      <div class=" dark:border-gray-700 overflow-x-scroll no-scrollbar overflow-y-hidden">
        <ul class="flex -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          <Link
            to={generatePath(routes.individualRestaurantScreen, {
              restaurantId,
            })}
          >
            <RestaurantSubMenuItem
              active={props?.tab === "dashboard"}
              text="Dashboard"
              icon={
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
              }
            />
          </Link>

          <Link
            to={generatePath(routes.paymentRestaurantScreen, {
              restaurantId,
            })}
          >
            <RestaurantSubMenuItem
              active={props?.tab === "payments"}
              text="Payments"
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
                    d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                  />
                </svg>
              }
            />
          </Link>

          <Link
            to={generatePath(routes.menusRestaurantScreen, {
              restaurantId,
            })}
          >
            <RestaurantSubMenuItem
              active={props?.tab === "menus"}
              text="Menus"
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
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
              }
            />
          </Link>

          <Link
            to={generatePath(routes.detailsRestaurantScreen, {
              restaurantId,
            })}
          >
            <RestaurantSubMenuItem
              active={props?.tab === "details"}
              text="Details"
              icon={
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
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

export default RestaurantSubMenu;
