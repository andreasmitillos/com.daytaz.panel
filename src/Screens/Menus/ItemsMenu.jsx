import React from "react";
import MenuTemplate from "../../Templates/MenuTemplate";

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
        <h2 className="text-4xl font-extrabold">Starters</h2>
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
            <AddMenuItem />
          </div>
        </div>
      </div>

      <div className="col-span-6 mt-12">
        <h2 className="text-4xl font-extrabold">Main Dishes</h2>
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
          <AddMenuItem />
        </div>
      </div>

      <div className="col-span-6 mt-12">
        <div className="col-span-6 mt-4">
          <h2 className="text-4xl font-extrabold">Desserts</h2>
          <div className="grid grid-cols-6 gap-4 mt-3">
            <ItemsMenuItem
              currency="EUR"
              price="12.50"
              name="Spaghetti Carbonara"
              description="Indulge in creamy egg, crispy pancetta, and pecorino coated strands of al dente pasta."
            />
            <AddMenuItem />
          </div>
        </div>
      </div>

      <div className="col-span-6 mt-12">
        <div className="col-span-6 mt-4">
          <h2 className="text-4xl font-extrabold">Drinks</h2>
          <h2 className="text-xl font-extrabold mt-3">Cold Drinks</h2>
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
            <AddMenuItem />
          </div>

          <h2 className="text-xl font-extrabold mt-6">Hot Drinks</h2>
          <div className="grid grid-cols-6 gap-4 mt-3">
            <ItemsMenuItem
              available={false}
              currency="EUR"
              price="3.50"
              name="Cyprus Coffee"
              description="Lol"
            />
            <AddMenuItem />
          </div>
        </div>
      </div>
    </MenuTemplate>
  );
};

export default ItemsMenu;
