import axios from "axios";
import { apiUrl, convertType } from "../utility";
const requestOptions = axios.create({
  baseURL: apiUrl,
  timeout: 800,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
  responseType: "json",
});

export class HttpClientServices {
  // Method: GET
  static async get(url: string) {
    let result: any;
    await requestOptions
      .get(url)
      .then((response) => {
        result = response.data;
      })
      .catch((err) => {
        throw new Error(err.response.data);
      });
    return result;
  }

  // Method: POST
  static async post(url: string, payload: any) {
    let result: any;
    await requestOptions
      .post(url, payload)
      .then((response) => {
        result = response.data;
      })
      .catch((err) => {
        throw new Error(err.response.data);
      });

    return result;
  }

  // Method: PUT
  static async put(url: string, payload: any) {
    let result: any;
    await requestOptions
      .put(url, payload)
      .then((response) => {
        result = response.data;
      })
      .catch((err) => {
        throw new Error(err.response.data);
      });

    return result;
  }

  // Method: PATCH
  static async patch(url: string, payload: any) {
    let result: any;
    await requestOptions
      .patch(url, payload)
      .then((response) => {
        result = response.data;
      })
      .catch((err) => {
        throw new Error(err.response.data);
      });

    return result;
  }

  // Method: DELETE
  static async delete(url: string) {
    let result: any;
    await requestOptions
      .delete(url)
      .then((response) => {
        result = response.data;
      })
      .catch((err) => {
        throw new Error(err.response.data);
      });

    return result;
  }
}

