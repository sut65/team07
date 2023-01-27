import axios from "axios";
import { AmbulancesInterface } from "../../models/ambulance_system_models/ambulance";
import { RecordTimeInInterface } from "../../models/recordtimein_system_models/recordtimein";
import { apiUrl, convertType } from "../utility";

async function CreatRecordTimeIn(data: RecordTimeInInterface) {
  const requestOptions = {
      method: "POST",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/recordtimein`, requestOptions)
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

async function GetRecordTimeInByID() {
  let rid = localStorage.getItem("rid");
  const requestOptions = {
      method: "GET",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
      },
  };

  let res = await fetch(
      `${apiUrl}/recordtimeins/${rid}`,
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

async function GetRecordTimeInByEmployee() {
  let eid = localStorage.getItem("id");
  const requestOptions = {
      method: "GET",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
      },
  };

  let res = await fetch(
      `${apiUrl}/recordtimein/${eid}`,
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

async function ListRecordtimeouts() {
  const requestOptions = {
      method: "GET",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
      },
  };

  let res = await fetch(`${apiUrl}/recordtimeouts`, requestOptions)
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

async function ListRecordTimeIN() {
  const requestOptions = {
      method: "GET",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
      },
  };

  let res = await fetch(`${apiUrl}/recordtimeins`, requestOptions)
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

async function ListEmployee() {
  const requestOptions = {
      method: "GET",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
      },
  };

  let res = await fetch(`${apiUrl}/employees`, requestOptions)
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

async function UpdateRecordTimeIn(data: RecordTimeInInterface) {
  
  const requestOptions = {
      method: "PATCH",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
  }

  let res = await fetch(`${apiUrl}/recordtimein`, requestOptions)
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

export {
  CreatRecordTimeIn,
  GetRecordTimeInByID,
  GetRecordTimeInByEmployee,
  ListRecordtimeouts,
  ListAmbulances,
  ListRecordTimeIN,
  UpdateRecordTimeIn,
  ListEmployee,
}


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


// export class HttpClientServices {
//   //Method GET
//   static async get(url: string) {
//     const requestOptions = {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//         "Content-Type": "application/json",
//       },
//     };

//     let res = await fetch(`${apiUrl}${url}`, requestOptions)
//       .then((response) => response.json())
//       .then((res) => {
//         if (res.data) {
//           return { error: false, results: res.data };
//         } else {
//           return { error: true, message: res.error };
//         }
//       });
//     return res;
//   }

//   // Method: POST
//   static async post(url: string, payload: any) {
//     const requestOptions = {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     };

//     let res = await fetch(`${apiUrl}${url}`, requestOptions)
//       .then((response) => response.json())
//       .then((res) => {
//         console.log(res);

//         if (res.data) {
//           return { error: false, results: res.data };
//         } else {
//           console.log(res);

//           return { error: true, message: res.error };
//         }
//       });
//     return res;
//   }

//   // Method: PUT
//   static async put(url: string, payload: any) {
//     const requestOptions = {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     };

//     let res = await fetch(`${apiUrl}${url}`, requestOptions)
//       .then((response) => response.json())
//       .then((res) => {
//         if (res.data) {
//           return { error: false, results: res.data };
//         } else {
//           return { error: true, message: res.error };
//         }
//       });
//     return res;
//   }

//   // Method: PATCH
//   static async patch(url: string, payload: any) {
//     const requestOptions = {
//       method: "PATCH",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     };

//     let res = await fetch(`${apiUrl}${url}`, requestOptions)
//       .then((response) => response.json())
//       .then((res) => {
//         if (res.data) {
//           return { error: false, results: res.data };
//         } else {
//           return { error: true, message: res.error };
//         }
//       });
//     return res;
//   }

//   // Method: DELETE
//   static async delete(url: string) {
//     const requestOptions = {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//         "Content-Type": "application/json",
//       },
//     };

//     let res = await fetch(`${apiUrl}${url}`, requestOptions)
//       .then((response) => response.json())
//       .then((res) => {
//         if (res.data) {
//           return { error: false, results: res.data };
//         } else {
//           return { error: true, message: res.error };
//         }
//       });
//     return res;
//   }
// }


