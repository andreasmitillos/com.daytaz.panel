import React from "react";
import MenuTemplate from "../../Templates/MenuTemplate";

const IndividualMenu = (props) => {
  return (
    <MenuTemplate tab="insights" tabName="Insights">
      <div className="col-span-6">
        <h2 className="text-2xl font-extrabold">Insights</h2>
      </div>
    </MenuTemplate>
  );
};

export default IndividualMenu;
