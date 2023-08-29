import React, { useEffect, useState } from "react";

import RestaurantTemplate from "../../Templates/RestaurantTemplate";
import { Link, generatePath, useParams } from "react-router-dom";
import routes from "../../Routes";
import { menus } from "../../State";
import { subscribe } from "valtio";
import LoadingBox from "../../Components/LoadingBox";
import Modal from "../../Components/Modal/Modal";
import DynamicForm from "../../Components/Forms/DynamicForm";

const CreateMenuModal = (props) => {
  const [loading, setLoading] = useState(false);
  const [forceClose, setForceClose] = useState(0);
  const { restaurantId } = useParams();

  const toggleModal = () => setForceClose(forceClose + 1);

  const callBack = (response, values) => {
    if (response.status.code === "menu_created") {
      toggleModal();
    }
  };

  return (
    <Modal
      size="lg"
      forceClose={forceClose}
      triggerComponentClasses="xl:col-span-2 sm:col-span-4 col-span-8"
      triggerComponent={
        <div className="xl:col-span-2 sm:col-span-4 col-span-8 border border-dashed rounded dark:border-slate-500 border-slate-200 p-4 cursor-pointer dark:hover:bg-slate-800 hover:bg-slate-100 transition ease-in-out">
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
          className="w-12 h-12 mb-4 dark:text-blue-500 text-blue-600"
        >
          <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
        </svg>

        <p className="text-lg font-semibold dark:text-white">
          Create new Draft Menu
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-2">
          The menu you are about to create is a draft. When you are ready, make
          sure to publish it.
        </p>

        <div className="w-full mt-6">
          <DynamicForm
            button="Create Menu"
            buttonVariant="blue"
            buttonCallBack={callBack}
            buttonOnClick={menus.actions.createMenu}
            fields={[
              {
                key: "name",
                type: "text",
                label: "Menu Name",
                placeholder: "E.g., Dinner Menu",
              },
              {
                key: "description",
                type: "textarea",
                label: "Menu Description",
                placeholder: "E.g., Enabled at 13:00",
              },
            ]}
            hiddenValues={{
              restaurantId,
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

const MenusRestaurantItem = (props) => {
  const { restaurantId } = useParams();

  return (
    <div className="xl:col-span-2 sm:col-span-4 col-span-8 border rounded dark:border-slate-500 border-slate-200 px-4 pt-4 pb-2">
      <div className="flex flex-col h-full">
        <h3 className="font-bold">{props.title || ""}</h3>

        <div className="grow border-b dark:border-slate-600 border-slate-200">
          <p className="text-sm dark:text-slate-400 text-slate-600 pt-2 pb-4">
            {props.text || ""}
          </p>
        </div>

        <div className="cursor-pointer transition ease-in-out hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md mt-2">
          <Link
            to={generatePath(routes.individualMenu, {
              restaurantId,
              menuId: props.id,
            })}
          >
            <p className="text-sm flex items-center text-indigo-600 dark:text-indigo-400 w-fit mx-auto py-2 px-4">
              Manage{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

const MenusRestaurant = (props) => {
  const [gotMenus, setGotMenus] = useState(false);
  const [loading, setLoading] = useState(true);
  const { restaurantId } = useParams();

  const [draftMenus, setDraftMenus] = useState([]);
  const [publicMenus, setPublicMenus] = useState([]);

  subscribe(menus.data, () => {
    setDraftMenus(menus.data.restaurants[restaurantId]?.draft);
    setPublicMenus(menus.data.restaurants[restaurantId]?.public);
  });

  useEffect(() => {
    if (!gotMenus) {
      setGotMenus(true);
      menus.actions
        .getMenus({ restaurantId })
        .then((res) => {
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  }, [restaurantId]);

  return (
    <RestaurantTemplate tab="menus" tabName="/Menus">
      {loading ? (
        <div className="col-span-6">
          <LoadingBox />
        </div>
      ) : (
        <>
          <div className="col-span-6">
            <h2 className="text-2xl font-extrabold">Public Menus</h2>
            <p className="mb-4 text-sm dark:text-slate-400 text-slate-600">
              These are menus that are accessible by the customers of the
              restaurant.
            </p>
            <div className="grid grid-cols-8 gap-8">
              {publicMenus.map((menu) => (
                <MenusRestaurantItem
                  key={menu.id}
                  title={menu.name}
                  text={menu.description}
                  id={menu.id}
                />
              ))}

              {publicMenus.length === 0 ? (
                <div className="xl:col-span-2 sm:col-span-4 col-span-8 border border-dashed rounded dark:border-slate-500 border-slate-200 p-4  transition ease-in-out">
                  <div className="flex items-center h-full">
                    <div className="grow flex flex-col items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8 mx-auto"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                        />
                      </svg>
                      <p className="text-sm font-semibold mt-4">
                        No Public Menus
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="col-span-6 mt-5">
            <h2 className="text-2xl font-extrabold">Draft Menus</h2>
            <p className="mb-4 text-sm dark:text-slate-400 text-slate-600">
              These are menus that are not accessible by the customers of the
              restaurant. For example, in progress menus.
            </p>
            <div className="grid grid-cols-8 gap-8">
              {draftMenus.map((menu) => (
                <MenusRestaurantItem
                  key={menu.id}
                  title={menu.name}
                  text={menu.description}
                  id={menu.id}
                />
              ))}
              <CreateMenuModal />
            </div>
          </div>
        </>
      )}
    </RestaurantTemplate>
  );
};

export default MenusRestaurant;
