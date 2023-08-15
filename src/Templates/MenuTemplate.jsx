import React, { useEffect, useState } from "react";
import RestaurantTemplate from "./RestaurantTemplate";
import { subscribe } from "valtio";
import { menus } from "../State";
import { useParams } from "react-router-dom";
import LoadingBox from "../Components/LoadingBox";

const MenuTemplate = (props) => {
  // Get Menu ID from URL Params
  const { menuId } = useParams();

  // Loading - Retrieving Menu Insights ? - Default: true
  const [loading, setLoading] = useState(
    !(menus.data.menuInsights[menuId] && menus.data.menuInsights[menuId].id),
  );

  // Get current menu or receive insights
  const [currentMenu, setCurrentMenu] = useState(
    menus.data.menuInsights[menuId] || {},
  );

  // Check for updates on the current menu
  subscribe(menus.data, () => {
    setCurrentMenu(menus.data.menuInsights[menuId]);
  });

  // Retrieve restaurant insights on load
  useEffect(() => {
    // check if we have retrieved the current menu
    if (currentMenu.id) setLoading(false);

    // retrieve the menu again
    menus.actions
      .getMenuInsights({ menuId })
      .then((res) => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  return (
    <RestaurantTemplate
      isMenu={currentMenu || {}}
      tab={props.tab}
      tabName={`/Menus${currentMenu.id ? `/${currentMenu.name}` : "/Menu"}${
        props.tabName ? `/${props.tabName}` : ""
      }`}
    >
      <div className="col-span-6">
        {loading ? <LoadingBox /> : props.children}
      </div>
    </RestaurantTemplate>
  );
};

export default MenuTemplate;
