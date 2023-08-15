import React, { useState } from "react";
import MenuTemplate from "../../Templates/MenuTemplate";
import Inputs from "../../Components/Inputs/Inputs";

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
  const [update, setUpdate] = useState(0);

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
                ...props.options?.map((option) => {
                  return {
                    limit: option.limit,
                    value: option.value,
                    text: option.text,
                    subText: option.subText,
                  };
                }),
              ]}
            />
          </div>
        </div>
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
              multiple
              name="Burger Toppings"
              description="Choose your toppings (Optional)"
              fieldSelectLimit={2}
              options={[
                {
                  limit: 2,
                  value: "tomato",
                  text: "Tomato",
                  subText: "Add tomato to your burger",
                },
                {
                  limit: 2,
                  value: "onion",
                  text: "Onion",
                  subText: "Add onion to your burger",
                },
                {
                  limit: 2,
                  value: "pickle",
                  text: "Pickle",
                  subText: "Add pickle to your burger",
                },
              ]}
            />

            <ItemsMenuItem
              multiple
              name="Burger Toppings"
              description="Choose your toppings (Optional)"
              fieldSelectLimit={2}
              options={[
                {
                  limit: 1,
                  value: "tomato2",
                  text: "Tomato",
                  subText: "Add tomato to your burger",
                },
                {
                  limit: 1,
                  value: "onion2",
                  text: "Onion",
                  subText: "Add onion to your burger",
                },
                {
                  limit: 1,
                  value: "pickle2",
                  text: "Pickle",
                  subText: "Add pickle to your burger",
                },
              ]}
            />

            <ItemsMenuItem
              name="Burger Toppings"
              description="Choose your toppings"
              options={[
                {
                  value: "cheese",
                  text: "Bacon",
                  subText: "Add tomato to your burger",
                },
                {
                  value: "bacon",
                  text: "Bacon",
                  subText: "Add onion to your burger",
                },
                {
                  value: "ketchup",
                  text: "Ketchup",
                  subText: "Add pickle to your burger",
                },
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
