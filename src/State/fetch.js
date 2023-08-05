import axios from "axios";

// const API_URL = "http://127.0.0.1:3002/api";
const API_URL = "http://192.168.1.194:3002/api";

let fetchApi = (type, path, data) => {
  return new Promise((resolve, reject) => {
    axios(API_URL + path, { data, method: type, withCredentials: true }).then(
      (response) => {
        resolve(response);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

export default fetchApi;
