import React, { useEffect, useState } from "react";
import MenuTemplate from "../../Templates/MenuTemplate";
import Modal from "../../Components/Modal/Modal";
import Buttons from "../../Components/Inputs/Buttons";
import Input from "../../Components/Inputs/Inputs";
import { useParams } from "react-router-dom";
import { menus } from "../../State";
import LoadingBox from "../../Components/LoadingBox";
import { subscribe } from "valtio";
import Alerts from "../../Components/Alerts/Alerts";
import DynamicForm from "../../Components/Forms/DynamicForm";
import IconForm from "../../Components/Forms/IconForm";

// Edit Modal
const EditModal = (props) => {
  let { subCategory, category, menuId } = props;

  const [forceClose, setForceClose] = useState(0);

  const [update, setUpdate] = useState(0);

  // Callback for Dynamic Form
  const callBack = (response, values) => {
    // toggleModal();
    setUpdate(update + 1);
    if (response.status.code === "edit_category_success") {
      toggleModal();
    }

    if (response.status.code === "edit_subcategory_success") {
      toggleModal();
    }
  };

  let toggleModal = () => setForceClose(forceClose + 1);

  let fields = {};

  if (category?.id) fields.categoryId = category?.id.toString();
  if (subCategory?.id) fields.subCategoryId = subCategory?.id.toString();

  return (
    <Modal
      forceClose={forceClose}
      size="md"
      triggerComponent={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`${
            props.subCategory ? "w-6 h-6" : "w-7 h-7"
          } mr-2 text-blue-600 dark:text-blue-500 p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition ease-in-out cursor-pointer`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      }
    >
      <div className="flex flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12 text-indigo-600 mb-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>

        <p className="text-lg font-semibold dark:text-white">
          Edit {props.subCategory ? "Subcategory" : "Category"}
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-2">
          You are about to edit Cold Drinks. Please make sure you are sure about
          this action.
        </p>

        <div className="w-full mt-6">
          <DynamicForm
            button={`Edit ${subCategory ? "Subcategory" : "Category"}`}
            buttonVariant="indigo"
            buttonCallBack={callBack}
            buttonOnClick={
              props.subCategory
                ? menus.actions.editSubcategory
                : menus.actions.editCategory
            }
            fields={[
              {
                key: "name",
                type: "text",
                label: `${subCategory ? "Subcategory" : "Category"} Name`,
                placeholder: subCategory?.name || category?.name,
              },
              {
                key: "description",
                type: "textarea",
                label: `${subCategory ? "Subcategory" : "Category"} Name`,
                placeholder: subCategory?.description || category?.description,
              },
            ]}
            hiddenValues={fields}
          />
        </div>
      </div>
    </Modal>
  );
};

// Remove Modal
const RemoveModal = (props) => {
  return (
    <Modal
      size="md"
      triggerComponent={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`${
            props.subCategory ? "w-6 h-6" : "w-7 h-7"
          } mr-2 text-red-600 p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition ease-in-out cursor-pointer`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      }
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

        <p className="text-lg font-semibold dark:text-white">
          Delete {props.subCategory ? "Subcategory" : "Category"}
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-2">
          You are about to remove Cold Drinks from Drinks. Make sure that you
          really want to do this.
        </p>

        <div className="mt-8 w-full">
          <Buttons size="sm" variant="red" full>
            Delete {props.subCategory ? "Subcategory" : "Category"}
          </Buttons>
        </div>
      </div>
    </Modal>
  );
};

