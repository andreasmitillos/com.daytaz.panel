import React, { useEffect, useState } from "react";
import DashboardPage from "../../Templates/DashboardPage";
import RestaurantTemplate from "../../Templates/RestaurantTemplate";

import { auth, restaurants } from "../../State/index";
import { subscribe } from "valtio";
import { useParams } from "react-router-dom";

import RemoveUserModal from "../../Components/Modal/RestaurantModals/RemoveUserModal";
import AddUserModal from "../../Components/Modal/RestaurantModals/AddUserModal";

import GeneralTable from "../../Components/Table/GeneralTable";

const IndividualRestaurantScreen = (props) => {
  const [user, setUser] = useState(auth.data.user);
  const [currentDeviceId, setCurrentDeviceId] = useState(
    auth.data.currentDeviceId
  );
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const { userId, restaurantId } = useParams();

  const [currentRestaurant, setCurrentRestaurant] = useState(
    restaurants.data.retrievedRestaurants[restaurantId] || {}
  );

  subscribe(restaurants.data.retrievedRestaurants, () => {
    setCurrentRestaurant(restaurants.data.retrievedRestaurants[restaurantId]);
  });

  subscribe(auth.data, () => {
    setUser(auth.data.user);
    setCurrentDeviceId(auth.data.currentDeviceId);
  });

  useEffect(() => {
    setCurrentRestaurant(restaurants.data.retrievedRestaurants[restaurantId]);
    setUser(auth.data.user);
    setCurrentDeviceId(auth.data.currentDeviceId);
  }, []);

  return (
    <RestaurantTemplate tab="dashboard">
      {currentRestaurant && currentRestaurant.id ? (
        <>
          <div className="col-span-6">
            <h2 className="font-extrabold text-2xl mb-4">Insights</h2>
            <div className="grid grid-cols-6 md:grid-cols-9 lg:grid-cols-12 gap-4">
              <div className="col-span-3 border p-3 rounded dark:border-slate-600 text-center flex flex-col items-center">
                <div className="grow flex items-center h-24">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-16 h-16 dark:text-green-500 text-green-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="dark:text-slate-400 text-slate-500 text-lg">
                  Ordering Opened
                </p>
              </div>

              <div className="col-span-3 border p-3 rounded dark:border-slate-600 text-center flex flex-col items-center">
                <div className="grow flex items-center h-24 py-16">
                  <p className="text-5xl sm:text-7xl font-extrabold">3</p>
                </div>
                <p className="dark:text-slate-400 text-slate-500 text-lg">
                  Active Menus
                </p>
              </div>

              <div className="col-span-3 border p-3 rounded dark:border-slate-600 text-center flex flex-col items-center">
                <div className="grow flex items-center h-24 py-16">
                  <p className="text-5xl sm:text-7xl font-extrabold">132k</p>
                </div>
                <p className="dark:text-slate-400 text-slate-500 text-lg">
                  Revenues this month
                </p>
              </div>

              <div className="col-span-3 md:col-span-3 border p-3 rounded dark:border-slate-600 text-center flex flex-col items-center">
                <div className="flex items-center h-24 py-16">
                  <p className="text-5xl sm:text-7xl font-extrabold">11k</p>
                </div>
                <div className="flex items-center h-full">
                  <p className="dark:text-slate-400 text-slate-500 text-lg">
                    Orders this month
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-6">
            <div className="mb-4 mt-8 flex items-center">
              <h2 className="font-extrabold text-2xl">Registered Users</h2>
              <div className="ml-4">
                <AddUserModal restaurant={currentRestaurant || {}} />
              </div>
            </div>

            <div className="grid grid-cols-8">
              <div className="col-span-8 lg:col-span-5">
                <GeneralTable
                  model="Assigned Users"
                  header={["ID", "Name", "Auth Level", "Actions"]}
                  data={currentRestaurant.users?.map((user) => [
                    user.id,
                    `${user.firstName} ${user.lastName}`,
                    `${
                      user.restaurant_users?.authLevel == "headAdmin"
                        ? "Head Administrator"
                        : ""
                    }${
                      user.restaurant_users?.authLevel == "admin"
                        ? "Administrator"
                        : ""
                    }${
                      user.restaurant_users?.authLevel == "manager"
                        ? "Manager"
                        : ""
                    }`,
                    user.restaurant_users?.authLevel != "headAdmin" ? (
                      <RemoveUserModal
                        user={user}
                        restaurant={currentRestaurant}
                      />
                    ) : (
                      ""
                    ),
                  ])}
                />
              </div>
            </div>
          </div>

          <div className="xl:col-span-4 lg:col-span-3 md:col-span-6 col-span-6"></div>
        </>
      ) : (
        ""
      )}
    </RestaurantTemplate>
  );
};

export default IndividualRestaurantScreen;
