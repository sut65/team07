import { apiUrl, convertType } from "../utility";

export class HttpClientServices {
  //Method GET
  static async get(url: string) {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    let res = await fetch(`${apiUrl}${url}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return { error: false, results: res.data };
        } else {
          return { error: true, message: res.error };
        }
      });
    return res;
  }

  // Method: POST
  static async post(url: string, payload: any) {
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    let res = await fetch(`${apiUrl}${url}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);

        if (res.data) {
          return { error: false, results: res.data };
        } else {
          console.log(res);

          return { error: true, message: res.error };
        }
      });
    return res;
  }

  // Method: PUT
  static async put(url: string, payload: any) {
    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    let res = await fetch(`${apiUrl}${url}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return { error: false, results: res.data };
        } else {
          return { error: true, message: res.error };
        }
      });
    return res;
  }

  // Method: PATCH
  static async patch(url: string, payload: any) {
    const requestOptions = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    let res = await fetch(`${apiUrl}${url}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return { error: false, results: res.data };
        } else {
          return { error: true, message: res.error };
        }
      });
    return res;
  }

  // Method: DELETE
  static async delete(url: string) {
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    let res = await fetch(`${apiUrl}${url}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return { error: false, results: res.data };
        } else {
          return { error: true, message: res.error };
        }
      });
    return res;
  }
}
