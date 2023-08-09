import React from "react";
import RestaurantTemplate from "./RestaurantTemplate";

const MenuTemplate = (props) => {
  return (
    <RestaurantTemplate
      isMenu
      tab={props.tab}
      tabName={`/Menu${props.tabName ? `/${props.tabName}` : ""}`}
    >
      <div className="col-span-6">{props.children}</div>
    </RestaurantTemplate>
  );
};

export default MenuTemplate;
