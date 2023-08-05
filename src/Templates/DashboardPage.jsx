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

  const [logoutLoading, setLogoutLoading] = useState(false);

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
    setLogoutLoading(true);
    auth.actions
      .logout()
      .then((res) => {
        setLogoutLoading(false);
      })
      .catch((res) => {
        setLogoutLoading(false);
      });
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
      {/* {menuShow ? ( */}
      <div
        className={`dark:bg-gray-900 bg-white border-r dark:border-gray-700 w-72 p-6 h-screen fixed z-40 pt-4 overflow-y-auto pb-72 ${
          menuShow ? "" : ""
        } md:block ease-in-out duration-300 ${
          menuShow ? "translate-x-0" : "-translate-x-72"
        }`}
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

          <Link to={routes.dashboardHomeScreen}>
            <SideNavItem
              name="Home"
              icon={Icons.home}
              current={props.currentTab == "home"}
            />
          </Link>
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
          <Link to={routes.profileScreen}>
            <SideNavItem
              name="Settings"
              icon={Icons.settings}
              current={props.currentTab == "profile"}
            />
          </Link>
          {/* <Link to={routes.loginScreen}> */}
          <SideNavItem
            name="Logout"
            icon={logoutLoading ? Icons.loading : Icons.logout}
            onClick={onClickLogout}
            disabled={logoutLoading}
          />
          {/* </Link> */}
        </div>
      </div>
      {/* ) : (
        ""
      )} */}
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

            <Link to={routes.dashboardHomeScreen}>
              <SideNavItem
                name="Home"
                icon={Icons.home}
                current={props.currentTab == "home"}
                minimised
                loading
                tip="Home"
              />
            </Link>
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
            <Link to={routes.profileScreen}>
              <SideNavItem
                minimised
                name="Settings"
                icon={Icons.settings}
                tip="Settings"
                current={props.currentTab == "profile"}
              />
            </Link>
            <SideNavItem
              minimised
              name="Logout"
              icon={logoutLoading ? Icons.loading : Icons.logout}
              tip="Logout"
              onClick={onClickLogout}
              disabled={logoutLoading}
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
            className="h-screen w-screen fixed dark:bg-gray-950/[0.8] bg-gray-200/[0.8] z-30"
            hidden={!menuShow}
          />
          <div className={`p-5 pt-6`}>
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
                      Profile
                    </a>
                  </div>
                </li> */}
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
                      Profile
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
            <div className="mt-5">{props.children}</div>

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
