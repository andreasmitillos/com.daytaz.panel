import axios from "axios";

const API_URL = "http://127.0.0.1:3002/api";
// const API_URL = "http://192.168.1.193:3002/api";
// const API_URL = "http://192.168.0.4:3002/api";

let fetchApi = (type, path, data) => {
  return new Promise((resolve, reject) => {
    let temp = { data, method: type, withCredentials: true };

    if (type === "get") {
      temp.params = data;
    }

    axios(API_URL + path, temp).then(
      (response) => {
        resolve(response);
      },
      (error) => {
        reject(error);
      },
    );
  });
};

export default fetchApi;
