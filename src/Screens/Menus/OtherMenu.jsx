import React, { useEffect, useState } from "react";
import MenuTemplate from "../../Templates/MenuTemplate";
import { useParams } from "react-router-dom";
import { menus } from "../../State";
import { subscribe } from "valtio";
import GeneralTable from "../../Components/Table/GeneralTable";
import LoadingBox from "../../Components/LoadingBox";
import Modal from "../../Components/Modal/Modal";
import DynamicForm from "../../Components/Forms/DynamicForm";

const CreateAllergyTagModal = (props) => {
  let { menu } = props;

  let { menuId } = useParams();

  const [loading, setLoading] = useState(false);
  const [forceClose, setForceClose] = useState(0);
  const { restaurantId } = useParams();

  const toggleModal = () => setForceClose(forceClose + 1);

  const callBack = (response, values) => {
    if (response.status.code === "create_allergyTag_success") {
      toggleModal();
    }
  };

  return (
    <Modal
      size="lg"
      forceClose={forceClose}
      buttonText={"Create Allergy Tag"}
      buttonSize={"sm"}
      buttonVariant={"blue"}
    >
      <div className="flex flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12 mb-4 dark:text-blue-500 text-blue-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
          />
        </svg>

        <p className="text-lg font-semibold dark:text-white">
          Create Allergy Tag
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-2">
          You are about to create an allergy tag for{" "}
          <span className={"font-semibold"}>{menu.name}</span>
        </p>

        <div className="w-full mt-6">
          <DynamicForm
            button="Create Allergy Tag"
            buttonVariant="blue"
            buttonCallBack={callBack}
            buttonOnClick={menus.actions.createAllergyTag}
            fields={[
              {
                labelRight: "Required",
                key: "name",
                type: "text",
                label: "Allergy Tag Name",
                placeholder: "E.g., Peanuts",
              },
              {
                labelRight: "Optional",
                key: "description",
                type: "textarea",
                label: "Menu Description",
                placeholder: "E.g., Peanut Allergy Warning",
              },
            ]}
            hiddenValues={{
              menuId,
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

const CreateDietaryRestrictionModal = (props) => {
  let { menu } = props;
  let { menuId } = useParams();

  const [loading, setLoading] = useState(false);
  const [forceClose, setForceClose] = useState(0);
  const { restaurantId } = useParams();

  const toggleModal = () => setForceClose(forceClose + 1);

  const callBack = (response, values) => {
    if (response.status.code === "create_dietaryRestriction_success") {
      toggleModal();
    }
  };

  return (
    <Modal
      size="lg"
      forceClose={forceClose}
      buttonText={"Create Dietary Restriction"}
      buttonSize={"sm"}
      buttonVariant={"indigo"}
    >
      <div className="flex flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12 mb-4 dark:text-blue-500 text-indigo-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
          />
        </svg>

        <p className="text-lg font-semibold dark:text-white">
          Create Dietary Restriction
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-2">
          You are about to create an dietary restriction for{" "}
          <span className={"font-semibold"}>{menu.name}</span>
        </p>

        <div className="w-full mt-6">
          <DynamicForm
            button="Create Dietary Restriction"
            buttonVariant="indigo"
            buttonCallBack={callBack}
            buttonOnClick={menus.actions.createDietaryRestriction}
            fields={[
              {
                key: "name",
                type: "text",
                labelRight: "Required",
                label: "Dietary Restriction Name",
                placeholder: "E.g., Vegan",
              },
              {
                key: "description",
                type: "textarea",
                label: "Menu Description",
                labelRight: "Optional",
                placeholder: "E.g., This dish is Vegan Friendly",
              },
              {
                key: "acronym",
                type: "text",
                label: "Dietary Restriction Acronym",
                labelRight: "Required",
                placeholder: "E.g., VE",
              },
            ]}
            hiddenValues={{ menuId }}
          />
        </div>
      </div>
    </Modal>
  );
};

const OtherMenu = (props) => {
  // get current menu id
  const { menuId } = useParams();

  const [update, setUpdate] = useState(0);

  // loading states
  const [loadingAllergyTags, setLoadingAllergyTags] = useState(
    !(
      menus.data.menuAllergyTags[menuId] &&
      typeof menus.data.menuAllergyTags[menuId] !== "undefined"
    ),
  );
  const [loadingDietaryRestrictions, setLoadingDietaryRestrictions] = useState(
    !(
      menus.data.menuDietaryRestrictions[menuId] &&
      typeof menus.data.menuDietaryRestrictions[menuId] !== "undefined"
    ),
  );

  // set allergyTags
  const [allergyTags, setAllergyTags] = useState(
    menus.data.menuAllergyTags[menuId] || [],
  );

  // set dietaryRestrictions
  const [dietaryRestrictions, setDietaryRestrictions] = useState(
    menus.data.menuDietaryRestrictions[menuId] || [],
  );

  // set current menu
  const [currentMenu, setCurrentMenu] = useState(
    menus.data.menuInsights[menuId] || {},
  );

  // subscribe to changes
  subscribe(menus.data, () => {
    setDietaryRestrictions(menus.data.menuDietaryRestrictions[menuId]);
    setAllergyTags(menus.data.menuAllergyTags[menuId]);
    setUpdate(update + 1);
  });

  // retrieve optionLists
  useEffect(() => {
    menus.actions
      .getAllergyTags({ menuId })
      .then((res) => {
        setLoadingAllergyTags(false);
      })
      .catch((err) => {
        setLoadingAllergyTags(false);
      });

    menus.actions
      .getDietaryRestrictions({ menuId })
      .then((res) => {
        setLoadingDietaryRestrictions(false);
      })
      .catch((err) => {
        setLoadingDietaryRestrictions(false);
      });
  }, []);

  // subscribe to changes
  subscribe(menus.data, () => {
    setAllergyTags(menus.data.menuAllergyTags[menuId]);
    setDietaryRestrictions(menus.data.menuDietaryRestrictions[menuId]);
    setUpdate(update + 1);
  });

  console.log(allergyTags);

  return (
    <MenuTemplate tab="other" tabName="Other">
      <div className="col-span-6">
        <div className={"flex items-center"}>
          <h2 className="text-2xl font-extrabold mr-3">Allergy Tags</h2>

          {!loadingAllergyTags ? (
            <CreateAllergyTagModal menu={currentMenu} />
          ) : (
            ""
          )}
        </div>
        <p className="mb-4 text-sm dark:text-slate-400 text-slate-600 max-w-2xl">
          Find below the list of allergy tags for {currentMenu?.name}. These can
          be attached to different items you create, and you can also view items
          containing these below.
        </p>
        <div className="max-w-4xl gap-4 mt-4">
          {/* Is Public Menu ? */}
          {loadingAllergyTags ? (
            <LoadingBox />
          ) : (
            <GeneralTable
              model="Allergy Tags"
              header={["Name", "Description", "Actions"]}
              data={allergyTags?.map((x) => [x.name, x.description, ""])}
            />
          )}
        </div>
      </div>

      <div className="col-span-6 mt-12">
        <div className={"flex items-center"}>
          <h2 className="text-2xl font-extrabold mr-3">Dietary Restrictions</h2>

          {!loadingDietaryRestrictions ? (
            <CreateDietaryRestrictionModal menu={currentMenu} />
          ) : (
            ""
          )}
        </div>
        <p className="mb-4 text-sm dark:text-slate-400 text-slate-600 max-w-2xl">
          Find below the list of dietary restrictions for {currentMenu?.name}.
          These can be attached to different items you create, and you can also
          view items containing these below.
        </p>
        <div className="max-w-4xl gap-4 mt-4 mb-12">
          {loadingDietaryRestrictions ? (
            <LoadingBox />
          ) : (
            <GeneralTable
              model="Dietary Restrictions"
              header={["Name", "Description", "Acronym", "Actions"]}
              data={dietaryRestrictions?.map((x) => [
                x.name,
                x.description,
                x.acronym,
                "",
              ])}
            />
          )}
        </div>
      </div>
    </MenuTemplate>
  );
};

export default OtherMenu;
