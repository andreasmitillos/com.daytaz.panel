import React from "react";

import RestaurantTemplate from "../../Templates/RestaurantTemplate";

const PaymentsRestaurant = (props) => {
  return (
    <RestaurantTemplate tab="payments" tabName="/Payments">
      <h2 className="text-2xl font-extrabold">Payments</h2>
    </RestaurantTemplate>
  );
};

export default PaymentsRestaurant;
