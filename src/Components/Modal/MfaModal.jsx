import React, { useEffect, useState } from "react";
import GeneralModal from "./GeneralModal";
import LoadingBox from "../LoadingBox";
import { auth } from "../../State";

import QRCode from "react-qr-code";
import DynamicForm from "../Forms/DynamicForm";
import { subscribe } from "valtio";

const SuccessModal = (props) => {
  const [modalOpen, setModalOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  const [mfaUrl, setMfaUrl] = useState(false);

  const [user, setUser] = useState(auth.data.user);

  subscribe(auth.data, () => {
    setUser(auth.data.user);
  });

  const callBack = (res, values) => {
    if (res.status?.code === "mfa_enabled") {
      setModalOpen(false);
      setLoading(false);
      auth.data.user.mfaEnabled = true;
    }

    if (res.status?.code === "mfa_disabled") {
      setModalOpen(false);
      setLoading(false);
      auth.data.user.mfaEnabled = false;
    }
  };

  useEffect(() => {
    if (!mfaUrl && !props?.user?.mfaEnabled) {
      if (modalOpen) {
        setMfaUrl(false);
        auth.actions
          .requestMfaToken()
          .then((res) => {
            if (res?.status?.code === "mfa_url_received") {
              setMfaUrl(res?.mfaUrl);
              setLoading(false);
            }
          })
          .catch((error) => setLoading(true));
      }
    }
  }, [modalOpen]);

  return (
    <GeneralModal
      modalOpen={{ modalOpen, setModalOpen }}
      disabled={props.disabled}
      customButton={
        <label
          className={`relative inline-flex items-center ${
            props.disabled ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            checked={props.user?.mfaEnabled}
            disabled={props.disabled}
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
      }
    >
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow max-w-2xl mx-auto">
        <div className="flex">
          <div
            className={`${
              props.user?.mfaEnabled
                ? "text-red-600 bg-red-100"
                : "text-green-600 bg-green-100"
            } p-2 rounded-3xl h-full`}
          >
            {props.user.mfaEnabled ? (
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
                  d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            ) : (
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
            )}
          </div>
          <div className="pl-4 w-full">
            <p className="font-semibold ">
              {props.user.mfaEnabled ? "Disable" : "Enable"} Two Factor
              Authentication (2FA)
            </p>
            <p className="text-gray-500 text-sm pt-2">
              {props.user?.mfaEnabled ? (
                <span>
                  Disabling two factor authentication makes it easier for people
                  to access your account without your consent. We recomend you
                  keep it on. However, if you still want to continue, follow the
                  steps below.
                </span>
              ) : (
                <span>
                  Nice choice! Enabling two factor authentication make your
                  account a lot more secure. Keep in mind, that in order to sign
                  in to your account you will need to have your Mobile
                  Authentication App with you.
                </span>
              )}
            </p>

            {/* Loading */}
            {loading && !props.user?.mfaEnabled ? <LoadingBox /> : ""}

            <div hidden={!props.user?.mfaEnabled}>
              <h2 className="font-semibold mt-5 text-md">
                Step 1: Enter the token generated
              </h2>
              <p className="text-gray-500 text-sm pt-1">
                Please enter the token that is given by your Authenticator App
                below.
              </p>

              <div className="mt-6">
                <DynamicForm
                  button="Verify"
                  buttonVariant="indigo"
                  buttonCallBack={callBack}
                  buttonOnClick={auth.actions.toggleMfa}
                  fields={[
                    {
                      key: "token",
                      type: "number",
                      label: "Two Factor Authentication (2FA) Code",
                      extraClass: "font-mono",
                    },
                  ]}
                />
              </div>
            </div>

            {/* Steps */}
            <div hidden={loading || props.user?.mfaEnabled}>
              <h2 className="font-semibold mt-5 text-md">
                {/* <span className="underline decoration-blue-400">Step 1:</span>{" "}
              Scan the following QR Code */}
                Step 1: Scan the following QR Code
              </h2>
              <p className="text-gray-500 text-sm pt-1">
                We recomend using{" "}
                <span className="font-semibold">Google Authenticator</span>.
                However, you may use any app you wish.
              </p>

              {/* QR Code */}
              <div className="py-4">
                <QRCode
                  value={mfaUrl}
                  className="mx-auto w-24 h-24 rounded bg-gray-100 p-1 "
                />
              </div>

              <h2 className="font-semibold mt-5 text-md">
                Step 2: Enter the token generated
              </h2>
              <p className="text-gray-500 text-sm pt-1">
                Please enter the token that is given by your Authenticator App
                below.
              </p>

              <div className="mt-6">
                <DynamicForm
                  button="Verify"
                  buttonVariant="indigo"
                  buttonCallBack={callBack}
                  buttonOnClick={auth.actions.toggleMfa}
                  fields={[
                    {
                      key: "token",
                      type: "number",
                      label: "Two Factor Authentication (2FA) Code",
                      extraClass: "font-mono",
                    },
                  ]}
                />
              </div>
            </div>
          </div>

          <div
            className="text-sm font-bold flex hover:bg-gray-100/[0.8] hover:dark:bg-gray-800 p-2 -mt-2 -mr-2 rounded-md cursor-pointer h-full"
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

export default SuccessModal;
