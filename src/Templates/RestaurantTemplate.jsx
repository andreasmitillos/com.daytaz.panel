import React, { useEffect, useState } from "react";
import { auth, restaurants } from "../State";
import { useParams } from "react-router-dom";
import { subscribe } from "valtio";
import DashboardPage from "./DashboardPage";
import LoadingBox from "../Components/LoadingBox";
import RestaurantSubMenu from "../Components/Navbar/RestaurantSubMenu";
import MenuSubMenu from "../Components/Navbar/MenuSubMenu";

const RestaurantTemplate = (props) => {
  const [user, setUser] = useState(auth.data.user);
  const [currentDeviceId, setCurrentDeviceId] = useState(
    auth.data.currentDeviceId,
  );
  const [currentUser, setCurrentUser] = useState({});
  const { userId, restaurantId } = useParams();

  const [currentRestaurant, setCurrentRestaurant] = useState(
    restaurants.data.retrievedRestaurants[restaurantId] || {},
  );

  const [gotRestaurant, setGotRestaurant] = useState(
    restaurants.data.retrievedRestaurants[restaurantId]?.id ? true : false,
  );
  const [loading, setLoading] = useState(false);

  subscribe(restaurants.data.retrievedRestaurants, () => {
    setCurrentRestaurant(restaurants.data.retrievedRestaurants[restaurantId]);
  });

  subscribe(auth.data, () => {
    setUser(auth.data.user);
    setCurrentDeviceId(auth.data.currentDeviceId);
  });

  useEffect(() => {
    setCurrentRestaurant(restaurants.data.retrievedRestaurants[restaurantId]);
  }, []);

  useEffect(() => {
    if (!gotRestaurant) {
      setLoading(true);

      restaurants.actions
        .getRestaurant({ restaurantId })
        .then((res) => {
          setGotRestaurant(true);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }, []);

  return (
    <DashboardPage
      currentTab={`restaurants/${
        currentRestaurant?.name
          ? currentRestaurant?.name
          : "Individual Restaurant"
      }${props.tabName || ""}`}
    >
      <div className="grid grid-cols-6 gap-4 mt-5 ">
        {loading || !gotRestaurant ? (
          <div className="col-span-6">
            <LoadingBox />
          </div>
        ) : (
          <>
            <div className="col-span-6">
              <h2 className="font-black text-4xl text-indigo-600 dark:text-indigo-400">
                {props.isMenu
                  ? "Digital Menu Manager"
                  : currentRestaurant?.name}
              </h2>

              {props.isMenu ? (
                <>
                  <div className="flex items-center dark:text-slate-400 text-slate-600 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={0.8}
                      stroke="currentColor"
                      className="w-6 h-6 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>

                    <p className="text-xs font-mono">
                      {currentRestaurant?.name}
                    </p>
                  </div>
                  <div className="flex items-center dark:text-slate-400 text-slate-600 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={0.8}
                      stroke="currentColor"
                      className="w-6 h-6 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                      />
                    </svg>

                    <p className="text-xs font-mono">{props.isMenu?.name}</p>
                  </div>
                </>
              ) : (
                <div className="flex items-center dark:text-slate-400 text-slate-600 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={0.8}
                    stroke="currentColor"
                    className="w-6 h-6 mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33"
                    />
                  </svg>

                  <p className="text-xs  font-mono">{currentRestaurant?.id}</p>
                </div>
              )}
            </div>
            <div className="col-span-6 mb-6">
              {!props.isMenu ? (
                <RestaurantSubMenu tab={props.tab} />
              ) : (
                <MenuSubMenu tab={props.tab} />
              )}
            </div>
            {props.children}
          </>
        )}
      </div>
    </DashboardPage>
  );
};

export default RestaurantTemplate;
