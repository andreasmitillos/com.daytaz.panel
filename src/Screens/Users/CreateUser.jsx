import React, { useState } from "react";
import DashboardPage from "../../Templates/DashboardPage";

import { auth } from "../../State/index.js";
import { subscribe } from "valtio";
import DynamicForm from "../../Components/Forms/DynamicForm";

const CreateUserScreen = (props) => {
  const [user, setUser] = useState(auth.data.user);
  subscribe(auth.data, () => {
    setUser(auth.data.user);
  });

  const callBack = (res, values) => {};

  return (
    <DashboardPage currentTab="users/create">
      <div className="grid grid-cols-6 mt-6">
        <div className="xl:col-span-3 col-span-6 overflow-x-scroll rounded">
          <h2 className="font-extrabold text-4xl">Add User</h2>
          <p className="text-md text-gray-700 dark:text-gray-300">
            Using this form you are able to manually register a user to DaytaZ.
          </p>

          <p className="text-md text-gray-700 dark:text-gray-300 mt-2 mb-8">
            Uppon registering the user, the email address will be immediately
            verified, and user will receive a password which is random via the
            registered email address.
          </p>

          <DynamicForm
            fields={[
              [
                { key: "firstName", type: "string", label: "First Name" },
                { key: "lastName", type: "string", label: "Last Name" },
              ],
              { key: "email", type: "email", label: "Email Address" },
            ]}
            button="Add User to Network"
            buttonVariant="transparent"
            buttonCallBack={callBack}
            buttonOnClick={auth.actions.register}
          />
        </div>
      </div>
    </DashboardPage>
  );
};

export default CreateUserScreen;
