import React, { useState } from "react";
import GeneralModal from "./GeneralModal";

const SuccessModal = (props) => {
  const [forceClose, setForceClose] = useState(0);
  return (
    <GeneralModal
      buttonText={props.buttonText}
      buttonVariant={props.buttonVariant}
      forceClose={forceClose}
    >
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow max-w-2xl mx-auto">
        <div className="flex">
          <div className="text-blue-600 bg-blue-100 p-2 rounded-3xl h-full">
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
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>
          <div className="pl-4">
            <p className="font-semibold ">
              Enable Two Factor Authentication (2FA)
            </p>
            <p className="text-gray-500 text-sm pt-2">
              Are you sure you want to deactivate your account? All of your data
              will be permentantly removed from our servers forver. This actions
              cannot be undone.
            </p>
          </div>

          <div
            className="text-sm font-bold flex hover:bg-gray-100/[0.8] hover:dark:bg-gray-800 p-2 -mt-2 -mr-2 rounded-md cursor-pointer h-full"
            onClick={(_) => setForceClose(forceClose + 1)}
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

export default SuccessModal;
