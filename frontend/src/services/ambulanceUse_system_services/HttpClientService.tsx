import { AmbulanceUseInterface } from "../../models/ambulanceUse_system_models/ambulanceUse";
import { apiUrl } from "../utility";

async function CreatAmbulanceUse(data: AmbulanceUseInterface) {
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };

    let res = await fetch(`${apiUrl}/ambulanceUse`, requestOptions)
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

async function GetAmbulanceUseByEmployee() {
    let eid = localStorage.getItem("id");
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(
        `${apiUrl}/ambulanceUses/${eid}`,
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

async function GetAmbulanceUseByID() {
    let au_id = localStorage.getItem("au_id");
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(
        `${apiUrl}/ambulanceUse/${au_id}`,
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

async function ListMedicines() {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/medicines`, requestOptions)
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

async function GetMedicineByID() {
    let mid = localStorage.getItem("mid");
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(
        `${apiUrl}/medicine/${mid}`,
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





async function UpdateAmbulanceUse(data: AmbulanceUseInterface) {

    console.log(data)
    
    const requestOptions = {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }

    let res = await fetch(`${apiUrl}/ambulanceUse`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res) {
                return res
            } else {
                return false
            }
        })
    return res
}




export {  
    CreatAmbulanceUse,
    GetAmbulanceUseByEmployee,
    GetAmbulanceUseByID,
    ListMedicines,
    GetMedicineByID,
    UpdateAmbulanceUse,
}