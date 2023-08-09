import React from "react";

import RestaurantTemplate from "../../Templates/RestaurantTemplate";
import { Link, generatePath, useParams } from "react-router-dom";
import routes from "../../Routes";

const MenusRestaurantItem = (props) => {
  const { restaurantId } = useParams();

  return (
    <div className="xl:col-span-2 sm:col-span-4 col-span-8 border rounded dark:border-slate-500 border-slate-200 px-4 pt-4 pb-2">
      <div className="flex flex-col h-full">
        <h3 className="font-bold">{props.title || ""}</h3>

        <div className="grow border-b dark:border-slate-600 border-slate-200">
          <p className="text-sm dark:text-slate-400 text-slate-600 pt-2 pb-4">
            {props.text || ""}
          </p>
        </div>

        <Link
          to={generatePath(routes.individualMenu, {
            restaurantId,
            menuId: props.id,
          })}
        >
          <div className="cursor-pointer transition ease-in-out hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md mt-2">
            <p className="text-sm flex items-center text-indigo-600 dark:text-indigo-400 w-fit mx-auto py-2 px-4">
              Manage{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

const MenusRestaurant = (props) => {
  return (
    <RestaurantTemplate tab="menus" tabName="/Menus">
      <div className="col-span-6">
        <h2 className="text-2xl font-extrabold">Public Menus</h2>
        <p className="mb-4 text-sm dark:text-slate-400 text-slate-600">
          These are menus that are accessible by the customers of the
          restaurant.
        </p>
        <div className="grid grid-cols-8 gap-8">
          <MenusRestaurantItem
            title={"Beach Bar Menu"}
            text={"This menu will be available for customers at the Beach Bar."}
            id={"test"}
          />
          <MenusRestaurantItem
            title={"Lunch Menu"}
            text={"This menu will be available for customers at the Beach Bar."}
            id={"test"}
          />
          <MenusRestaurantItem
            title={"Dinner Menu"}
            text={"This menu will be available for customers at the Beach Bar."}
            id={"test"}
          />
        </div>
      </div>

      <div className="col-span-6 mt-5">
        <h2 className="text-2xl font-extrabold">Draft Menus</h2>
        <p className="mb-4 text-sm dark:text-slate-400 text-slate-600">
          These are menus that are not accessible by the customers of the
          restaurant. For example, in progress menus.
        </p>
        <div className="grid grid-cols-8 gap-8">
          <MenusRestaurantItem
            title={"Dinner Menu"}
            text={"This menu will be available for customers at the Beach Bar."}
            id={"test"}
          />

          <div className="xl:col-span-2 sm:col-span-4 col-span-8 border border-dashed rounded dark:border-slate-500 border-slate-200 p-4 cursor-pointer dark:hover:bg-slate-800 hover:bg-slate-100 transition ease-in-out">
            <div className="flex items-center h-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mx-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </RestaurantTemplate>
  );
};

export default MenusRestaurant;
