import React, { useEffect, useState } from "react";

import logo from "../Assets/logo_no_text.png";
import SideNavItem from "../Components/Navbar/SideNavItem";
import routes from "../Routes";
import Icons from "../Components/Navbar/SideNavIcons";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import { auth } from "../State/index.js";
import { subscribe } from "valtio";
import DynamicForm from "../Components/Forms/DynamicForm";
import GeneralCard from "../Components/Card/GeneralCard";
import Input from "../Components/Inputs/Input";
import NewButton from "../Components/Inputs/NewButton";

const DashboardPage = (props) => {
  const [menuShow, toggleMenuShow] = useState(false);
  const [user, setUser] = useState(auth.data.user);
  const [finishedGettingUser, setFinishGettingUser] = useState(
    auth.data.finishedGettingUser
  );
  const [loggedIn, setLoggedIn] = useState(auth.data.loggedIn);
  const [onLaunchGotUser, setOnLaunchGotUser] = useState(
    auth.data.onLaunchGotUser
  );

  subscribe(auth.data, () => {
    setUser(auth.data.user);
    setLoggedIn(auth.data.loggedIn);
    setOnLaunchGotUser(auth.data.onLaunchGotUser);
    setFinishGettingUser(auth.data.finishedGettingUser);
  });

  useEffect(() => {
    auth.actions
      .firstTimeGetUser()
      .then((res) => {})
      .catch((err) => {});
  }, []);

  useEffect(
    (_) => {
      if (onLaunchGotUser) {
        if (!loggedIn && finishedGettingUser) {
          navigate(routes.loginScreen);
        }
      }
    },
    [onLaunchGotUser, loggedIn, finishedGettingUser]
  );

  const onClickLogout = (_) => {
    auth.actions
      .logout()
      .then((res) => {})
      .catch((res) => {});
  };

  const navigate = useNavigate();

  useEffect(() => {
    auth.actions
      .firstTimeGetUser()
      .then((res) => {})
      .catch((err) => {});
  }, []);

  let toggleMenu = () => {
    toggleMenuShow(!menuShow);
  };

  return (
    <div className="dark:bg-gray-900 dark:text-white min-h-screen">
      {menuShow ? (
        <div
          className={`dark:bg-gray-900 bg-white border-r dark:border-gray-700 w-72 p-6 h-screen fixed z-40 pt-4 overflow-y-auto pb-72 ${
            menuShow ? "" : "hidden"
          } md:block`}
        >
          <div className="flex items-top mb-1 pb-10">
            <div className="px-2">
              <img alt="DaytaZ Logo" src={logo} className="w-12" />
              {/* <p className="text-xs font-light text-gray-400">V.A.0.1</p> */}
            </div>

            <div
              onClick={() => toggleMenu()}
              className="hover:text-indigo-600 text-gray-700 dark:text-gray-400 dark:hover:text-white ml-auto cursor-pointer hover:bg-gray-100/[0.8] hover:dark:bg-gray-800 p-2 rounded-md h-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                />
              </svg>
            </div>
          </div>

          <div className="mt-3">
            <p className="font-bold text-xs mb-3 text-gray-400 px-2">
              Main pages
            </p>

            <SideNavItem name="Home" icon={Icons.home} current />
            <SideNavItem
              name="Restaurants"
              icon={Icons.restaurants}
              expandable={[
                { name: "Create Restaurant", to: routes.index },
                { name: "List Restaurants", to: routes.index },
              ]}
            />
            <SideNavItem
              name="Users"
              icon={Icons.people}
              expandable={[{ name: "Create User" }, { name: "List of Users" }]}
            />
            <SideNavItem name="CMS" icon={Icons.info} />
            <SideNavItem name="Projects" icon={Icons.folder} />
            <SideNavItem name="Documents" icon={Icons.document} />
          </div>

          <div>
            <p className="font-bold text-xs mb-3 mt-[3.125rem] text-gray-400 px-2">
              My Account
            </p>
            <SideNavItem name="Settings" icon={Icons.settings} />
            {/* <Link to={routes.loginScreen}> */}
            <SideNavItem
              name="Logout"
              icon={Icons.logout}
              onClick={onClickLogout}
            />
            {/* </Link> */}
          </div>
        </div>
      ) : (
        ""
      )}

      {!menuShow ? (
        <div
          className={`dark:bg-gray-900 bg-white border-r dark:border-gray-700 w-18 p-4 h-screen fixed z-40 overflow-y-auto pb-72 md:block`}
        >
          <div
            onClick={() => toggleMenu()}
            className="hover:text-indigo-600 text-gray-700 dark:text-gray-400 dark:hover:text-white ml-auto cursor-pointer hover:bg-gray-100/[0.8] hover:dark:bg-gray-800 p-2 rounded-md mb-[2.5rem] transition-opacity "
          >
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
                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
              />
            </svg>
          </div>

          <div className="pt-12">
            {/* <p className="font-bold text-xs mb-3 text-gray-400 px-2">
            Main pages
          </p> */}

            <SideNavItem
              name="Home"
              icon={Icons.home}
              current
              minimised
              tip="Home"
            />
            <SideNavItem
              name="Restaurants"
              icon={Icons.restaurants}
              expandable={[
                { name: "Create Restaurant", to: routes.index },
                { name: "List Restaurants", to: routes.index },
              ]}
              minimised
              tip="Restaurants"
            />
            <SideNavItem
              name="Users"
              icon={Icons.people}
              expandable={[{ name: "Create User" }, { name: "List of Users" }]}
              minimised
              tip="Users"
            />
            <SideNavItem name="CMS" icon={Icons.info} minimised tip="CMS" />
            <SideNavItem
              name="Projects"
              icon={Icons.folder}
              minimised
              tip="Projects"
            />
            <SideNavItem
              name="Documents"
              icon={Icons.document}
              minimised
              tip="Documents"
            />
          </div>

          <div className="mb-3 mt-20">
            {/* <p className="font-bold text-xs mb-3 mt-12 text-gray-400 px-2">
            My Account
          </p> */}
            <SideNavItem
              minimised
              name="Settings"
              icon={Icons.settings}
              tip="Settings"
            />
            <SideNavItem
              minimised
              name="Logout"
              icon={Icons.logout}
              tip="Logout"
              onClick={onClickLogout}
            />
          </div>
        </div>
      ) : (
        ""
      )}

      {/* ml-0 md:ml-72 */}
      {user.id ? (
        <div className={`ml-20`} onClick={(_) => toggleMenuShow(false)}>
          <div
            className="h-screen w-screen fixed dark:bg-gray-950/[0.8] bg-gray-200/[0.8]"
            hidden={!menuShow}
          />
          <div className="p-5 pt-6">
            <nav class="flex" aria-label="Breadcrumb">
              <ol class="inline-flex items-center space-x-1 md:space-x-3">
                <li class="inline-flex items-center">
                  <a
                    href="#"
                    class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                  >
                    <svg
                      class="w-3 h-3 mr-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                    Home
                  </a>
                </li>
                {/* <li>
                  <div class="flex items-center">
                    <svg
                      class="w-3 h-3 text-gray-400 mx-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <a
                      href="#"
                      class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                    >
                      Projects
                    </a>
                  </div>
                </li>
                <li aria-current="page">
                  <div class="flex items-center">
                    <svg
                      class="w-3 h-3 text-gray-400 mx-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                      Flowbite
                    </span>
                  </div>
                </li> */}
              </ol>
            </nav>
            <div className="mt-5">{props.children}</div>

            <div className="grid grid-cols-6 gap-4 mt-5">
              <div className="xl:col-span-2 lg:col-span-3 md:col-span-6 col-span-6">
                {/* <GeneralCard
                  title="My Profile"
                  subTitle="Find information about your profile listed below."
                >
                  <Input label="First Name" value={user.firstName} disabled />
                  <Input label="First Name" value={user.lastName} disabled />
                  <Input label="First Name" value={user.email} disabled />
                  <Input label="2FA Enabled" value={user.mfaEnabled} disabled />
                  <Input label="Permissions" value={user.authLevel} disabled />
                </GeneralCard> */}

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
                          <label class="relative inline-flex items-center cursor-not-allowed">
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
                          <label class="relative inline-flex items-center cursor-not-allowed">
                            <input
                              type="checkbox"
                              value=""
                              class="sr-only peer"
                              checked={user.mfaEnabled}
                            />
                            <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          </label>
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
                  <ul class="divide-y divide-gray-200 dark:divide-gray-700">
                    {user.devices?.map((device) => (
                      <li class="pt-4 pb-4">
                        <div class="flex items-center space-x-4">
                          <div class="flex-shrink-0">
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
                          </div>
                          <div class="flex-1 min-w-0">
                            <p class="text-base font-semibold text-gray-900 truncate dark:text-white">
                              {device.agentVersion}
                            </p>
                            {/* <p class="text-sm font-normal text-gray-500 truncate dark:text-gray-400">
                              {device.agent} - {device.ip}
                            </p> */}
                            <p class="text-sm font-normal text-gray-500 truncate dark:text-gray-400">
                              Last Accessed:{" "}
                              {new Date(device.updatedAt).toDateString()} at{" "}
                              {new Date(device.updatedAt).toLocaleTimeString()}
                            </p>
                          </div>
                          <div class="inline-flex items-center">
                            <NewButton />
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </GeneralCard>
              </div>
            </div>

            {/* <div className="grid grid-cols-6">
              <div class="p-4 mb-4 mt-5 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                <div class="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
                  <img
                    class="mb-4 rounded-lg w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0"
                    src="https://flowbite-admin-dashboard.vercel.app/images/users/bonnie-green-2x.png"
                    alt="Jese picture"
                  />
                  <div>
                    <h3 class="mb-1 text-xl font-bold text-gray-900 dark:text-white">
                      Profile picture
                    </h3>
                    <div class="mb-4 text-sm text-gray-500 dark:text-gray-400">
                      JPG, GIF or PNG. Max size of 800K
                    </div>
                    <div class="flex items-center space-x-4">
                      <button
                        type="button"
                        class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      >
                        <svg
                          class="w-4 h-4 mr-2 -ml-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z"></path>
                          <path d="M9 13h2v5a1 1 0 11-2 0v-5z"></path>
                        </svg>
                        Upload picture
                      </button>

                      <button
                        type="button"
                        class="py-2 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default DashboardPage;
