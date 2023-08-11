import React from "react";
import MenuTemplate from "../../Templates/MenuTemplate";

const AddMenuItem = (props) => {
  return (
    <div className="col-span-6 md:col-span-3 border px-3 py-3 rounded h-full border-dashed dark:border-slate-600 p-4 cursor-pointer dark:hover:bg-slate-800 hover:bg-slate-100 transition ease-in-out">
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
    <div className="col-span-6 md:col-span-3 border px-3 py-3 rounded h-full dark:border-slate-600">
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
        <div className="pt-2 pb-2 font-light grow">
          <p className="text-slate-600 dark:text-slate-400">
            {props.description}
          </p>
          <div className="pl-2">
            {props.options.map((option) => (
              <div className="flex items-center mt-2">
                <input
                  type={props.multiple ? "checkbox" : "radio"}
                  className="rounded-2xl mr-3 w-4 h-4 outline-none accent-indigo-500"
                />
                <span>{option.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* <div className="flex items-center pt-3 border-t dark:border-slate-600">
          <div className="grow">
            <div className="text-xs flex bg-indigo-100 dark:bg-indigo-300 p-1 px-2.5 rounded-full font-semibold text-indigo-800 w-fit">
              {props.currency} {props.price}
            </div>
          </div>

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
        </div> */}
      </div>
    </div>
  );
};

const OptionLists = (props) => {
  return (
    <MenuTemplate tab="optionLists" tabName="Option Lists">
      <div className="col-span-6">
        <h2 className="text-4xl font-extrabold">Option Lists</h2>

        <div className="col-span-6 mt-4">
          <div className="grid grid-cols-6 gap-4 mt-3">
            <ItemsMenuItem
              name="Burger Side"
              description="Choose your side (Required)"
              options={[
                { name: "Chilli Fries" },
                { name: "Truffle Fries (+ EUR 0.50)" },
                { name: "Bone Marrow Mash" },
                { name: "Vegetables" },
              ]}
            />

            <ItemsMenuItem
              multiple
              name="Burger Toppings"
              description="Choose your toppings (Optional)"
              options={[
                { name: "Tomatoe" },
                { name: "Onion" },
                { name: "Pickles" },
              ]}
            />

            <ItemsMenuItem
              multiple
              name="Burger Toppings"
              description="Choose your toppings"
              options={[
                { name: "Tomatoe" },
                { name: "Onion" },
                { name: "Pickles" },
              ]}
            />
            <AddMenuItem />
          </div>
        </div>
      </div>
    </MenuTemplate>
  );
};

export default OptionLists;