// Create Category or Subcategory
const CreateCategorySubcategoryModal = (props) => {
  let { category, menu } = props;

  let menuId = menu?.id;
  let categoryId = category?.id;

  const [loading, setLoading] = useState(false);
  const [forceClose, setForceClose] = useState(0);

  const toggleModal = () => setForceClose(forceClose + 1);

  const callBack = (response, values) => {
    if (
      response.status.code === "category_created" ||
      response.status.code === "subCategory_created"
    ) {
      toggleModal();
      // menus.actions
      //   .getRestaurant({ restaurantId: props.restaurant.id })
      //   .then((res) => {
      //     toggleModal();
      //   })
      //   .catch((error) => {
      //     toggleModal();
      //   });
    }
  };

  return (
    <Modal
      forceClose={forceClose}
      size="lg"
      triggerComponentClasses="col-span-6 sm:col-span-3 lg:col-span-2"
      triggerComponent={
        <div className="col-span-6 sm:col-span-3 lg:col-span-2 border px-3 py-3 rounded h-full border-dashed dark:border-slate-600 p-4 cursor-pointer dark:hover:bg-slate-800 hover:bg-slate-100 transition ease-in-out">
          <div className="flex items-center h-full py-4 w-fit mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-9 h-9 text-slate-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 6h.008v.008H6V6z"
              />
            </svg>

            <div
              className={`flex flex-col text-left ml-4 ${
                category ? "text-indigo-600 dark:text-indigo-400" : ""
              }`}
            >
              <span className="font-bold text-sm max-w-full">
                Create new{" "}
                {category ? `Subcategory for ${category.name}` : "Category"}
              </span>
              <span className="text-xs font-light text-slate-600 dark:text-slate-400">
                E.g., {category ? "Drinks" : "Cold Drinks"}
              </span>
            </div>
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
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
            clipRule="evenodd"
          />
        </svg>

        <p className="text-lg font-semibold dark:text-white">
          Create {category ? `Subcategory for ${category.name}` : " Category"}
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-2">
          You are about to create a new
          {category ? ` Subcategory for ${category.name}` : ` Category `} of
          your menu.
        </p>

        <div className={"w-full mt-6"}>
          {menuId ? (
            <DynamicForm
              button={`Create Category`}
              buttonVariant="blue"
              buttonCallBack={callBack}
              buttonOnClick={menus.actions.createCategory}
              fields={[
                {
                  key: "name",
                  type: "text",
                  label: `Category Name`,
                  placeholder: "E.g., Starters",
                },
                {
                  key: "description",
                  type: "textarea",
                  label: "Category Description",
                  placeholder: "E.g., Enabled at 13:00",
                },
              ]}
              hiddenValues={{ menuId: menuId.toString() }}
            />
          ) : (
            <DynamicForm
              button={`Create Subcategory`}
              buttonVariant="blue"
              buttonCallBack={callBack}
              buttonOnClick={menus.actions.createSubCategory}
              fields={[
                {
                  key: "name",
                  type: "text",
                  label: `Subcategory Name`,
                  placeholder: "E.g., Cold Drinks",
                },
                {
                  key: "description",
                  type: "textarea",
                  label: "Subcategory Description",
                  placeholder: "E.g., These are the Cold Drinks",
                },
              ]}
              hiddenValues={{ categoryId: categoryId.toString() }}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

// Create new Item Modal
const CreateItemModal = (props) => {
  let { category, subCategory, menu } = props;
  const [forceClose, setForceClose] = useState(0);
  const { menuId } = useParams();

  let dietaryRestrictions = menu.dietaryRestrictions;
  let allergyTags = menu.allergyTags;

  const [loading, setLoading] = useState(
    !(
      menus.data.menuOptionLists[menuId] &&
      typeof menus.data.menuOptionLists[menuId] !== "undefined"
    ),
  );

  // set current optionLists
  const [optionLists, setOptionLists] = useState(
    menus.data.menuOptionLists[menuId] || [],
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
  });

  // Toggle Close Modal
  const toggleModal = () => setForceClose(forceClose + 1);

  // Callback for Dynamic Form
  const callBack = (response, values) => {
    // toggleModal();
    if (response.status.code === "create_item_success") {
      toggleModal();
    }
  };

  return (
    <Modal
      size="xl"
      triggerComponentClasses="col-span-6 sm:col-span-3 lg:col-span-2"
      triggerComponent={<AddMenuItem />}
      forceClose={forceClose}
    >
      <div className="flex flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-12 h-12 text-indigo-600 mb-4"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
            clipRule="evenodd"
          />
        </svg>

        <p className="text-lg font-semibold dark:text-white">
          Create new item for {category?.name || subCategory?.name}
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-2">
          Add a new item to {subCategory?.name || category?.name} by completing
          the fields below.
        </p>
        {loading ? (
          <LoadingBox />
        ) : (
          <div className="w-full mt-6">
            <div className="grid grid-cols-6 gap-4">
              <div className="col-span-6">
                <DynamicForm
                  button={"Create Item"}
                  buttonVariant={"indigo"}
                  buttonCallBack={callBack}
                  buttonOnClick={menus.actions.createItem}
                  fields={[
                    [
                      {
                        key: "name",
                        type: "string",
                        label: "Item Name",
                        placeholder: "E.g., Pasta",
                      },
                      {
                        key: "price",
                        type: "number",
                        label: "Price (EUR)",
                        placeholder: "E.g., 13.50",
                        icon: (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.902 7.098a3.75 3.75 0 013.903-.884.75.75 0 10.498-1.415A5.25 5.25 0 008.005 9.75H7.5a.75.75 0 000 1.5h.054a5.281 5.281 0 000 1.5H7.5a.75.75 0 000 1.5h.505a5.25 5.25 0 006.494 2.701.75.75 0 00-.498-1.415 3.75 3.75 0 01-4.252-1.286h3.001a.75.75 0 000-1.5H9.075a3.77 3.77 0 010-1.5h3.675a.75.75 0 000-1.5h-3c.105-.14.221-.274.348-.402z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ),
                      },
                    ],
                    {
                      key: "description",
                      type: "textarea",
                      label: "Item Description",
                      placeholder: "E.g., Nice Pasta",
                    },
                    {
                      key: "optionLists",
                      isSelect: true,
                      multiple: true,
                      labelRight: "Optional",
                      label: "Option Lists",
                      placeholder: "E.g., Pasta",
                      options: optionLists?.map((o) => {
                        return {
                          value: o.id,
                          label: o.name,
                        };
                      }),
                    },
                    {
                      key: "allergyTags",
                      isSelect: true,
                      multiple: true,
                      labelRight: "Optional",
                      label: "Allergy Tags",
                      placeholder: "E.g., Peanuts",
                      options: allergyTags?.map((o) => {
                        return {
                          value: o.id,
                          label: o.name,
                        };
                      }),
                    },
                    {
                      key: "dietaryRestrictions",
                      isSelect: true,
                      multiple: true,
                      labelRight: "Optional",
                      label: "Dietary Restrictions",
                      placeholder: "E.g., Vegan",
                      options: dietaryRestrictions?.map((o) => {
                        return {
                          value: o.id,
                          label: `${o.acronym} - ${o.name}`,
                        };
                      }),
                    },
                  ]}
                  hiddenValues={{
                    categoryId: category?.id.toString(),
                    subCategoryId: subCategory?.id.toString(),
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

const CategoryControls = (props) => {
  const [update, setUpdate] = useState(0);

  let fields = {};
  if (props.subCategory)
    fields.subCategoryId = props.subCategory?.id.toString();
  if (props.category) fields.categoryId = props.category?.id.toString();

  let callBack = () => {
    setUpdate(update + 1);
  };

  return (
    <div className="flex items-center ml-2">
      {/*<DynamicForm />*/}
      {props.first || props.single ? (
        ""
      ) : (
        <IconForm
          callBack={callBack}
          action={
            props.subCategory
              ? menus.actions.editSubcategory
              : menus.actions.editCategory
          }
          values={{ ...fields, moveUp: true }}
          closeCode={
            props.subCategory
              ? "edit_subcategory_success"
              : "edit_category_success"
          }
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`${
                props.subCategory ? "w-6 h-6" : "w-7 h-7"
              } text-slate-600 dark:text-slate-400 p-1 rounded hover:bg-slate-100 transition ease-in-out cursor-pointer dark:hover:bg-slate-800`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>
          }
          containerClass={`mr-2`}
          loadingIconClass={"text-blue-600 dark:text-blue-400 w-5 h-5"}
          loadingIconContainerClass={
            "p-1 rounded bg-slate-100 transition ease-in-out dark:bg-slate-800 cursor-not-allowed"
          }
        />
      )}

      {props.last || props.single ? (
        ""
      ) : (
        <IconForm
          callBack={callBack}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`${
                props.subCategory ? "w-6 h-6" : "w-7 h-7"
              } mr-2 text-slate-600 dark:text-slate-400 p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition ease-in-out cursor-pointer`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          }
          action={
            props.subCategory
              ? menus.actions.editSubcategory
              : menus.actions.editCategory
          }
          values={{ ...fields, moveDown: true }}
          closeCode={
            props.subCategory
              ? "edit_subcategory_success"
              : "edit_category_success"
          }
          containerClass={`mr-2`}
          loadingIconClass={"text-blue-600 dark:text-blue-400 w-5 h-5"}
          loadingIconContainerClass={
            "p-1 rounded bg-slate-100 transition ease-in-out dark:bg-slate-800 cursor-not-allowed"
          }
        />
      )}

      {/* Edit */}
      <EditModal
        subCategory={props.subCategory}
        category={props.category}
        menuId={props.menuId}
      />

      {/* Delete */}
      <RemoveModal subCategory={props.subCategory ? true : false} />
    </div>
  );
};

const AddMenuItem = (props) => {
  return (
    <div className="col-span-6 sm:col-span-3 lg:col-span-2 border px-3 py-3 rounded h-full border-dashed dark:border-slate-600 p-4 cursor-pointer dark:hover:bg-slate-800 hover:bg-slate-100 transition ease-in-out">
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
  let { item } = props;
  return (
    <div className="col-span-6 sm:col-span-3 lg:col-span-2 border px-3 py-3 rounded h-full dark:border-slate-600">
      {/* Top Row */}
      <div className="flex flex-col h-full">
        {props.item?.optionLists?.length > 0 ? (
          <div
            className={
              "w-full text-xs text-slate-500 dark:text-slate-400 mr-1.5"
            }
          >
            {props.item?.optionLists?.map((optionList) => (
              <span
                className={
                  "bg-slate-100 dark:bg-slate-700 rounded px-1 py-0.5 mr-1 inline-block mb-0.5"
                }
              >
                {optionList.name}
              </span>
            ))}
          </div>
        ) : (
          ""
        )}
        <div className="flex items-center">
          {/* Item Name */}
          <p className="font-bold grow">{props.name}</p>
          <p className="text-sm text-indigo-600 dark:text-indigo-400 cursor-pointer">
            View
          </p>
        </div>

        {/* Description */}
        <div className="pt-2 pb-3 font-light grow">
          <p className="text-slate-600 dark:text-slate-400">
            {props.description}
          </p>
        </div>

        {item?.allergyTags?.length > 0 ||
        item?.dietaryRestrictions?.length > 0 ? (
          <div className={"text-slate-500 dark:text-slate-400 my-2"}>
            {item?.dietaryRestrictions?.length > 0 ? (
              <div className={"text-xs"}>
                <p>
                  <span className={"font-semibold"}>
                    Dietary Restrictions:{" "}
                  </span>
                  {item.dietaryRestrictions?.map(
                    (d, index) =>
                      `${
                        index > 0 && item?.dietaryRestrictions?.length > 1
                          ? `, ${d.acronym} - ${d.name}`
                          : `${d.acronym} - ${d.name}`
                      }`,
                  )}
                </p>
              </div>
            ) : (
              ""
            )}

            {item?.allergyTags?.length > 0 ? (
              <div className={"text-xs"}>
                <p>
                  <span className={"font-semibold"}>Allergy Tags: </span>
                  {item.allergyTags?.map(
                    (d, index) =>
                      `${
                        index > 0 && item?.allergyTags.length > 1 ? ", " : ""
                      }${d.name}`,
                  )}
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}

        {/* Bottom Row */}
        <div className="flex items-center pt-3 border-t dark:border-slate-600">
          {/* Item Name */}
          {/* <p className="font-bold grow"></p> */}
          <div className="grow">
            <div className="text-xs flex bg-indigo-100 dark:bg-indigo-300 p-1 px-2.5 rounded-full font-semibold text-indigo-800 w-fit">
              {props.currency} {props.price}
            </div>
          </div>

          {/* Available */}
          <div
            className={`text-xs flex p-1 pl-2.5 rounded-full font-semibold ${
              props.available
                ? "bg-green-100 dark:bg-green-400 text-green-900"
                : "bg-slate-100 dark:bg-slate-400 text-slate-900"
            } `}
          >
            {props.available ? "Available" : "Unavailable"}
            <span
              className={`flex ml-2 ${
                props.available
                  ? "bg-green-400 dark:bg-green-600"
                  : "bg-slate-400 dark:bg-slate-600"
              } w-4 h-4 rounded-full`}
            ></span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ItemsMenu = (props) => {
  let { menuId } = useParams();
  const [state, setState] = useState({ value: 10 });
  const [editLock, setEditLock] = useState(false);
  const [currentMenu, setCurrentMenu] = useState(menus.data.menu[menuId] || {});
  const [loading, setLoading] = useState(
    !(menus.data.menu[menuId] && menus.data.menu[menuId].id),
  );
  const [update, setUpdate] = useState(0);

  // Subscribe to menu changes
  subscribe(menus.data, () => {
    if (typeof menus.data.menu[menuId] !== "undefined") {
      setCurrentMenu(menus.data.menu[menuId]);
      setUpdate(update + 1);
    }
  });

  // Get Menu
  useEffect(() => {
    // if menu has been retrieved, remove loading bar
    if (currentMenu?.id) setLoading(false);
    // get menu
    menus.actions
      .getItems({ menuId })
      .then((res) => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  // Toggle Edit Lock
  const toggleEditLock = () => setEditLock(!editLock);

  return (
    <MenuTemplate tab="items" tabName="Items">
      {loading || !currentMenu.id ? (
        <LoadingBox />
      ) : (
        <>
          <div className="col-span-6 mb-4">
            {!editLock ? (
              <Buttons size="md" variant="transparent" onClick={toggleEditLock}>
                Edit Menu
              </Buttons>
            ) : (
              <Buttons size="md" variant="indigo" onClick={toggleEditLock}>
                Finish
              </Buttons>
            )}
          </div>

          {!editLock && currentMenu?.categories?.length === 0 ? (
            <div className={"max-w-lg"}>
              <Alerts type={"info"} title={"Menu is Empty"}>
                This menu is empty. In order to start seeing this, click "Edit
                Menu" and start adding categories, to give you the ability to
                start creating items.
              </Alerts>
            </div>
          ) : (
            ""
          )}

          {currentMenu?.categories?.map((category, index) => (
            <div
              className={`col-span-6 pb-12 ${
                !editLock ? "" : "border-b"
              } dark:border-slate-600 ${editLock && index > 0 ? "mt-8" : ""}`}
            >
              {/* Name of Category and Category Controls */}
              <div className="flex items-center">
                <h2 className="text-4xl font-extrabold mr-2">
                  {category.name}
                </h2>
                {!editLock ? (
                  ""
                ) : (
                  //   Category controls - remove, change position and edit
                  <CategoryControls
                    first={index === 0}
                    last={index === currentMenu.categories?.length - 1}
                    category={category}
                    menuId={menuId}
                  />
                )}
              </div>

              {/* Description of Category */}
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                {category.description}
              </p>

              <div className="col-span-6 mt-4">
                <div className="grid grid-cols-6 gap-4 mt-3">
                  {!editLock && category.items?.length === 0 ? (
                    <div className="col-span-6 sm:col-span-3 lg:col-span-2 border px-3 py-3 rounded h-full dark:border-slate-600">
                      <div className="flex flex-col items-center text-sm py-4 text-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.0}
                          stroke="currentColor"
                          className="w-10 h-10 text-slate-500 mb-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                          />
                        </svg>

                        <p className="font-semibold">No Items</p>
                        <p className="font-normal text-slate-600 dark:text-slate-400 mt-1">
                          We found no items under the category named{" "}
                          {category.name}
                        </p>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {category.items?.map((categoryItem) => (
                    <ItemsMenuItem
                      currency={<>&euro;</>}
                      price={Number(categoryItem.price).toFixed(2)}
                      name={categoryItem.name}
                      description={categoryItem.description}
                      available={categoryItem.available}
                      item={categoryItem}
                    />
                  ))}
                  {!editLock ? (
                    ""
                  ) : (
                    <CreateItemModal menu={currentMenu} category={category} />
                  )}
                </div>

                {category.subCategories?.map((subCat, index) => (
                  <>
                    <div className="flex items-center mt-6">
                      <h2 className="text-xl font-extrabold mr-2">
                        {subCat.name}
                      </h2>
                      {!editLock ? (
                        ""
                      ) : (
                        <CategoryControls
                          first={index === 0}
                          last={index === category.subCategories?.length - 1}
                          subCategory={subCat}
                          menuId={menuId}
                        />
                      )}
                    </div>

                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      {subCat.description}
                    </p>

                    <div className="grid grid-cols-6 gap-4 mt-3">
                      {!editLock && subCat.items?.length === 0 ? (
                        <div className="col-span-6 sm:col-span-3 lg:col-span-2 border px-3 py-3 rounded h-full dark:border-slate-600">
                          <div className="flex flex-col items-center text-sm py-4 text-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.0}
                              stroke="currentColor"
                              className="w-10 h-10 text-slate-500 mb-4 dark:text-slate-400"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                              />
                            </svg>

                            <p className="font-semibold">No Items</p>
                            <p className="font-normal text-slate-600 dark:text-slate-400 mt-1">
                              We found no items under the subcategory named{" "}
                              {subCat.name}
                            </p>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}

                      {subCat.items?.map((item) => (
                        <ItemsMenuItem
                          available={item.available}
                          currency={<>&euro;</>}
                          price={Number(item.price).toFixed(2)}
                          name={item.name}
                          description={item.description}
                          item={item}
                        />
                      ))}
                      {!editLock ? (
                        ""
                      ) : (
                        <CreateItemModal
                          menu={currentMenu}
                          subCategory={subCat}
                        />
                      )}
                    </div>
                  </>
                ))}

                <div className="grid grid-cols-6 mt-6 gap-4">
                  {!editLock || !category.id ? (
                    ""
                  ) : (
                    <CreateCategorySubcategoryModal category={category} />
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className={`col-span-6`}>
            <div className="grid grid-cols-6 gap-4 my-6">
              {!editLock || !currentMenu.id ? (
                ""
              ) : (
                <CreateCategorySubcategoryModal menu={currentMenu} />
              )}
            </div>
          </div>
        </>
      )}
    </MenuTemplate>
  );
};

export default ItemsMenu;
