import React, { useEffect, useState } from "react";
import DashboardPage from "../../Templates/DashboardPage";
import GeneralCard from "../../Components/Card/GeneralCard";
import NewButton from "../../Components/Inputs/NewButton";

import { auth } from "../../State/index";
import { subscribe } from "valtio";
import RevokeDeviceModal from "../../Components/Modal/RevokeDeviceModal";
import MfaModal from "../../Components/Modal/MfaModal";

const ProfileScreen = (props) => {
  const [user, setUser] = useState(auth.data.user);
  const [currentDeviceId, setCurrentDeviceId] = useState(
    auth.data.currentDeviceId
  );

  subscribe(auth.data, () => {
    setUser(auth.data.user);
    setCurrentDeviceId(auth.data.currentDeviceId);
  });

  useEffect(() => {
    auth.actions
      .getProfile()
      .then((res) => {})
      .catch((error) => {});
  }, []);

  return (
    <DashboardPage currentTab="profile">
      <h2 className="font-extrabold text-4xl">Profle Settings</h2>
      <div className="grid grid-cols-6 gap-4 mt-5">
        <div className="xl:col-span-2 lg:col-span-3 md:col-span-6 col-span-6">
          <GeneralCard
            title="My Profile"
            subTitle="Find information about your profile listed below."
          >
            <ul class="divide-y divide-gray-200 dark:divide-gray-700">
              <li class="pt-4 pb-4">
                <div class="flex items-center space-x-4">
                  <div class="flex-shrink-0"></div>
                  <div class="flex-1 min-w-0">
                    <p class="text-base font-semibold text-gray-900 truncate dark:text-white">
                      First Name
                    </p>
                  </div>
                  <div class="inline-flex items-center">
                    <p>{user.firstName}</p>
                  </div>
                </div>
              </li>

              <li class="pt-4 pb-4">
                <div class="flex items-center space-x-4">
                  <div class="flex-shrink-0"></div>
                  <div class="flex-1 min-w-0">
                    <p class="text-base font-semibold text-gray-900 truncate dark:text-white">
                      Last Name
                    </p>
                  </div>
                  <div class="inline-flex items-center">
                    <p>{user.lastName}</p>
                  </div>
                </div>
              </li>

              <li class="pt-4 pb-4">
                <div class="flex items-center space-x-4">
                  <div class="flex-shrink-0"></div>
                  <div class="flex-1 min-w-0">
                    <p class="text-base font-semibold text-gray-900 truncate dark:text-white">
                      Email
                    </p>
                  </div>
                  <div class="inline-flex items-center">
                    <p>{user.email}</p>
                  </div>
                </div>
              </li>

              <li class="pt-4 pb-4">
                <div class="flex items-center space-x-4">
                  <div class="flex-shrink-0"></div>
                  <div class="flex-1 min-w-0">
                    <p class="text-base font-semibold text-gray-900 truncate dark:text-white">
                      Email Verified
                    </p>
                  </div>
                  <div class="inline-flex items-center">
                    {/* <p>{user.email}</p> */}

                    <label
                      class="relative inline-flex items-center cursor-not-allowed"
                      onClick={(_) => console.log("2fa")}
                    >
                      <input
                        type="checkbox"
                        value=""
                        class="sr-only peer"
                        checked={user.emailVerified}
                      />
                      <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </li>

              <li class="pt-4 pb-4">
                <div class="flex items-center space-x-4">
                  <div class="flex-shrink-0"></div>
                  <div class="flex-1 min-w-0">
                    <p class="text-base font-semibold text-gray-900 truncate dark:text-white">
                      Two Factor Authentication (2FA)
                    </p>
                  </div>
                  <div class="inline-flex items-center">
                    {/* <p>{user.email}</p> */}
                    <MfaModal user={user} />
                    {/* <label class="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        class="sr-only peer"
                        checked={user.mfaEnabled}
                      />
                      <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
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
            <ul class="divide-y divide-gray-200 dark:divide-gray-700 ">
              {user.devices?.map((device) => (
                <li class="pt-4 pb-4">
                  <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0 relative">
                      {device.deviceType == "phone" ? (
                        <svg
                          class="w-6 h-6 dark:text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                          ></path>
                        </svg>
                      ) : (
                        ""
                      )}

                      {device.deviceType == "desktop" ? (
                        <svg
                          class="w-6 h-6 dark:text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          ></path>
                        </svg>
                      ) : (
                        ""
                      )}
                      {currentDeviceId == device.id ? (
                        <span class="w-4 h-4 absolute -top-2 -right-1.5 bg-green-500 rounded-full border-white dark:border-gray-800 border-4 "></span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div class="flex-1 min-w-0">
                      <div className="flex items-center">
                        <p class="text-base font-semibold text-gray-900 truncate dark:text-white">
                          {device.agent} - {device.agentVersion}{" "}
                        </p>
                      </div>
                      {/* <p class="text-sm font-normal text-gray-500 truncate dark:text-gray-400">
                              {device.agent} - {device.ip}
                            </p> */}
                      <p class="text-sm font-normal text-gray-500 truncate dark:text-gray-400">
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
                      <div class="inline-flex items-center">
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
      </div>
    </DashboardPage>
  );
};

export default ProfileScreen;
