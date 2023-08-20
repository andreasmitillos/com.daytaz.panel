import React, { useEffect, useState } from "react";
import MenuTemplate from "../../Templates/MenuTemplate";
import Inputs from "../../Components/Inputs/Inputs";
import Buttons from "../../Components/Inputs/Buttons";
import DynamicForm from "../../Components/Forms/DynamicForm";
import Modal from "../../Components/Modal/Modal";
import { menus, restaurants } from "../../State";
import { useParams } from "react-router-dom";
import { subscribe } from "valtio";
import LoadingBox from "../../Components/LoadingBox";
import Alerts from "../../Components/Alerts/Alerts";

const AddMenuItem = (props) => {
  return (
    <div className="col-span-6 md:col-span-3 lg:col-span-2 border px-3 py-3 rounded h-full border-dashed dark:border-slate-600 p-4 cursor-pointer dark:hover:bg-slate-800 hover:bg-slate-100 transition ease-in-out">
      <div className="flex items-center h-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 mx-auto"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </div>
    </div>
  );
};

const ItemsMenuItem = (props) => {
  const [update, setUpdate] = useState(0);

  let { optionList } = props;

  return (
    //   md:col-span-3 lg:col-span-2
    <div className="col-span-6  border px-3 py-3 rounded h-full dark:border-slate-600 ">
      {/* Top Row */}
      <div className="flex flex-col h-full">
        <div className="flex items-center dark:text-slate-500 text-slate-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-3 h-3 mr-1"
          >
            <path
              fillRule="evenodd"
              d="M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 005.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 00-2.122-.879H5.25zM6.375 7.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z"
              clipRule="evenodd"
            />
          </svg>
          <p className={"w-full text-xs"}>{props.name || ""}</p>
        </div>

        {optionList?.items?.length > 0 ? (
          <div
            className={
              "block h-full w-full mt-1 text-slate-500 dark:text-slate-400"
            }
          >
            {optionList?.items?.map((item) => (
              <span className="inline-flex items-center bg-slate-100 dark:bg-slate-700 rounded px-1 py-0.5 mr-1 mb-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-3 h-3 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
                  />
                </svg>
                <p className={"text-xs"}>{item.name || ""}</p>
              </span>
            ))}
          </div>
        ) : (
          ""
        )}

        <p className={"text-xs dark:text-slate-500 text-slate-400 my-1.5"}>
          Maximum Options:{" "}
          {props.optionList?.maxSelectLimit === -1 ? (
            <>&infin;</>
          ) : (
            props.optionList?.maxSelectLimit
          )}{" "}
          | Minimum Options: {props.optionList?.minSelectLimit}
        </p>

        <div className="flex items-center border-t dark:border-slate-600 pt-3">
          {/* Item Name */}

          <p className="font-bold grow">{props.title}</p>
          <p className="text-sm text-indigo-600 dark:text-indigo-400 cursor-pointer">
            View
          </p>
        </div>

        {/* Description */}
        <div className="pt-0 pb-2 font-light grow">
          <p className="text-slate-600 dark:text-slate-400">
            {props.description}
          </p>

          <div className={"pt-4"}>
            <Inputs
              isMultiselect={props.multiple}
              isRadio={!props.multiple}
              name={props.name}
              fieldSelectLimit={props.fieldSelectLimit}
              onChange={() => {
                setUpdate(update + 1);
              }}
              options={[
                ...props.options?.map((option, index) => {
                  return {
                    limit: option.limit,
                    value: option.value,
                    text: option.text,
                    subText: option.subText,
                    right: props.edit ? (
                      <div className={"flex items-center"}>
                        {index !== 0 ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 mr-1 hover:bg-slate-200 dark:hover:bg-slate-700 p-0.5 rounded-lg transition ease-in-out"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 15.75l7.5-7.5 7.5 7.5"
                            />
                          </svg>
                        ) : (
                          ""
                        )}

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className={`w-6 h-6 ${
                            index !== props.options.length - 1 ? "mr-1" : "mr-7"
                          } text-red-500 hover:bg-slate-200 dark:hover:bg-slate-700 p-0.5 rounded-lg transition ease-in-out`}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>

                        {index !== props.options.length - 1 ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 hover:bg-slate-200 dark:hover:bg-slate-700 p-0.5 rounded-lg transition ease-in-out"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        ) : (
                          ""
                        )}
                      </div>
                    ) : (
                      ""
                    ),
                  };
                }),
              ]}
            />
          </div>
        </div>

        {props.edit ? (
          <AddOptionListItemModal
            menu={props.menu}
            optionList={props.optionList}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

const AddOptionListModal = (props) => {
  const [multiple, setMultiple] = useState(true);
  const [update, setUpdate] = useState(0);
  const [options, setOptions] = useState([
    {
      text: "Text",
      subText: "Description",
      value: "tomato",
      limit: 3,
      right: (
        <div
          className={
            "hover:bg-slate-200 dark:hover:bg-slate-800 p-1 rounded-lg transition ease-in-out"
          }
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
      ),
    },
    {
      text: "Tomato",
      subText: "Remove the tomato from the burger",
      value: "tomatos",
      limit: 3,
      right: (
        <div
          className={
            "hover:bg-slate-200 dark:hover:bg-slate-800 p-1 rounded-lg transition ease-in-out"
          }
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
      ),
    },
  ]);
  const [fieldSelectLimit, setFieldSelectLimit] = useState(1);

  const [optionListFields, setOptionListFields] = useState({});

  const onChangeOptionListFields = (e) => {
    setOptionListFields({
      ...optionListFields,
      [e.target.name]: e.target.value,
    });
  };

  const onCloseModal = () => {
    setOptionListFields({});
  };

  return (
    <Modal
      size={"xl"}
      buttonText={"Create Option List"}
      buttonVariant={"blue"}
      buttonSize={"sm"}
      onClose={onCloseModal}
    >
      <div className="flex flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-12 h-12 text-blue-600 mb-4"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm0 8.625a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM15.375 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zM7.5 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
            clipRule="evenodd"
          />
        </svg>

        <p className="text-lg font-semibold dark:text-white">{`Create Option List`}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-2">
          You are about to create an option list. This can be later attached to
          items in this menu.
        </p>

        <div className={"w-full mt-6"}>
          <h2 className="text-xl font-bold dark:text-white">
            Step 1: Create Options
          </h2>
          <p className={"text-sm text-slate-600 dark:text-slate-400"}>
            Use the below form to add as many options as you wish. When you are
            done with an option, click "Add" to add it to the option list you
            are creating.
          </p>
        </div>

        <div className="w-full mt-6 border-b pb-6 dark:border-slate-600">
          <div className={"w-full mr-4"}>
            <div className="mb-3">
              <Inputs
                dark
                isInput
                label={"Option Name"}
                placeholder={"Tomato"}
                cornerLabel={"Required"}
              />
            </div>
            <div className={"mb-3"}>
              <Inputs
                dark
                isInput
                label={"Option Description"}
                placeholder={"Nice tomato"}
                cornerLabel={"Optional"}
              />
            </div>
            <div className={"grid grid-cols-6 gap-4"}>
              <div className="col-span-6 sm:col-span-3">
                <Inputs
                  dark
                  isInput
                  type={"number"}
                  label={"Free Limit"}
                  placeholder={"2.50"}
                  cornerLabel={"Optional"}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <Inputs
                  dark
                  isInput
                  type={"number"}
                  label={"Select Limit"}
                  placeholder={"3"}
                  cornerLabel={"Optional"}
                />
              </div>
              <div className="col-span-6">
                <Inputs
                  dark
                  isInput
                  label={"Option Price"}
                  placeholder={"2.00"}
                  cornerLabel={"Optional"}
                />
              </div>
            </div>
          </div>

          <div className="mt-5">
            <Buttons variant={"transparent"} size={"sm"} full>
              Add
            </Buttons>
          </div>
        </div>

        <div className={"w-full mt-6 "}>
          <h2 className="text-xl font-bold dark:text-white">
            Step 2: Option List
          </h2>
          <p className={"text-sm text-slate-600 dark:text-slate-400"}>
            You have configured your options, it's time to tell us a bit more
            about what you want to tell the customer about the options
          </p>
        </div>

        <div className="w-full mt-6 pb-6 border-b dark:border-slate-600">
          <Inputs
            dark
            isInput
            label={"Option List ID"}
            placeholder={"Cheeseburger Toppings #1"}
            subLabel={
              "This is for you to identify this list later when creating an item. Customers will never see this."
            }
            cornerLabel={"Optional"}
            name={"optionListId"}
            value={optionListFields["optionListId"]}
            onChange={onChangeOptionListFields}
          />
          <div className="mt-3">
            <Inputs
              dark
              isInput
              label={"Options Limit"}
              subLabel={
                "What's the maximum amount of options a person can choose?"
              }
              placeholder={"1"}
              cornerLabel={"Required"}
              name={"optionsLimit"}
              value={optionListFields["optionsLimit"]}
              onChange={onChangeOptionListFields}
            />
          </div>
          <div className="mt-3">
            <Inputs
              dark
              isInput
              label={"Option List Name"}
              placeholder={"Burger Toppings"}
              cornerLabel={"Required"}
              name={"optionListName"}
              value={optionListFields["optionListName"]}
              onChange={onChangeOptionListFields}
            />
          </div>
          <div className="mt-3">
            <Inputs
              name={"optionListDescription"}
              value={optionListFields["optionListDescription"]}
              dark
              isTextArea
              label={"Option List Description"}
              placeholder={
                "Please choose the toppings you would like to be removed"
              }
              cornerLabel={"Optional"}
              onChange={onChangeOptionListFields}
            />
          </div>
        </div>

        <div className={"w-full mt-6 "}>
          <h2 className="text-xl font-bold dark:text-white">
            Step 3: Review Option List
          </h2>
          <p className={"text-sm text-slate-600 dark:text-slate-400"}>
            Please use the following demonstration to check if you are satisfied
            with the behaviour of your option list.
          </p>
        </div>

        <div className="w-full mt-6">
          <Inputs
            dark={true}
            isMultiselect={multiple}
            isRadio={!multiple}
            name={"optionLists"}
            fieldSelectLimit={fieldSelectLimit}
            onChange={() => {
              setUpdate(update + 1);
            }}
            label={
              <p>
                {optionListFields["optionListName"]}
                <br />
                <span
                  className={"font-normal dark:text-slate-400 text-slate-600"}
                >
                  {optionListFields["optionListDescription"]}
                </span>
              </p>
            }
            options={[
              ...options?.map((option) => {
                return {
                  limit: option.limit,
                  value: option.value,
                  text: option.text,
                  subText: option.subText,
                  right: option.right,
                };
              }),
            ]}
          />
        </div>
      </div>
    </Modal>
  );
};

// Used to create an option list
const CreateOptionListModal = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forceClose, setForceClose] = useState(0);

  const toggleModal = () => setForceClose(forceClose + 1);

  const callBack = (response, values) => {
    if (response.status.code === "create_optionlist_success") {
      toggleModal();
    }
  };

  return (
    <Modal
      size="lg"
      forceClose={forceClose}
      triggerComponentClasses="col-span-6"
      triggerComponent={
        <div className="col-span-6 md:col-span-3 lg:col-span-2 border px-3 py-3 rounded h-full border-dashed dark:border-slate-600 p-4 cursor-pointer dark:hover:bg-slate-800 hover:bg-slate-100 transition ease-in-out">
          <div className="flex items-center h-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mx-auto"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>
        </div>
      }
    >
      <div className="flex flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-12 h-12 text-blue-600 mb-4"
        >
          <path d="M10.5 1.875a1.125 1.125 0 012.25 0v8.219c.517.162 1.02.382 1.5.659V3.375a1.125 1.125 0 012.25 0v10.937a4.505 4.505 0 00-3.25 2.373 8.963 8.963 0 014-.935A.75.75 0 0018 15v-2.266a3.368 3.368 0 01.988-2.37 1.125 1.125 0 011.591 1.59 1.118 1.118 0 00-.329.79v3.006h-.005a6 6 0 01-1.752 4.007l-1.736 1.736a6 6 0 01-4.242 1.757H10.5a7.5 7.5 0 01-7.5-7.5V6.375a1.125 1.125 0 012.25 0v5.519c.46-.452.965-.832 1.5-1.141V3.375a1.125 1.125 0 012.25 0v6.526c.495-.1.997-.151 1.5-.151V1.875z" />
        </svg>

        <p className="text-lg font-semibold dark:text-white">{`Create an Option List`}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-2">
          Please enter the information in the form below to create an option
          list. You can later create options for this option list.
        </p>

        <div className="w-full mt-6">
          <DynamicForm
            button="Create Option List"
            buttonVariant="blue"
            buttonCallBack={callBack}
            buttonOnClick={menus.actions.createOptionList}
            dark={true}
            fields={[
              {
                key: "name",
                type: "text",
                label: "Option List ID",
                subLabel:
                  "You will use this to identify this option list later",
                placeholder: "E.g., burger-toppings",
                labelRight: "Required",
              },
              {
                key: "title",
                type: "text",
                label: "Title",
                subLabel: "Title for the customer to look at",
                placeholder: "E.g., Select your burger toppings",
                labelRight: "Required",
              },
              {
                key: "description",
                type: "textarea",
                label: "Description",
                labelRight: "Optional",
                placeholder:
                  "E.g., Select what you would like to remove from your burger",
              },
              {
                key: "maxSelectLimit",
                type: "number",
                label: "Maximum Number of Options",
                placeholder: "E.g., 1",
                subLabel: "Leave empty for unlimited",
                labelRight: "Optional",
              },
              {
                key: "minSelectLimit",
                type: "number",
                label: "Minimum Number of Options",
                placeholder: "E.g., 1",
                subLabel: "1 by default",
                labelRight: "Optional",
              },
            ]}
            hiddenValues={{
              menuId: props.menu.id?.toString(),
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

const AddOptionListItemModal = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forceClose, setForceClose] = useState(0);

  const toggleModal = () => setForceClose(forceClose + 1);

  const callBack = (response, values) => {
    if (response.status.code === "create_optionListItem_success") {
      toggleModal();
    }
  };

  const { menu, optionList } = props;

  return (
    <Modal
      size="lg"
      forceClose={forceClose}
      triggerComponentClasses="col-span-6"
      triggerComponent={
        <div className="col-span-6 md:col-span-3 lg:col-span-2 border px-3 py-3 rounded h-full border-dashed dark:border-slate-600 p-4 cursor-pointer dark:hover:bg-slate-800 hover:bg-slate-100 transition ease-in-out">
          <div className="flex items-center h-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mx-auto"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>
        </div>
      }
    >
      <div className="flex flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-12 h-12 text-blue-600 mb-4"
        >
          <path d="M10.5 1.875a1.125 1.125 0 012.25 0v8.219c.517.162 1.02.382 1.5.659V3.375a1.125 1.125 0 012.25 0v10.937a4.505 4.505 0 00-3.25 2.373 8.963 8.963 0 014-.935A.75.75 0 0018 15v-2.266a3.368 3.368 0 01.988-2.37 1.125 1.125 0 011.591 1.59 1.118 1.118 0 00-.329.79v3.006h-.005a6 6 0 01-1.752 4.007l-1.736 1.736a6 6 0 01-4.242 1.757H10.5a7.5 7.5 0 01-7.5-7.5V6.375a1.125 1.125 0 012.25 0v5.519c.46-.452.965-.832 1.5-1.141V3.375a1.125 1.125 0 012.25 0v6.526c.495-.1.997-.151 1.5-.151V1.875z" />
        </svg>

        <p className="text-lg font-semibold dark:text-white">{`Create an Option`}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-2">
          Please enter the information in the form below to create an option for
          option list with name{" "}
          <span className={"font-semibold"}>{optionList.name}</span>
        </p>

        <div className="w-full mt-6">
          <DynamicForm
            button="Create an Option"
            buttonVariant="blue"
            buttonCallBack={callBack}
            buttonOnClick={menus.actions.createOptionListItem}
            dark={true}
            fields={[
              {
                key: "title",
                type: "text",
                label: "Title of Option",
                subLabel: "Title for the customer to look at",
                placeholder: "E.g., Tomato",
                labelRight: "Required",
              },
              {
                key: "description",
                type: "textarea",
                label: "Description",
                labelRight: "Optional",
                placeholder: "E.g., Remove tomato from the burger",
              },
              {
                key: "price",
                type: "number",
                label: "Price of Option",
                placeholder: "0.00",
                subLabel: "Enter 0 for free",
                labelRight: "Required",
              },
              {
                key: "maxSelection",
                type: "number",
                label: "Maximum of this allowed",
                placeholder: "E.g., 1",
                subLabel: "Default: 1",
                labelRight: "Optional",
              },
              {
                key: "freeAllowance",
                type: "number",
                label: "Free Allowance",
                placeholder: "E.g., 1",
                subLabel: "Leave empty for 0",
                labelRight: "Optional",
              },
            ]}
            hiddenValues={{
              optionListId: optionList.id?.toString(),
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

const EditOptionListModal = (props) => {};

const OptionLists = (props) => {
  // get current menu id
  const { menuId } = useParams();

  const [update, setUpdate] = useState(0);

  const [loading, setLoading] = useState(
    !(
      menus.data.menuOptionLists[menuId] &&
      typeof menus.data.menuOptionLists[menuId] !== "undefined"
    ),
  );

  const [edit, setEdit] = useState(false);

  const toggleEdit = () => setEdit(!edit);

  // set current optionLists
  const [optionLists, setOptionLists] = useState(
    menus.data.menuOptionLists[menuId] || [],
  );
  // set currentMenu
  const [currentMenu, setCurrentMenu] = useState(
    menus.data.menuInsights[menuId] || {},
  );
  // retrieve optionLists
  useEffect(() => {
    menus.actions
      .getOptionLists({ menuId })
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  // subscribe to changes
  subscribe(menus.data, () => {
    setOptionLists(menus.data.menuOptionLists[menuId]);
    setCurrentMenu(menus.data.menuInsights[menuId]);
    setUpdate(update + 1);
  });

  return (
    <MenuTemplate tab="optionLists" tabName="Option Lists">
      <div className="col-span-6">
        <div className="flex items-center">
          <h2 className="text-2xl font-extrabold mr-4">Option Lists</h2>
          {/*<AddOptionListModal />*/}
        </div>

        {loading ? (
          <LoadingBox />
        ) : (
          <div className="mt-4">
            {!edit ? (
              <Buttons onClick={toggleEdit} size={"sm"} variant={"transparent"}>
                Edit
              </Buttons>
            ) : (
              <Buttons onClick={toggleEdit} size={"sm"} variant={"indigo"}>
                Done
              </Buttons>
            )}

            {!edit &&
            (optionLists?.length === 0 ||
              typeof optionLists === "undefined") ? (
              <div className={"mt-4"}>
                <div className={"max-w-lg"}>
                  <Alerts type={"info"} title={"No Option Lists"}>
                    You currently have no option lists. In order to start seeing
                    this, click "Edit" and start adding option lists.
                  </Alerts>
                </div>
              </div>
            ) : (
              ""
            )}

            <div className="grid grid-cols-6 gap-4 mt-3 max-w-2xl ">
              {edit ? <CreateOptionListModal menu={currentMenu} /> : ""}
              {optionLists?.map((optionList) => {
                return (
                  <ItemsMenuItem
                    edit={edit}
                    menu={currentMenu}
                    optionList={optionList}
                    multiple={true}
                    name={optionList.name}
                    title={optionList.title}
                    description={optionList.description}
                    fieldSelectLimit={optionList.maxSelectLimit}
                    options={optionList.optionListItems.map((item) => {
                      return {
                        limit: item.maxSelection,
                        value: item.id,
                        text: (
                          <>
                            {item.title}{" "}
                            {item.price !== 0.0 ? (
                              <span className={"font-light text-xs"}>
                                (
                                {item.freeAllowance > 0
                                  ? `For more than ${item.freeAllowance}, extra `
                                  : "Extra "}
                                &euro; {Number(item.price).toFixed(2)} each)
                              </span>
                            ) : (
                              ""
                            )}
                          </>
                        ),
                        subText: item.description,
                      };
                    })}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </MenuTemplate>
  );
};

export default OptionLists;
