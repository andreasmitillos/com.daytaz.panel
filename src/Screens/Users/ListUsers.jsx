import React, { useState } from "react";
import DashboardPage from "../../Templates/DashboardPage";

import { auth } from "../../State/index.js";
import { subscribe } from "valtio";
import GeneralTable from "../../Components/Table/GeneralTable";

const ListUsers = (props) => {
  const [user, setUser] = useState(auth.data.user);
  subscribe(auth.data, () => {
    setUser(auth.data.user);
  });

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
        <div className="xl:col-span-4 col-span-6 overflow-x-scroll rounded">
          <GeneralTable />
        </div>
      </div>
    </DashboardPage>
  );
};

export default ListUsers;
