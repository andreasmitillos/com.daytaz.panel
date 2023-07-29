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

const DashboardPage = (props) => {
  const [menuShow, toggleMenuShow] = useState(false);
  const [user, setUser] = useState(auth.data.user);

  const [loggedIn, setLoggedIn] = useState(auth.data.loggedIn);
  const [onLaunchGotUser, setOnLaunchGotUser] = useState(
    auth.data.onLaunchGotUser
  );

  subscribe(auth.data, () => {
    setUser(auth.data.user);
    setLoggedIn(auth.data.loggedIn);
    setOnLaunchGotUser(auth.data.onLaunchGotUser);
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
        if (!loggedIn) {
          navigate(routes.loginScreen);
        }
      }
    },
    [onLaunchGotUser, loggedIn]
  );

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
            <SideNavItem name="Logout" icon={Icons.logout} />
            {/* </Link> */}
          </div>
        </div>
      ) : (
        ""
      )}

      {!menuShow ? (
        <div
          className={`dark:bg-gray-900 bg-white border-r dark:border-gray-700 w-18 p-4 h-screen absolute z-40 overflow-y-auto pb-72 md:block`}
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
            <Link to={routes.loginScreen}>
              <SideNavItem
                minimised
                name="Logout"
                icon={Icons.logout}
                tip="Logout"
              />
            </Link>
          </div>
        </div>
      ) : (
        ""
      )}

      {/* ml-0 md:ml-72 */}
      {user.id ? (
        <div className={`ml-20`}>
          <div
            className="h-screen w-screen fixed dark:bg-gray-950/[0.8] bg-gray-200/[0.8]"
            hidden={!menuShow}
          />
          <div className="p-5">{props.children}</div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default DashboardPage;
