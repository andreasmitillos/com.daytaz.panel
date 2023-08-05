import React, { useState, useEffect } from "react";
import NewButton from "../Inputs/NewButton";

const GeneralModal = (props) => {
  const [toggle, setToggle] = useState(false);
  const [forceClose, setForceClose] = useState(0);

  useEffect(() => {
    if (props.forceClose !== forceClose) {
      setToggle(!toggle);
      setForceClose(props.forceClose);
    }
  }, [props.forceClose]);

  useEffect(() => {
    if (typeof props.modalOpen !== "undefined") {
      props.modalOpen.setModalOpen(toggle);
    }
  }, [toggle]);

  useEffect(() => {
    setToggle(props.modalOpen?.modalOpen);
  }, [props?.modalOpen?.modalOpen]);

  return (
    <div>
      {props.customButton ? (
        <button onClick={(_) => setToggle(true)}>{props.customButton}</button>
      ) : (
        <NewButton
          variant={props.buttonVariant || "blue"}
          onClick={(_) => setToggle(!toggle)}
        >
          {props.buttonText}
        </NewButton>
      )}

      <div
        className="fixed top-0 right-0 z-40 w-screen h-screen bg-gray-900/40 dark:bg-black/50 "
        hidden={!toggle}
        style={{ backdropFilter: "blur(1px)" }}
        onClick={() => setToggle(!toggle)}
      ></div>

      <div
        className="fixed top-0 right-0 z-50 w-screen max-h-full overflow-y-auto transition-opacity"
        hidden={!toggle}
      >
        <div className="grid grid-cols-8 p-4">
          <div className="col-span-1" onClick={() => setToggle(!toggle)}></div>
          <div className="md:col-span-6 col-span-8">
            {props.children}
            {/* <div className="flex justify-center w-full">
              <div className="max-w-2xl dark:bg-gray-700 bg-white rounded-lg shadow w-full">
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mr-12">
                    {props.title || "General Modal"}
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={(_) => setToggle(false)}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="p-6 space-y-6">{props.children}</div>
              </div>
            </div> */}
          </div>
          <div className="col-span-1" onClick={() => setToggle(!toggle)}></div>
        </div>
      </div>

      <div
        id="defaultModal"
        tabindex="-1"
        className={`fixed top-0 left-0 right-0 z-50 w-screen p-4 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full ease-in-out delay-300 ${
          toggle ? "" : "hidden"
        }`}
        hidden
      >
        <div className="flex justify-center ">
          <div className="max-w-2xl dark:bg-gray-700 bg-white rounded-lg shadow ">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mr-12">
                {props.title || "General Modal"}
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={(_) => setToggle(false)}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-6 space-y-6">{props.children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralModal;
