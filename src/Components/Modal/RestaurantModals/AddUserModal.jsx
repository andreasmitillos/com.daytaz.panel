import React, { useState } from "react";
import GeneralModal from "../GeneralModal";
import DynamicForm from "../../Forms/DynamicForm";
import { auth, restaurants } from "../../../State";

const AddUserModal = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const callBack = (response, values) => {
    if (response.status.code === "restaurant_user_added") {
      restaurants.actions
        .getRestaurant({ restaurantId: props.restaurant.id })
        .then((res) => {
          setModalOpen(false);
        })
        .catch((error) => {
          setModalOpen(false);
        });
    }
  };

  return (
    <GeneralModal
      modalOpen={{ modalOpen, setModalOpen }}
      buttonText="Add User"
      buttonVariant="transparent"
    >
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow max-w-2xl mx-auto">
        <div className="flex">
          <div className={`text-slate-600 bg-slate-100 p-2 rounded-3xl h-full`}>
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
                d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
              />
            </svg>
          </div>
          <div className="pl-4 w-full">
            <p className="font-semibold ">Add User</p>
            <p className="dark:text-slate-400 text-slate-500 text-sm pt-2">
              Add a user to manage this restaurant. Keep in mind, each
              restaurant can have a maximum of 1 Head Admin.
            </p>
            <div className="mt-8">
              <DynamicForm
                button="Add User"
                buttonVariant="transparent"
                buttonCallBack={callBack}
                buttonOnClick={restaurants.actions.addUser}
                fields={[
                  { key: "userId", type: "text", label: "User ID" },
                  {
                    key: "authLevel",
                    type: "text",
                    label: "Auth Level (headAdmin, admin, manager)",
                  },
                ]}
                hiddenValues={{
                  restaurantId: props.restaurant?.id,
                }}
                // onlyButton
              />
            </div>
          </div>

          <div
            className="text-sm font-bold flex hover:bg-gray-100/[0.8] hover:dark:bg-slate-700 p-2 -mt-2 -mr-2 rounded-md cursor-pointer h-full"
            onClick={(_) => setModalOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      </div>
    </GeneralModal>
  );
};

export default AddUserModal;
