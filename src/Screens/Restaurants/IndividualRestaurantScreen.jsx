import React, { useEffect, useState } from "react";
import DashboardPage from "../../Templates/DashboardPage";
import GeneralCard from "../../Components/Card/GeneralCard";
import NewButton from "../../Components/Inputs/NewButton";

import { auth, restaurants, users } from "../../State/index";
import { subscribe } from "valtio";
import RevokeDeviceModal from "../../Components/Modal/RevokeDeviceModal";
import MfaModal from "../../Components/Modal/MfaModal";
import { Link, useParams } from "react-router-dom";
import LoadingBox from "../../Components/LoadingBox";

import RemoveUserModal from "../../Components/Modal/RestaurantModals/RemoveUserModal";
import AddUserModal from "../../Components/Modal/RestaurantModals/AddUserModal";

const IndividualRestaurantScreen = (props) => {
  const [user, setUser] = useState(auth.data.user);
  const [currentDeviceId, setCurrentDeviceId] = useState(
    auth.data.currentDeviceId
  );
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const { userId, restaurantId } = useParams();

  const [currentRestaurant, setCurrentRestaurant] = useState({});

  subscribe(restaurants.data.retrievedRestaurants, () => {
    setCurrentRestaurant(restaurants.data.retrievedRestaurants[restaurantId]);
  });

  subscribe(auth.data, () => {
    setUser(auth.data.user);
    setCurrentDeviceId(auth.data.currentDeviceId);
  });

  useEffect(() => {
    restaurants.actions
      .getRestaurant({ restaurantId })
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  return (
    <DashboardPage
      currentTab={`restaurants/${
        currentRestaurant?.name
          ? currentRestaurant.name
          : "Individual Restaurant"
      }`}
    >
      <div className="grid grid-cols-6 gap-4 mt-5">
        {loading || !currentRestaurant?.id ? (
          <div className="col-span-6">
            <LoadingBox />
          </div>
        ) : (
          <>
            <div className="col-span-6">
              <h2 className="font-extrabold text-4xl">
                {currentRestaurant.name}
              </h2>
              <p className="text-xs mt-1 dark:text-slate-400 text-slate-600 font-mono">
                {currentRestaurant.id}
              </p>
            </div>
            <div className="xl:col-span-2 lg:col-span-3 md:col-span-6 col-span-6">
              <GeneralCard
                title="Restaurant Details"
                subTitle="Find information about the restaurant listed below."
              >
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  <li className="pt-4 pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-semibold text-gray-900 truncate dark:text-white">
                          Name
                        </p>
                      </div>
                      <div className="inline-flex items-center">
                        <p>{currentRestaurant.name}</p>
                      </div>
                    </div>
                  </li>

                  <li className="pt-4 pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-semibold text-gray-900 truncate dark:text-white">
                          Description
                        </p>
                      </div>
                      <div className="inline-flex items-center">
                        <p>{currentRestaurant.description || "-"}</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </GeneralCard>
            </div>

            <div className="xl:col-span-4 lg:col-span-3 md:col-span-6 col-span-6">
              <GeneralCard
                title="Linked Users"
                subTitle="These are the users that are linked to the current restaurant"
              >
                <AddUserModal restaurant={currentRestaurant} />
                <ul className="divide-y divide-gray-200 dark:divide-gray-700 ">
                  {currentRestaurant.users?.map((user) => (
                    <li className="pt-4 pb-4">
                      <div className="flex items-center space-x-4">
                        {/* <div className="flex-shrink-0 relative"></div> */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center">
                            <Link to={`/users/${user.id}`}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 mr-1 p-1 dark:bg-slate-600 bg-slate-200 hover:bg-slate-300 hover:hover:bg-slate-700 transition ease-in-out rounded-md"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                            </Link>
                            <p className="text-base font-semibold text-gray-900 truncate dark:text-white">
                              {user.firstName} {user.lastName}
                            </p>
                          </div>
                          {/* <p className="text-sm font-normal text-gray-500 truncate dark:text-gray-400">
                              {device.agent} - {device.ip}
                            </p> */}
                          <p className="text-sm font-normal text-gray-500 truncate dark:text-gray-400">
                            {`${
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
                            }`}
                          </p>
                        </div>
                        <div className="inline-flex items-center">
                          {user.restaurant_users?.authLevel != "headAdmin" ? (
                            <RemoveUserModal
                              user={user}
                              restaurant={currentRestaurant}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                        {/* {currentDeviceId == device.id ? (
                          ""
                        ) : (
                          <div className="inline-flex items-center">
                            <RevokeDeviceModal
                              buttonText="Revoke"
                              buttonVariant="transparent"
                              device={device}
                            >
                              Revoke device
                            </RevokeDeviceModal>
                          </div>
                        )} */}
                      </div>
                    </li>
                  ))}
                </ul>
              </GeneralCard>
            </div>
          </>
        )}
      </div>
    </DashboardPage>
  );
};

export default IndividualRestaurantScreen;