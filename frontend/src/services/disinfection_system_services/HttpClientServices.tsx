import axios from "axios";
import { DisinfectionInterface } from "../../models/disinfection_system_models/disinfection";
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

async function CreatDisinfection(data: DisinfectionInterface) {
  const requestOptions = {
      method: "POST",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/disinfection`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
          if (res.data) {
              return res.data;
          } else {
              return false;
          }
      });

  return res;
}

async function GetDisinfectionByID() {
  let did = localStorage.getItem("did");
  const requestOptions = {
      method: "GET",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
      },
  };

  let res = await fetch(
      `${apiUrl}/disinfection/${did}`,
      requestOptions
  )
      .then((response) => response.json())
      .then((res) => {
          if (res.data) {
              return res.data;
          } else {
              return false;
          }
      });

  return res;

}

async function GetDisinfectionByEmployee() {
  let eid = localStorage.getItem("id");
  const requestOptions = {
      method: "GET",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
      },
  };

  let res = await fetch(
      `${apiUrl}/disinfectionStaff/disinfection/${eid}`,
      requestOptions
  )
      .then((response) => response.json())
      .then((res) => {
          if (res.data) {
              return res.data;
          } else {
              return false;
          }
      });

  return res;
}

async function ListDisinfectants() {
  const requestOptions = {
      method: "GET",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
      },
  };

  let res = await fetch(`${apiUrl}/disinfactants`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
          if (res.data) {
              return res.data;
          } else {
              return false;
          }
      });

  return res;
}

async function ListDisinfactions() {
  const requestOptions = {
      method: "GET",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
      },
  };

  let res = await fetch(`${apiUrl}/disinfectionStaff/disinfections`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
          if (res.data) {
              return res.data;
          } else {
              return false;
          }
      });

  return res;
}

async function UpdateDisinfection(data: DisinfectionInterface) {
  
  const requestOptions = {
      method: "PATCH",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
  }

  let res = await fetch(`${apiUrl}/disinfectionStaff/disinfection`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
          if (res.data) {
              return res.data
          } else {
              return false
          }
      })
  return res
}

async function ListAmbulances() {
  const requestOptions = {
      method: "GET",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
      },
  };

  let res = await fetch(`${apiUrl}/ambulances`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
          if (res.data) {
              return res.data;
          } else {
              return false;
          }
      });

  return res;
}

export {
  CreatDisinfection,
  GetDisinfectionByID,
  GetDisinfectionByEmployee,
  ListDisinfectants,
  ListDisinfactions,
  UpdateDisinfection,
  ListAmbulances
}

