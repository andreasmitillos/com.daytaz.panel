import React, { useEffect, useState } from "react";
import DashboardPage from "../../Templates/DashboardPage";
import RestaurantTemplate from "../../Templates/RestaurantTemplate";
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
import RestaurantSubMenu from "../../Components/Navbar/RestaurantSubMenu";

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

  // useEffect(() => {
  //   restaurants.actions
  //     .getRestaurant({ restaurantId })
  //     .then((res) => {
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       setLoading(false);
  //     });
  // }, []);

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
          {/* <div className="xl:col-span-2 lg:col-span-3 md:col-span-6 col-span-6">
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
                      <p>{currentRestaurant?.name}</p>
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
                      <p>{currentRestaurant?.description || "-"}</p>
                    </div>
                  </div>
                </li>
              </ul>
            </GeneralCard>
          </div> */}

          <div className="col-span-6">
            <h2 className="font-extrabold text-2xl mb-4 mt-8">
              Registered Users
            </h2>

            <div className="grid grid-cols-8">
              <div className="col-span-8 md:col-span-4">
                <GeneralCard
                // title="Linked Users"
                // subTitle="These are the users that are linked to the current restaurant"
                >
                  <AddUserModal restaurant={currentRestaurant || {}} />
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700 ">
                    {currentRestaurant.users?.map((user) => (
                      <li className="pt-4 pb-4">
                        <div className="flex items-center space-x-4">
                          {/* <div className="flex-shrink-0 relative"></div> */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center">
                              <Link to={`/users/${user?.id}`}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-6 h-6 mr-1 p-1 dark:bg-slate-600 bg-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 transition ease-in-out rounded-md"
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
                                {user?.firstName} {user?.lastName}
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
            </div>
          </div>

          <div className="xl:col-span-4 lg:col-span-3 md:col-span-6 col-span-6"></div>
        </>
      ) : (
        ""
      )}
    </RestaurantTemplate>
    // <DashboardPage
    //   currentTab={`restaurants/${
    //     currentRestaurant?.name
    //       ? currentRestaurant.name
    //       : "Individual Restaurant"
    //   }`}
    // >

    //   <div className="grid grid-cols-6 gap-4 mt-5">
    //     {loading || !currentRestaurant?.id ? (
    //       <div className="col-span-6">
    //         <LoadingBox />
    //       </div>
    //     ) : (
    //       <>
    //         <div className="col-span-6">
    //           <h2 className="font-extrabold text-4xl">
    //             {currentRestaurant.name}
    //           </h2>

    //           <div className="flex items-center dark:text-slate-400 text-slate-600 mt-1">
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               fill="none"
    //               viewBox="0 0 24 24"
    //               strokeWidth={0.8}
    //               stroke="currentColor"
    //               className="w-6 h-6 mr-1"
    //             >
    //               <path
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33"
    //               />
    //             </svg>

    //             <p className="text-xs  font-mono">{currentRestaurant.id}</p>
    //           </div>
    //           <RestaurantSubMenu />
    //         </div>
    //         <div className="xl:col-span-2 lg:col-span-3 md:col-span-6 col-span-6">
    //           <GeneralCard
    //             title="Restaurant Details"
    //             subTitle="Find information about the restaurant listed below."
    //           >
    //             <ul className="divide-y divide-gray-200 dark:divide-gray-700">
    //               <li className="pt-4 pb-4">
    //                 <div className="flex items-center space-x-4">
    //                   <div className="flex-shrink-0"></div>
    //                   <div className="flex-1 min-w-0">
    //                     <p className="text-base font-semibold text-gray-900 truncate dark:text-white">
    //                       Name
    //                     </p>
    //                   </div>
    //                   <div className="inline-flex items-center">
    //                     <p>{currentRestaurant.name}</p>
    //                   </div>
    //                 </div>
    //               </li>

    //               <li className="pt-4 pb-4">
    //                 <div className="flex items-center space-x-4">
    //                   <div className="flex-shrink-0"></div>
    //                   <div className="flex-1 min-w-0">
    //                     <p className="text-base font-semibold text-gray-900 truncate dark:text-white">
    //                       Description
    //                     </p>
    //                   </div>
    //                   <div className="inline-flex items-center">
    //                     <p>{currentRestaurant.description || "-"}</p>
    //                   </div>
    //                 </div>
    //               </li>
    //             </ul>
    //           </GeneralCard>
    //         </div>

    //         <div className="xl:col-span-4 lg:col-span-3 md:col-span-6 col-span-6">
    //           <GeneralCard
    //             title="Linked Users"
    //             subTitle="These are the users that are linked to the current restaurant"
    //           >
    //             <AddUserModal restaurant={currentRestaurant} />
    //             <ul className="divide-y divide-gray-200 dark:divide-gray-700 ">
    //               {currentRestaurant.users?.map((user) => (
    //                 <li className="pt-4 pb-4">
    //                   <div className="flex items-center space-x-4">
    //                     {/* <div className="flex-shrink-0 relative"></div> */}
    //                     <div className="flex-1 min-w-0">
    //                       <div className="flex items-center">
    //                         <Link to={`/users/${user.id}`}>
    //                           <svg
    //                             xmlns="http://www.w3.org/2000/svg"
    //                             fill="none"
    //                             viewBox="0 0 24 24"
    //                             strokeWidth={1.5}
    //                             stroke="currentColor"
    //                             className="w-6 h-6 mr-1 p-1 dark:bg-slate-600 bg-slate-200 hover:bg-slate-300 hover:hover:bg-slate-700 transition ease-in-out rounded-md"
    //                           >
    //                             <path
    //                               strokeLinecap="round"
    //                               strokeLinejoin="round"
    //                               d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
    //                             />
    //                             <path
    //                               strokeLinecap="round"
    //                               strokeLinejoin="round"
    //                               d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    //                             />
    //                           </svg>
    //                         </Link>
    //                         <p className="text-base font-semibold text-gray-900 truncate dark:text-white">
    //                           {user.firstName} {user.lastName}
    //                         </p>
    //                       </div>
    //                       {/* <p className="text-sm font-normal text-gray-500 truncate dark:text-gray-400">
    //                           {device.agent} - {device.ip}
    //                         </p> */}
    //                       <p className="text-sm font-normal text-gray-500 truncate dark:text-gray-400">
    //                         {`${
    //                           user.restaurant_users?.authLevel == "headAdmin"
    //                             ? "Head Administrator"
    //                             : ""
    //                         }${
    //                           user.restaurant_users?.authLevel == "admin"
    //                             ? "Administrator"
    //                             : ""
    //                         }${
    //                           user.restaurant_users?.authLevel == "manager"
    //                             ? "Manager"
    //                             : ""
    //                         }`}
    //                       </p>
    //                     </div>
    //                     <div className="inline-flex items-center">
    //                       {user.restaurant_users?.authLevel != "headAdmin" ? (
    //                         <RemoveUserModal
    //                           user={user}
    //                           restaurant={currentRestaurant}
    //                         />
    //                       ) : (
    //                         ""
    //                       )}
    //                     </div>
    //                     {/* {currentDeviceId == device.id ? (
    //                       ""
    //                     ) : (
    //                       <div className="inline-flex items-center">
    //                         <RevokeDeviceModal
    //                           buttonText="Revoke"
    //                           buttonVariant="transparent"
    //                           device={device}
    //                         >
    //                           Revoke device
    //                         </RevokeDeviceModal>
    //                       </div>
    //                     )} */}
    //                   </div>
    //                 </li>
    //               ))}
    //             </ul>
    //           </GeneralCard>
    //         </div>
    //       </>
    //     )}
    //   </div>
    // </DashboardPage>
  );
};

export default IndividualRestaurantScreen;
