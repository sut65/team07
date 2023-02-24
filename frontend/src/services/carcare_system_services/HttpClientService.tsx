import { CarcareInterface } from "../../models/carcare_system_models/carcare";

const apiUrl = "http://localhost:8080";

async function GetVehicleInspectioByID() {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/vehicleinspections`, requestOptions)
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

async function GetCarstat() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/carstats`, requestOptions)
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


async function CreateCarecare(data: CarcareInterface) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/car-manager/carcare`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
        return res;
    });

  return res;
}

async function GetCarcareAll() {
  let ec_id = localStorage.getItem("cc_id");
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(
    `${apiUrl}/carcares`,
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

async function DeleteCarcareByID(ID : any){
  const requestOptions = {
      method: "DELETE",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
      },
  };

  let res = await fetch(`${apiUrl}/car-manager/carcare/${ID}`, requestOptions)
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

async function UpdateCarcare(data: CarcareInterface) {
    
  const requestOptions = {
      method: "PATCH",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
  }

  let res = await fetch(`${apiUrl}/car-manager/carcares`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        return res;
      })
  return res
}

async function GetCarcareByID() {
  let ccid = localStorage.getItem("cc_id");
  const requestOptions = {
      method: "GET",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
      },
  };

  let res = await fetch(
      `${apiUrl}/carcare/${ccid}`,
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

async function GetVehicleinspectionByVID() {
  let veid = localStorage.getItem("ve_id");
  const requestOptions = {
      method: "GET",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
      },
  };

  let res = await fetch(
      `${apiUrl}/vehicleinspection/${veid}`,
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

export {

  GetVehicleInspectioByID as GetVehicleInspection,
  GetCarstat,
  CreateCarecare,
  GetCarcareAll,
  DeleteCarcareByID,
  UpdateCarcare,
  GetCarcareByID,
  GetVehicleinspectionByVID,

};