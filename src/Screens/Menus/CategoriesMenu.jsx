import React from "react";
import MenuTemplate from "../../Templates/MenuTemplate";

const CategoriesMenu = (props) => {
  return (
    <MenuTemplate tab="categories" tabName="Categories">
      <div className="col-span-6">
        <h2 className="text-2xl font-extrabold">Categories</h2>
      </div>
    </MenuTemplate>
  );
};

export default CategoriesMenu;
