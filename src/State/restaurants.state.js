import { proxy } from "valtio";
import fetchApi from "./fetch";

const data = proxy({
  restaurants: [],
  retrievedRestaurants: {},
});
const actions = {
  getRestaurants: () => {
    return new Promise((resolve, reject) => {
      fetchApi("get", "/restaurants", {})
        .then((response) => {
          data.restaurants = response.data?.restaurants;
          resolve(response.data);
        })
        .catch((error) => {
          reject(error?.response?.data);
        });
    });
  },

  createRestaurant: (values) => {
    return new Promise((resolve, reject) => {
      fetchApi("post", "/restaurants/create", values)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error?.response?.data);
        });
    });
  },

  getRestaurant: (values) => {
    return new Promise((resolve, reject) => {
      fetchApi("post", "/restaurants/get", values)
        .then((response) => {
          data.retrievedRestaurants[values.restaurantId] =
            response.data.restaurant;
          resolve(response.data);
        })
        .catch((error) => {
          reject(error?.response?.data);
        });
    });
  },

  addUser: (values) => {
    return new Promise((resolve, reject) => {
      fetchApi("post", "/restaurants/addUser", values)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error?.response?.data);
        });
    });
  },

  removeUser: (values) => {
    return new Promise((resolve, reject) => {
      fetchApi("post", "/restaurants/removeUser", values)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error?.response?.data);
        });
    });
  },
};

export default { data, actions };
