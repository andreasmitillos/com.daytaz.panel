import { proxy } from "valtio";
import fetchApi from "./fetch";

const data = proxy({ restaurants: {} });

const actions = {
  // get menus
  getMenus: (values) => {
    return new Promise((resolve, reject) => {
      fetchApi("get", "/restaurants/menus", values)
        .then((response) => {
          data.restaurants[values.restaurantId] = response.data?.menus;
          resolve(response.data);
        })
        .catch((error) => {
          reject(error?.response?.data);
        });
    });
  },

  // create menu
  createMenu: (values) => {
    return new Promise((resolve, reject) => {
      fetchApi("post", "/restaurants/menu", values)
        .then((response) => {
          let { restaurantId } = values;
          if (
            data.restaurants[restaurantId] &&
            data.restaurants[restaurantId].draft &&
            data.restaurants[restaurantId].draft?.length > 0
          ) {
            data.restaurants[restaurantId].draft = [
              ...data.restaurants[restaurantId].draft,
              response.data?.menu,
            ];
          } else {
            console.log("already exists");
            data.restaurants[restaurantId].draft = [response.data?.menu];
          }

          resolve(response.data);
        })
        .catch((error) => {
          reject(error?.response?.data);
        });
    });
  },
};

export default { data, actions };
