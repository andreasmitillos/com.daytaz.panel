import React, { useEffect, useState } from "react";
import DashboardPage from "../../Templates/DashboardPage";
import GeneralCard from "../../Components/Card/GeneralCard";
import NewButton from "../../Components/Inputs/NewButton";

import { auth, users } from "../../State/index";
import { subscribe } from "valtio";
import RevokeDeviceModal from "../../Components/Modal/RevokeDeviceModal";
import MfaModal from "../../Components/Modal/MfaModal";
import { useParams } from "react-router-dom";
import LoadingBox from "../../Components/LoadingBox";

const IndividualUserScreen = (props) => {
  const [user, setUser] = useState(auth.data.user);
  const [currentDeviceId, setCurrentDeviceId] = useState(
    auth.data.currentDeviceId
  );
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const { userId } = useParams();

  subscribe(auth.data, () => {
    setUser(auth.data.user);
    setCurrentDeviceId(auth.data.currentDeviceId);
  });

  subscribe(users.data.retrievedUsers, () => {
    setCurrentUser(users.data.retrievedUsers[userId]);
  });

  useEffect(() => {
    // if (user.id) {
    users.actions
      .getUser({ userId })
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
    // }
  }, []);

  return (
    <DashboardPage
      currentTab={`users/${
        currentUser?.firstName
          ? currentUser.firstName + " " + currentUser.lastName
          : "Individual User"
      }`}
    >
      <h2 className="font-extrabold text-4xl">
        {currentUser?.firstName + " " + currentUser?.lastName}
      </h2>
      <div className="grid grid-cols-6 gap-4 mt-5">
        {loading || !currentUser?.id ? (
          <div className="col-span-6">
            <LoadingBox />
          </div>
        ) : (
          <>
            <div className="xl:col-span-2 lg:col-span-3 md:col-span-6 col-span-6">
              <GeneralCard
                title="User Profile"
                subTitle="Find information about the profile listed below."
              >
                {currentUser.authLevel == "superAdmin" ? (
                  <span class="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      class="w-3 h-3 mr-1.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                      />
                    </svg>
                    Super Admin
                  </span>
                ) : (
                  ""
                )}
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  <li className="pt-4 pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-semibold text-gray-900 truncate dark:text-white">
                          First Name
                        </p>
                      </div>
                      <div className="inline-flex items-center">
                        <p>{currentUser.firstName}</p>
                      </div>
                    </div>
                  </li>

                  <li className="pt-4 pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-semibold text-gray-900 truncate dark:text-white">
                          Last Name
                        </p>
                      </div>
                      <div className="inline-flex items-center">
                        <p>{currentUser.lastName}</p>
                      </div>
                    </div>
                  </li>

                  <li className="pt-4 pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-semibold text-gray-900 truncate dark:text-white">
                          Email
                        </p>
                      </div>
                      <div className="inline-flex items-center">
                        <p>{currentUser.email}</p>
                      </div>
                    </div>
                  </li>

                  <li className="pt-4 pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-semibold text-gray-900 truncate dark:text-white">
                          Email Verified
                        </p>
                      </div>
                      <div className="inline-flex items-center">
                        {/* <p>{user.email}</p> */}

                        <label
                          className="relative inline-flex items-center cursor-not-allowed"
                          onClick={(_) => console.log("2fa")}
                        >
                          <input
                            type="checkbox"
                            value=""
                            className="sr-only peer"
                            checked={currentUser.emailVerified}
                          />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </li>

                  <li className="pt-4 pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-semibold text-gray-900 truncate dark:text-white">
                          Two Factor Authentication (2FA)
                        </p>
                      </div>
                      <div className="inline-flex items-center">
                        {/* <p>{user.email}</p> */}
                        <MfaModal user={currentUser} disabled />
                        {/* <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                        checked={user.mfaEnabled}
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label> */}
                      </div>
                    </div>
                  </li>
                </ul>
              </GeneralCard>
            </div>

            <div className="xl:col-span-4 lg:col-span-3 md:col-span-6 col-span-6">
              <GeneralCard
                title="Devices"
                subTitle="These are the devices that are signed in to your account"
              >
                <ul className="divide-y divide-gray-200 dark:divide-gray-700 ">
                  {currentUser.devices?.map((device) => (
                    <li className="pt-4 pb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 relative">
                          {device.deviceType == "phone" ? (
                            <svg
                              className="w-6 h-6 dark:text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                              ></path>
                            </svg>
                          ) : (
                            ""
                          )}

                          {device.deviceType == "desktop" ? (
                            <svg
                              className="w-6 h-6 dark:text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              ></path>
                            </svg>
                          ) : (
                            ""
                          )}
                          {currentDeviceId == device.id ? (
                            <span className="w-4 h-4 absolute -top-2 -right-1.5 bg-green-500 rounded-full border-white dark:border-gray-800 border-4 "></span>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center">
                            <p className="text-base font-semibold text-gray-900 truncate dark:text-white">
                              {device.agent} - {device.agentVersion}{" "}
                            </p>
                          </div>
                          {/* <p className="text-sm font-normal text-gray-500 truncate dark:text-gray-400">
                              {device.agent} - {device.ip}
                            </p> */}
                          <p className="text-sm font-normal text-gray-500 truncate dark:text-gray-400">
                            {currentDeviceId == device.id
                              ? "Current Device"
                              : `Last Accessed: ${new Date(
                                  device.updatedAt
                                ).toDateString()} at${" "}
                        ${new Date(device.updatedAt).toLocaleTimeString()}`}
                          </p>
                        </div>
                        {currentDeviceId == device.id ? (
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
                        )}
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

export default IndividualUserScreen;
