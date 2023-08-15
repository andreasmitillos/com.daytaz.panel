import React, { useState } from "react";
import DynamicForm from "../../Forms/DynamicForm";
import { restaurants } from "../../../State";
import Modal from "../Modal";

const AddUserModal = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [forceClose, setForceClose] = useState(0);

  const toggleModal = () => setForceClose(forceClose + 1);

  const callBack = (response, values) => {
    if (response.status.code === "restaurant_user_added") {
      restaurants.actions
        .getRestaurant({ restaurantId: props.restaurant.id })
        .then((res) => {
          toggleModal();
        })
        .catch((error) => {
          toggleModal();
        });
    }
  };

  return (
    <Modal
      buttonText="Assign User"
      buttonVariant="indigo"
      buttonSize="sm"
      size="lg"
      forceClose={forceClose}
    >
      <div className="flex flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-12 h-12 text-indigo-600 mb-4"
        >
          <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
        </svg>

        <p className="text-lg font-semibold dark:text-white">{`Add User`}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-2">
          You are about to give this user access to this restaurant. Make sure
          to add the correct person.
        </p>

        <div className="w-full mt-6">
          <DynamicForm
            button="Add User"
            buttonVariant="indigo"
            buttonCallBack={callBack}
            buttonOnClick={restaurants.actions.addUser}
            dark={true}
            fields={[
              { key: "userId", type: "text", label: "User ID" },
              {
                key: "authLevel",
                name: "authLevel",
                label: "Permission Level",
                subLabel: "Choose 1 of the above",
                labelRight: "Required",
                isRadio: true,
                options: [
                  {
                    value: "headAdmin",
                    text: "Head Admin",
                    subText:
                      "Same permissions as an Administrator, but can also modify the permission level of the Administrators.",
                  },
                  {
                    value: "admin",
                    text: "Admin",
                    subText:
                      "Full access to the restaurant, including adding managers.",
                  },
                  {
                    value: "manager",
                    text: "Manager",
                    subText:
                      "Access to the operational side of the restaurant.",
                  },
                ],
              },
            ]}
            hiddenValues={{
              restaurantId: props.restaurant?.id,
            }}
          />
        </div>
      </div>
    </Modal>
    // <GeneralModal
    //   modalOpen={{ modalOpen, setModalOpen }}
    //   buttonText="Add User"
    //   buttonVariant="transparent"
    // >
    //   <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow max-w-2xl mx-auto">
    //     <div className="flex">
    //       <div className={`text-slate-600 bg-slate-100 p-2 rounded-3xl h-full`}>
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="none"
    //           viewBox="0 0 24 24"
    //           strokeWidth={1.5}
    //           stroke="currentColor"
    //           className="w-6 h-6"
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
    //           />
    //         </svg>
    //       </div>
    //       <div className="pl-4 w-full">
    //         <p className="font-semibold ">Add User</p>
    //         <p className="dark:text-slate-400 text-slate-500 text-sm pt-2">
    //           Add a user to manage this restaurant. Keep in mind, each
    //           restaurant can have a maximum of 1 Head Admin.
    //         </p>
    //         <div className="mt-8">
    //           <DynamicForm
    //             button="Add User"
    //             buttonVariant="indigo"
    //             buttonCallBack={callBack}
    //             buttonOnClick={restaurants.actions.addUser}
    //             fields={[
    //               { key: "userId", type: "text", label: "User ID" },
    //               {
    //                 key: "authLevel",
    //                 type: "text",
    //                 label: "Auth Level (headAdmin, admin, manager)",
    //               },
    //             ]}
    //             hiddenValues={{
    //               restaurantId: props.restaurant?.id,
    //             }}
    //             // onlyButton
    //           />
    //         </div>
    //       </div>

    //       <div
    //         className="text-sm font-bold flex hover:bg-gray-100/[0.8] hover:dark:bg-slate-700 p-2 -mt-2 -mr-2 rounded-md cursor-pointer h-full"
    //         onClick={(_) => setModalOpen(false)}
    //       >
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="none"
    //           viewBox="0 0 24 24"
    //           strokeWidth={1.5}
    //           stroke="currentColor"
    //           className="w-5 h-5"
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             d="M6 18L18 6M6 6l12 12"
    //           />
    //         </svg>
    //       </div>
    //     </div>
    //   </div>
    // </GeneralModal>
  );
};

export default AddUserModal;
