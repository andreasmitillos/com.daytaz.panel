import React, { useEffect, useState } from "react";
import DashboardPage from "../../Templates/DashboardPage";

import { auth, users } from "../../State/index.js";
import { subscribe } from "valtio";
import GeneralTable from "../../Components/Table/GeneralTable";
import LoadingBox from "../../Components/LoadingBox";
import NewButton from "../../Components/Inputs/NewButton";
import { Link } from "react-router-dom";
import routes from "../../Routes";

const ListUsers = (props) => {
  const [user, setUser] = useState(auth.data.user);
  const [usersList, setUsersList] = useState(users.data.users);
  const [loading, setLoading] = useState(true);
  subscribe(auth.data, () => {
    setUser(auth.data.user);
  });

  subscribe(users.data, () => {
    setUsersList(users.data.users);
  });

  useEffect(() => {
    if (user.id) {
      users.actions
        .getUsers()
        .then((res) => {
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }, [user.id]);

  return (
    <DashboardPage currentTab="users/list">
      {/* <h1 className="text-2xl font-bold">
        Hi, {user.prefix || ""} {user.firstName}!
      </h1>
      <p>You are a {user.authLevel}</p>
      {user.email} */}
      <h2 className="font-extrabold text-4xl">List of Users</h2>
      <p className="text-md text-gray-700 dark:text-gray-300">
        Find listed below all users registered to our network.
      </p>

      <div className="grid grid-cols-6 mt-6">
        <div className="xl:col-span-5 col-span-6 overflow-x-scroll rounded">
          {loading ? (
            <LoadingBox />
          ) : (
            <GeneralTable
              header={[
                "ID",
                "First Name",
                "Last Name",
                "Email Address",
                "2FA",
                "Email Verified",
                "Actions",
              ]}
              data={usersList.map((x) => [
                <span className="font-mono">{x.id}</span>,
                x.firstName,
                x.lastName,
                x.email,
                x.mfaEnabled ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-green-600 dark:text-green-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-red-600 dark:text-red-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                x.emailVerified ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-green-600 dark:text-green-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-red-600 dark:text-red-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                <Link to={`/users/${x.id}`}>
                  <NewButton variant="transparent" addClassName="mb-0">
                    View
                  </NewButton>
                </Link>,
              ])}
            />
          )}
        </div>
      </div>
    </DashboardPage>
  );
};

export default ListUsers;
