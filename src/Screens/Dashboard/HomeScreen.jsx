import React, { useState } from "react";
import DashboardPage from "../../Templates/DashboardPage";
import { useNavigate } from "react-router-dom";

import { auth } from "../../State/index.js";
import { subscribe } from "valtio";
import DynamicForm from "../../Components/Forms/DynamicForm";

const HomeScreen = (props) => {
  const [user, setUser] = useState(auth.data.user);
  subscribe(auth.data, () => {
    setUser(auth.data.user);
  });

  return (
    <DashboardPage>
      <h1 className="text-2xl font-bold">
        Hi, {user.prefix || ""} {user.firstName}!
      </h1>
      asd
    </DashboardPage>
  );
};

export default HomeScreen;
