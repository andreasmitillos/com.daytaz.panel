import React from "react";
import MenuTemplate from "../../Templates/MenuTemplate";
import Modal from "../../Components/Modal/Modal";
import Buttons from "../../Components/Inputs/Buttons";
import Input from "../../Components/Inputs/Inputs";

// Edit Modal
const EditModal = (props) => {
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
          className="w-12 h-12 text-blue-600 mb-4"
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
          <Input
            isInput
            label={`${props.subCategory ? "Subcategory" : "Category"} Name`}
            subLabel="This change will be public"
            placeholder="Cold Drinks"
            value="Very Cold Drinks"
            disabled
          />
        </div>

        <div className="w-full mt-6">
          <Buttons size="sm" variant="blue" full loading>
            Edit {props.subCategory ? "Subcategory" : "Category"}
          </Buttons>
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
  let { category, subCategory } = props;

  return (
    <Modal
      size="md"
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
                subCategory ? "text-indigo-600 dark:text-indigo-400" : ""
              }`}
            >
              <span className="font-bold text-sm max-w-full">
                Create new {subCategory ? "Subcategory for " : "Category"}
                {subCategory || category}
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
          Create {subCategory ? `Subcategory for ${subCategory}` : "Category"}
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-2">
          You are about to create a new
          {subCategory ? ` Subcategory for ${subCategory} ` : " Category "} for
          your menu.
        </p>

        <div className="w-full mt-6">
          <Input
            isInput
            label={`${subCategory ? "Subcategory" : "Category"} Name`}
            subLabel="This will be public"
            placeholder={subCategory ? "E.g., Cold Drinks" : "E.g., Drinks"}
          />
        </div>

        <div className="w-full mt-6">
          <Input
            isTextArea
            label={`${subCategory ? "Subcategory" : "Category"} Description`}
            subLabel="This will be public"
            placeholder={
              subCategory
                ? "E.g., These are the cold drinks"
                : "E.g., This is the Drink Menu"
            }
          />
        </div>

        <div className="w-full mt-6">
          <Buttons size="sm" variant="blue" full>
            Create {subCategory ? "Subcategory" : "Category"}
          </Buttons>
        </div>
      </div>
    </Modal>
  );
};

// Create new Item Modal
const CreateItemModal = (props) => {
  let { category, subCategory } = props;

  return (
    <Modal
      size="xl"
      triggerComponentClasses="col-span-6 sm:col-span-3 lg:col-span-2"
      triggerComponent={<AddMenuItem />}
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
          Create new item for {subCategory || category}
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-2">
          Add a new item to {subCategory || category} by completing the fields
          below.
        </p>

        <div className="w-full mt-6">
          <div className="grid grid-cols-6 gap-4">
            <div className="col-span-4">
              <Input
                isInput
                label={`Item Name`}
                placeholder={"E.g., Item Name"}
              />
            </div>
            <div className="col-span-2">
              <Input
                isInput
                type="number"
                label="Price (EUR)"
                placeholder="1.50"
                icon={
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
                }
              />
            </div>
          </div>
        </div>

        <div className="w-full mt-6">
          <Input
            isTextArea
            label={`Item Description`}
            placeholder="E.g., this is the new menu item"
          />
        </div>

        <div className="w-full mt-6">
          <Buttons size="sm" variant="indigo" full>
            Create Item
          </Buttons>
        </div>
      </div>
    </Modal>
  );
};

const CategoryControls = (props) => {
  return (
    <div className="flex items-center ml-2">
      {props.first || props.single ? (
        ""
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`${
            props.subCategory ? "w-6 h-6" : "w-7 h-7"
          } mr-2 text-slate-600 dark:text-slate-400 p-1 rounded hover:bg-slate-100 transition ease-in-out cursor-pointer dark:hover:bg-slate-800`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 15.75l7.5-7.5 7.5 7.5"
          />
        </svg>
      )}

      {props.last || props.single ? (
        ""
      ) : (
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
      )}

      {/* Edit */}
      <EditModal subCategory={props.subCategory ? true : false} />

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
  return (
    <div className="col-span-6 sm:col-span-3 lg:col-span-2 border px-3 py-3 rounded h-full dark:border-slate-600">
      {/* Top Row */}
      <div className="flex flex-col h-full">
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
  return (
    <MenuTemplate tab="items" tabName="Items">
      <div className="col-span-6">
        <div className="flex items-center">
          <h2 className="text-4xl font-extrabold mr-2">Starters</h2>
          <CategoryControls first />
        </div>
        <p className="text-slate-600 text-sm">
          Embark on a culinary journey with our exquisite starters.
        </p>

        <div className="col-span-6 mt-4">
          <div className="grid grid-cols-6 gap-4 mt-3">
            <ItemsMenuItem
              currency="EUR"
              price="12.50"
              name="Spaghetti Carbonara"
              description="Indulge in creamy egg, crispy pancetta, and pecorino coated strands of al dente pasta."
            />
            <ItemsMenuItem
              available={true}
              currency="EUR"
              price="13.50"
              name="Spaghetti Bolognese"
              description="Delectable blend of hearty meat sauce and perfectly cooked pasta, a timeless Italian masterpiece."
            />
            <CreateItemModal category="Starters" />
          </div>

          <div className="grid grid-cols-6 mt-6 gap-4">
            <CreateCategorySubcategoryModal subCategory="Starters" />
          </div>
        </div>
      </div>

      <div className="col-span-6 mt-12 border-t dark:border-slate-600">
        <div className="col-span-6 mt-4">
          <div className="flex items-center">
            <h2 className="text-4xl font-extrabold mr-2">Main Dishes</h2>
            <CategoryControls />
          </div>
          <div className="grid grid-cols-6 gap-4 mt-3">
            <ItemsMenuItem
              currency="EUR"
              price="12.50"
              name="Spaghetti Carbonara"
              description="Indulge in creamy egg, crispy pancetta, and pecorino coated strands of al dente pasta."
            />
            <ItemsMenuItem
              available={true}
              currency="EUR"
              price="13.50"
              name="Spaghetti Bolognese"
              description="Delectable blend of hearty meat sauce and perfectly cooked pasta, a timeless Italian masterpiece."
            />
            <ItemsMenuItem
              currency="EUR"
              price="18.50"
              name="Sirloin Steak"
              description="Juicy sirloin steak, seared to perfection, a carnivore's dream on a plate."
            />
            <ItemsMenuItem
              currency="EUR"
              price="21.50"
              name="Tomahawk Steak"
              description="Show-stopping tomahawk steak, impressive in size, unparalleled in flavor, a carnivore's delight."
            />
            <CreateItemModal category="Main Dishes" />
          </div>
          <div className="grid grid-cols-6 mt-6 gap-4">
            <CreateCategorySubcategoryModal subCategory="Main Dishes" />
          </div>
        </div>
      </div>

      <div className="col-span-6 mt-12 border-t dark:border-slate-600">
        <div className="col-span-6 mt-4">
          <div className="flex items-center">
            <h2 className="text-4xl font-extrabold mr-2">Desserts</h2>
            <CategoryControls />
          </div>
          <div className="grid grid-cols-6 gap-4 mt-3">
            <ItemsMenuItem
              currency="EUR"
              price="12.50"
              name="Spaghetti Carbonara"
              description="Indulge in creamy egg, crispy pancetta, and pecorino coated strands of al dente pasta."
            />
            <CreateItemModal category="Desserts" />
          </div>
          <div className="grid grid-cols-6 mt-6 gap-4">
            <CreateCategorySubcategoryModal subCategory="Desserts" />
          </div>
        </div>
      </div>

      <div className="col-span-6 mt-12 border-t dark:border-slate-600">
        <div className="col-span-6 mt-4">
          {/* Drinks */}
          <div className="flex items-center">
            <h2 className="text-4xl font-extrabold mr-2">Drinks</h2>
            <CategoryControls last />
          </div>

          {/* Subcategory - Cold Drinks */}
          <div className="flex items-center mt-3">
            <h2 className="text-xl font-extrabold mr-2">Cold Drinks</h2>
            <CategoryControls first subCategory />
          </div>
          <div className="grid grid-cols-6 gap-4 mt-3">
            <ItemsMenuItem
              available
              currency="EUR"
              price="2.50"
              name="Coca Cola"
              description="Not Pepsi"
            />
            <ItemsMenuItem
              available
              currency="EUR"
              price="2.50"
              name="Pepsi"
              description="Lol"
            />
            <CreateItemModal subCategory="Cold Drinks" />
          </div>

          <div className="flex items-center mt-6">
            <h2 className="text-xl font-extrabold mr-2">Hot Drinks</h2>
            <CategoryControls last subCategory />
          </div>
          <div className="grid grid-cols-6 gap-4 mt-3">
            <ItemsMenuItem
              available={false}
              currency="EUR"
              price="3.50"
              name="Cyprus Coffee"
              description="Lol"
            />
            <CreateItemModal subCategory="Hot Drinks" />
          </div>
          <div className="grid grid-cols-6 mt-6 gap-4">
            <CreateCategorySubcategoryModal subCategory="Drinks" />
          </div>
        </div>
      </div>

      <div className="col-span-6 mt-12 border-t dark:border-slate-600">
        <div className="grid grid-cols-6 gap-4 my-6">
          <CreateCategorySubcategoryModal category />
        </div>
      </div>
    </MenuTemplate>
  );
};

export default ItemsMenu;
