import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import Inputs from "../Inputs/Inputs";
import Buttons from "../Inputs/Buttons";

const Modal = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalForceClose, setInternalForceClose] = useState(0);

  let {
    buttonText,
    buttonVariant,
    buttonSize,
    triggerComponent,
    triggerComponentClasses,
    title,
    subTitle,
    children,
    size,
    forceClose,
  } = props;

  useEffect(() => {
    if (internalForceClose !== forceClose && forceClose) {
      setIsOpen(!isOpen);
    }
  }, [forceClose]);

  let modalSize = {
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      {/* <span onClick={openModal}> */}
      {triggerComponent ? (
        <div
          onClick={openModal}
          className={`appearance-none ${triggerComponentClasses}`}
        >
          {triggerComponent}
        </div>
      ) : (
        <Buttons size={buttonSize} variant={buttonVariant} onClick={openModal}>
          {buttonText}
        </Buttons>
      )}
      {/* </span> */}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 dark:bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={`w-full ${modalSize[size]} transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-slate-800`}
                >
                  {title ? (
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                    >
                      {title}
                    </Dialog.Title>
                  ) : (
                    ""
                  )}

                  {subTitle ? (
                    <div className={!title ? "" : "mt-2"}>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {subTitle ||
                          "Register a user using their First Name, Last Name and Email Address. Afterwards, they will receive an email with a temporary password."}
                      </p>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className={title || subTitle ? "mt-4" : ""}>
                    {children}
                  </div>

                  {/* children */}
                  {/* <div className="grid grid-cols-6 gap-3 mt-4">
                    <div className="col-span-3">
                      <Inputs
                        isInput
                        label="First Name"
                        // cornerLabel="Required"
                        placeholder="Andreas"
                      />
                    </div>
                    <div className="col-span-3">
                      <Inputs
                        isInput
                        label="Last Name"
                        // cornerLabel="Required"
                        placeholder="Andreas"
                      />
                    </div>
                  </div>

                  <div className="my-4 mb-8">
                    <Inputs
                      isInput
                      label="Email Address"
                      cornerLabel="Required"
                      placeholder="pirkettis@daytaz.com"
                    />
                  </div>

                  <div className="mt-4">
                    <div className="grid grid-cols-6 gap-3">
                      <div className="col-span-3">
                        <Buttons
                          onClick={closeModal}
                          variant="transparent"
                          size="md"
                          full
                        >
                          Cancel
                        </Buttons>
                      </div>
                      <div className="col-span-3">
                        <Buttons variant="indigo" size="md" full>
                          Create
                        </Buttons>
                      </div>
                    </div>
                  </div> */}

                  {/* <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div> */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
