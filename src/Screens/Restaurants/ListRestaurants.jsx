import React, { useEffect, useState } from "react";
import DashboardPage from "../../Templates/DashboardPage";

import { auth, restaurants, users } from "../../State/index.js";
import { subscribe } from "valtio";
import GeneralTable from "../../Components/Table/GeneralTable";
import LoadingBox from "../../Components/LoadingBox";
import NewButton from "../../Components/Inputs/NewButton";
import { Link } from "react-router-dom";
import routes from "../../Routes";

const ListRestaurants = (props) => {
  const [user, setUser] = useState(auth.data.user);
  const [usersList, setUsersList] = useState(users.data.users);
  const [restaurantList, setRestaurantList] = useState(
    restaurants.data.restaurants
  );
  const [loading, setLoading] = useState(true);
  subscribe(auth.data, () => {
    setUser(auth.data.user);
  });

  subscribe(restaurants.data.restaurants, () => {
    setUsersList(users.data.users);
  });

  useEffect(() => {
    if (user.id) {
      restaurants.actions
        .getRestaurants()
        .then((res) => {
          setRestaurantList(res.restaurants);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }, [user.id]);

  return (
    <DashboardPage currentTab="restaurants/list">
      {/* <h1 className="text-2xl font-bold">
        Hi, {user.prefix || ""} {user.firstName}!
      </h1>
      <p>You are a {user.authLevel}</p>
      {user.email} */}
      <h2 className="font-extrabold text-4xl">List of Restaurants</h2>
      <p className="text-md text-gray-700 dark:text-gray-300">
        Find listed below all restaurants registered to our network.
      </p>

      <div className="grid grid-cols-6 mt-6">
        <div className="xl:col-span-5 col-span-6 overflow-x-scroll rounded">
          {loading ? (
            <LoadingBox />
          ) : (
            <GeneralTable
              header={["ID", "Name", "Description", "Head Admin", ""]}
              data={restaurantList.map((x) => [
                <span className="font-mono">{x.id}</span>,
                x.name,
                x.description || "-",
                x.users?.length > 0 ? (
                  x.users.map((y) => {
                    if (y.restaurant_users.authLevel == "headAdmin") {
                      return (
                        <Link to={`/users/${y.id}`}>
                          <span className="rounded border font-medium px-3 py-1 dark:border-gray-700">
                            {y.firstName} {y.lastName}
                          </span>
                        </Link>
                      );
                    }
                  })
                ) : (
                  <span class="bg-red-100 border border-transparent text-red-800 text-sm font-medium px-3 py-1 rounded dark:bg-red-900 dark:text-red-300">
                    Unassigned
                  </span>
                ),

                <Link to={`/restaurants/${x.id}`}>
                  <NewButton variant="transparent" addClassName="mb-0">
                    View
                  </NewButton>
                </Link>,
              ])}
            />
          )}
        </div>
      </div>
    </DashboardPage>
  );
};

export default ListRestaurants;
