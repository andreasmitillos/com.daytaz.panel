import React, { useState } from "react";
import GeneralModal from "../GeneralModal";

const RemoveUserModal = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <GeneralModal modalOpen={{ modalOpen, setModalOpen }}>
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow max-w-2xl mx-auto">
        <div className="flex">
          <div className={`text-red-600 bg-red-100 p-2 rounded-3xl h-full`}>
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
          </div>
          <div className="pl-4 w-full">
            <p className="font-semibold ">Remove User</p>
            <p className="dark:text-slate-400 text-slate-500 text-sm pt-2">
              <span>
                Disabling two factor authentication makes it easier for people
                to access your account without your consent. We recomend you
                keep it on. However, if you still want to continue, follow the
                steps below.
              </span>
            </p>
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

export default RemoveUserModal;
