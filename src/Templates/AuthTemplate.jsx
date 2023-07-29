import React, { useEffect, useState } from "react";

import logo from "../Assets/logo_no_text.png";
import { auth } from "../State";
import { useNavigate } from "react-router-dom";
import routes from "../Routes";
import { subscribe } from "valtio";

const AuthTemplate = (props) => {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(auth.data.loggedIn);
  const [onLaunchGotUser, setOnLaunchGotUser] = useState(
    auth.data.onLaunchGotUser
  );

  useEffect(() => {
    auth.actions
      .firstTimeGetUser()
      .then((res) => {})
      .catch((err) => {});
  }, []);

  subscribe(auth.data, () => {
    setLoggedIn(auth.data.loggedIn);
    setOnLaunchGotUser(auth.data.onLaunchGotUser);
  });

  useEffect(
    (_) => {
      if (onLaunchGotUser) {
        if (loggedIn) {
          navigate(routes.dashboardHomeScreen);
        }
      }
    },
    [onLaunchGotUser, loggedIn]
  );

  return (
    <div
      className={`sm:bg-[url(./Assets/background3.jpeg)] bg-fixed bg-cover min-h-screen bg-white`}
    >
      <div className="bg-black/40 dark:bg-black/70">
        <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/3 bg-white dark:bg-gray-900 min-h-screen">
          <div className="bg-white dark:bg-gray-900 min-h-screen px-8 py-12">
            <a href="/">
              <img alt="DaytaZ Logo" src={logo} className="w-20" />
            </a>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthTemplate;
