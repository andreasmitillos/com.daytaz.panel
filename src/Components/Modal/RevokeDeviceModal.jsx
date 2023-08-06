import React, { useState } from "react";
import GeneralModal from "./GeneralModal";
import DynamicForm from "../Forms/DynamicForm";
import { auth, users } from "../../State";

const SuccessModal = (props) => {
  const [forceClose, setForceClose] = useState(0);

  const callBack = () => {
    if (props.currentProfile) {
      users.actions
        .getUser({ userId: props.currentProfile })
        .then((res) => {
          setForceClose(forceClose + 1);
        })
        .catch((err) => {
          setForceClose(forceClose + 1);
        });
    } else {
      auth.actions
        .getProfile()
        .then((res) => {
          setForceClose(forceClose + 1);
        })
        .catch((err) => {
          setForceClose(forceClose + 1);
        });
    }
  };

  return (
    <GeneralModal
      buttonText={props.buttonText}
      buttonVariant={props.buttonVariant}
      forceClose={forceClose}
    >
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow max-w-2xl mx-auto">
        <div className="flex">
          <div className="text-red-600 bg-red-100 p-2 rounded-3xl h-full">
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
                d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z"
              />
            </svg>
          </div>
          <div className="pl-4 flex-1">
            <p className="font-semibold ">Revoke access to </p>
            <p className="dark:text-slate-400 text-slate-500 text-sm pt-2">
              You are about to revoke access to the following device
            </p>
            <p className="dark:text-slate-400 text-slate-500 text-sm pt-2">
              {props.device?.deviceType.substr(0, 1).toUpperCase() +
                props.device?.deviceType.substr(1).toLowerCase()}{" "}
              {props.device?.agent} - {props.device?.agentVersion}
            </p>
            <p className="dark:text-slate-400 text-slate-500 text-sm pt-2">
              This device last accessed your account on{" "}
              {new Date(props.device?.updatedAt).toDateString()} at{" "}
              {new Date(props.device?.updatedAt).toLocaleTimeString()}
            </p>

            <div className="mt-8">
              <DynamicForm
                button="Revoke Access"
                buttonVariant="transparent"
                buttonCallBack={callBack}
                buttonOnClick={auth.actions.revokeDevice}
                fields={[]}
                addButtonClassName="mt-0"
                hiddenValues={{ deviceId: props.device?.id }}
              />
            </div>
          </div>

          <div
            className="text-sm font-bold flex hover:bg-gray-100/[0.8] hover:dark:bg-slate-700 p-2 -mt-2 -mr-2 rounded-md cursor-pointer h-full"
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
