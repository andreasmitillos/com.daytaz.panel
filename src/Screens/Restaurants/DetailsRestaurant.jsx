import React, { useState } from "react";

import RestaurantTemplate from "../../Templates/RestaurantTemplate";
import GeneralCard from "../../Components/Card/GeneralCard";
import { restaurants } from "../../State";
import { useParams } from "react-router-dom";
import { subscribe } from "valtio";

const DetailsRestaurant = (props) => {
  const { restaurantId } = useParams();

  const [currentRestaurant, setCurrentRestaurant] = useState(
    restaurants.data.retrievedRestaurants[restaurantId] || {}
  );

  subscribe(restaurants.data.retrievedRestaurants, () => {
    setCurrentRestaurant(restaurants.data.retrievedRestaurants[restaurantId]);
  });

  return (
    <RestaurantTemplate tab="details" tabName="/Details">
      <div className="col-span-6">
        <h2 className="text-2xl font-extrabold">General Details</h2>

        <div className="grid grid-cols-6 lg:gap-12 gap-6 mt-3 mb-6">
          <div className="lg:col-span-1 col-span-6">
            {/* <GeneralCard title={"Details"}>asd</GeneralCard> */}
            <div className="flex items-center text-slate-600 text-sm font-semibold dark:text-slate-400">
              <p>Name</p>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 ml-1 text-blue-600 dark:text-blue-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </div>

            <p className="text-sm font-semibold ">
              <input
                className="outline-none focus:border-b border-dashed bg-transparent w-full"
                value={currentRestaurant.name}
              />
            </p>
          </div>

          <div className="lg:col-span-2 col-span-6">
            {/* <GeneralCard title={"Details"}>asd</GeneralCard> */}
            <div className="flex items-center text-slate-600 text-sm font-semibold dark:text-slate-400">
              <p>Description</p>

              <p className="ml-1 text-blue-600 dark:text-blue-500 cursor-pointer">
                Save
              </p>

              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 ml-1 text-blue-600 dark:text-blue-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg> */}
            </div>
            <p className="text-sm font-semibold h-full">
              <textarea
                className="outline-none border-b dark:border-slate-600 border-dashed bg-transparent w-full h-full"
                value={currentRestaurant.description}
              />
              {/* {currentRestaurant.description} */}
            </p>
          </div>

          <div className="lg:col-span-1 col-span-6">
            {/* <GeneralCard title={"Details"}>asd</GeneralCard> */}
            <div className="flex items-center text-slate-600 text-sm font-semibold dark:text-slate-400">
              <p>Currency</p>

              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 ml-1 text-blue-600 dark:text-blue-500 animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>

              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 ml-1 text-blue-600 dark:text-blue-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg> */}
            </div>

            <p className="text-sm font-semibold ">
              <input
                className="outline-none focus:border-b border-dashed bg-transparent w-full"
                value={currentRestaurant.currency}
              />
            </p>
          </div>
        </div>
      </div>

      <div className="col-span-6">
        <h2 className="text-2xl font-extrabold">Opening Hours</h2>

        <div className="grid grid-cols-10 gap-0 sm:gap-12 mt-3 mb-6">
          {/* <div className="lg:col-span-1 col-span-6">asd</div> */}
          <div className="col-span-10 sm:col-span-5 lg:col-span-3">
            <div className="flex items-center w-full py-2 border-b dark:border-slate-600">
              <div className="flex items-center text-slate-600 font-semibold dark:text-slate-400 grow h-[48px]">
                <p>Monday</p>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 ml-1 text-blue-600 dark:text-blue-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </div>
              <div className="font-semibold">
                <p>13:00 - 15:00</p>
                <p>18:00 - 00:00</p>
              </div>
            </div>

            <div className="flex items-center w-full py-2 border-b dark:border-slate-600">
              <div className="flex items-center text-slate-600 font-semibold dark:text-slate-400 grow h-[48px]">
                <p>Tuesday</p>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 ml-1 text-blue-600 dark:text-blue-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </div>
              <div className="font-semibold">
                <p>13:00 - 15:00</p>
                <p>18:00 - 00:00</p>
              </div>
            </div>

            <div className="flex items-center w-full py-2 border-b dark:border-slate-600">
              <div className="flex items-center text-slate-600 font-semibold dark:text-slate-400 grow h-[48px]">
                <p>Wednesday</p>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 ml-1 text-blue-600 dark:text-blue-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </div>
              <div className="font-semibold">
                <p>13:00 - 15:00</p>
                <p>18:00 - 00:00</p>
              </div>
            </div>

            <div className="flex items-center w-full dark:border-slate-600 border-b md:border-0 py-2">
              <div className="flex items-center text-slate-600 font-semibold dark:text-slate-400 grow h-[48px]">
                <p>Thursday</p>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 ml-1 text-blue-600 dark:text-blue-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </div>
              <div className="font-semibold">
                <p>13:00 - 15:00</p>
                <p>18:00 - 00:00</p>
              </div>
            </div>
          </div>

          <div className="col-span-10 sm:col-span-5 lg:col-span-3">
            <div className="flex items-center w-full py-2 border-b dark:border-slate-600">
              <div className="flex items-center text-slate-600 font-semibold dark:text-slate-400 grow h-[48px]">
                <p>Friday</p>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 ml-1 text-blue-600 dark:text-blue-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </div>
              <div className="font-semibold">
                <p>13:00 - 15:00</p>
                {/* <p>18:00 - 00:00</p> */}
              </div>
            </div>

            <div className="flex items-center w-full py-2 border-b dark:border-slate-600">
              <div className="flex items-center text-slate-600 font-semibold dark:text-slate-400 grow h-[48px]">
                <p>Saturday</p>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 ml-1 text-blue-600 dark:text-blue-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </div>
              <div className="font-semibold">
                <p>13:00 - 15:00</p>
                <p>18:00 - 00:00</p>
              </div>
            </div>

            <div className="flex items-center w-full py-2 border-b dark:border-slate-600 sm:border-0 ">
              <div className="flex items-center text-slate-600 font-semibold dark:text-slate-400 grow h-[48px]">
                <p>Sunday</p>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 ml-1 text-blue-600 dark:text-blue-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </div>
              <div className="font-semibold">
                <p>13:00 - 15:00</p>
                <p>18:00 - 00:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-6">
        <h2 className="text-2xl font-extrabold">
          Location and Contact Information
        </h2>
      </div>
    </RestaurantTemplate>
  );
};

export default DetailsRestaurant;
