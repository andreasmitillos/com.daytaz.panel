import React from "react";
import MenuTemplate from "../../Templates/MenuTemplate";

const ItemsMenu = (props) => {
  return (
    <MenuTemplate tab="items" tabName="Items">
      <div className="col-span-6">
        <h2 className="text-2xl font-extrabold">Items</h2>
      </div>
    </MenuTemplate>
  );
};

export default ItemsMenu;
