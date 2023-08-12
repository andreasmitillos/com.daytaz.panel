import React, { useState } from "react";
import DashboardPage from "../../Templates/DashboardPage";

import { auth, restaurants } from "../../State/index.js";
import { subscribe } from "valtio";
import DynamicForm from "../../Components/Forms/DynamicForm";

const CreateRestaurantScreen = (props) => {
  const [user, setUser] = useState(auth.data.user);
  subscribe(auth.data, () => {
    setUser(auth.data.user);
  });

  const callBack = (res, values) => {};

  return (
    <DashboardPage currentTab="restaurants/create">
      <div className="grid grid-cols-6 mt-6">
        <div className="xl:col-span-3 col-span-6 overflow-x-scroll rounded">
          <h2 className="font-extrabold text-4xl">Create Restaurant</h2>
          <p className="text-md text-gray-700 dark:text-gray-300">
            Using this form you are able to manually create a restaurant to
            DaytaZ.
          </p>

          <p className="text-md text-gray-700 dark:text-gray-300 mt-2 mb-8">
            If you have not entered a User ID, the restaurant will not be
            assigned a Head Admin, allowing access only by DaytaZ
            Administrators. Visit the users page to get a User ID.
          </p>

          <div className="px-0.5">
            <DynamicForm
              fields={[
                { key: "name", type: "string", label: "Restaurant Name" },
                {
                  key: "description",
                  type: "string",
                  label: "Restaurat Description",
                },
                {
                  key: "userId",
                  type: "string",
                  label: "Head Admin User ID",
                },
              ]}
              button="Create a Restaurant"
              buttonVariant="blue"
              buttonCallBack={callBack}
              buttonOnClick={restaurants.actions.createRestaurant}
            />
          </div>
        </div>
      </div>
    </DashboardPage>
  );
};

export default CreateRestaurantScreen;
