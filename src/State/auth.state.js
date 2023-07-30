import { proxy } from "valtio";
import fetchApi from "./fetch";

const data = proxy({
  user: {},
  mfaLoginDetails: {},
  onLaunchGotUser: false,
  loggedIn: true,
  registerUser: {},
  finishedGettingUser: false,
});
const actions = {
  // login user
  login: (values) => {
    data.loggedIn = false;
    data.onLaunchGotUser = false;
    return new Promise((resolve, reject) =>
      fetchApi("post", "/identity/login", values)
        .then((response) => {
          if (response.data.status.code == "user_login_success") {
            data.onLaunchGotUser = true;
            data.loggedIn = true;
            data.user = response.data.user;
          }
          resolve(response.data);
        })
        .catch((error) => {
          reject(error?.response?.data);
        })
    );
  },

  //
  register: (values) => {
    return new Promise((resolve, reject) => {
      fetchApi("post", "/identity/register", values)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error?.response?.data);
        });
    });
  },

  verifyEmail: (values) => {
    return new Promise((resolve, reject) => {
      fetchApi("post", "/identity/verifyEmail", values)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error?.response?.data);
        });
    });
  },

  firstTimeGetUser: () => {
    let tempOnLaunchGotUser = data.onLaunchGotUser;
    data.onLaunchGotUser = true;

    if (!tempOnLaunchGotUser) {
      data.loggedIn = false;
      return new Promise((resolve, reject) => {
        actions
          .getProfile()
          .then((res) => {
            data.user = res.data.user;
            data.loggedIn = true;
            data.finishedGettingUser = true;
            resolve(res);
          })
          .catch((error) => {
            data.loggedIn = false;
            data.finishedGettingUser = true;
            reject("error");
          });
      });
    } else {
      return new Promise((resolve, reject) => {
        resolve("s");
      });
    }
  },

  logout: () => {
    return new Promise((resolve, reject) => {
      fetchApi("post", "/identity/revoke")
        .then((response) => {
          if (response.data.status.code == "device_revoked") {
            data.onLaunchGotUser = true;
            data.loggedIn = false;
            data.user = {};
          }
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // used to retrieve the profile of the user
  getProfile: () => {
    return new Promise((resolve, reject) => {
      fetchApi("post", "/identity/profile")
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default { data, actions };
