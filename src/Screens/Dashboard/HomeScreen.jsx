import React, { useState } from "react";
import DashboardPage from "../../Templates/DashboardPage";

import { auth } from "../../State/index.js";
import { subscribe } from "valtio";

const HomeScreen = (props) => {
  const [user, setUser] = useState(auth.data.user);
  subscribe(auth.data, () => {
    setUser(auth.data.user);
  });

  return (
    <DashboardPage currentTab="home">
      <h1 className="text-2xl font-bold">
        Hi, {user.prefix || ""} {user.firstName}!
      </h1>
      <p>You are a {user.authLevel}</p>
      {user.email}
    </DashboardPage>
  );
};

export default HomeScreen;
