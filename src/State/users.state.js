import { proxy } from "valtio";
import fetchApi from "./fetch";

const data = proxy({
  users: [],
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
};

export default { data, actions };
