import React, { useState } from "react";
import GeneralModal from "../GeneralModal";
import DynamicForm from "../../Forms/DynamicForm";
import { auth, restaurants } from "../../../State";

import Modal from "../Modal";
import Input from "../../Inputs/Inputs";
import Buttons from "../../Inputs/Buttons";

const RemoveUserModal = (props) => {
  const [loading, setLoading] = useState(false);

  const [forceClose, setForceClose] = useState(0);

  const { user, restaurant } = props;

  const toggleModal = () => setForceClose(forceClose + 1);

  const callBack = (response, values) => {
    if (response.status.code === "restaurant_user_removed") {
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
      buttonText="Remove"
      buttonVariant="red"
      buttonSize="sm"
      size="lg"
      forceClose={forceClose}
    >
      <div className="flex flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-12 h-12 text-red-600 mb-4"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
            clipRule="evenodd"
          />
        </svg>

        <p className="text-lg font-semibold dark:text-white">{`Remove ${user.firstName} ${user.lastName} from ${restaurant.name}`}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-2">
          {`You are about to remove ${user.firstName} ${user.lastName} (${
            user.email
          }) from being ${
            user?.restaurant_users.authLevel == "headAdmin"
              ? "a Head Administrator"
              : props.user?.restaurant_users.authLevel === "admin"
              ? "an Administrator"
              : "a Manager"
          } on ${restaurant.name}.`}
        </p>

        <div className="w-full mt-6">
          <DynamicForm
            button="Remove User"
            buttonVariant="red"
            buttonCallBack={callBack}
            buttonOnClick={restaurants.actions.removeUser}
            fields={[]}
            hiddenValues={{
              restaurantId: props.restaurant?.id,
              userId: props.user?.id,
            }}
            onlyButton
          />
        </div>
      </div>
    </Modal>
  );
};

export default RemoveUserModal;
