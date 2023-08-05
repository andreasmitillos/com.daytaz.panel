import { proxy } from "valtio";
import fetchApi from "./fetch";

const data = proxy({
  users: [],
  retrievedUsers: {},
});
const actions = {
  getUsers: () => {
    return new Promise((resolve, reject) => {
      fetchApi("get", "/users", {})
        .then((response) => {
          data.users = response.data?.users;
          resolve(response.data);
        })
        .catch((error) => {
          reject(error?.response?.data);
        });
    });
  },

  getUser: (values) => {
    return new Promise((resolve, reject) => {
      fetchApi("post", "/users/get", values)
        .then((response) => {
          data.retrievedUsers[values.userId] = response.data.user;
          resolve(response.data);
        })
        .catch((error) => {
          reject(error?.response?.data);
        });
    });
  },
};

export default { data, actions };
