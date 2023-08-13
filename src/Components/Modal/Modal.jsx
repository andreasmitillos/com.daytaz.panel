import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
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
