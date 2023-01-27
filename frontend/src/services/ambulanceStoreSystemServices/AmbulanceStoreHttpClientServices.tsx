import { AmbulanceStoreInterface } from "../../models/ambulanceStoreModels/IAmbulanceStore"
import { apiUrl, convertType } from "../utility"

async function ListAmbulanceStores() {
    const reqOpt = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }
    let res = await fetch(`${apiUrl}/ambulanceStores`, reqOpt)
        .then((response) => response.json())
        .then((res) => {
            if (res) {
                return res
            }
        })
    return res
}

// Get By ID AmbulanceStores
async function GetAmbulanceStore(ID: string | undefined) {
    const reqOpt = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }

    let res = await fetch(`${apiUrl}/ambulanceStore/${ID}`, reqOpt)
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


async function GetAmbulanceWithID(ID: string | undefined) {
    const reqOpt = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }

    let res = await fetch(`${apiUrl}/ambulances/${ID}`, reqOpt)
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


// Create Ambulance Stores
async function CreateAmbulanceStore(abl: any) {
    let data = {
        Amount: convertType(abl.Amount),
        Date: new Date().toJSON().split("Z").at(0) + "+07:00",
        MedicineID: convertType(abl.MedicineID),
        AmbulanceID: convertType(abl.AmbulanceID),
        EmployeeID: convertType(abl.EmployeeID)
    }

    const reqOpt = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }


    let res = await fetch(`${apiUrl}/ambulanceStore`, reqOpt)
        .then((response) => response.json())
        .then((res) => {
            return res
        })
    return res

}
export {
    CreateAmbulanceStore,
    GetAmbulanceStore,
    ListAmbulanceStores,
    GetAmbulanceWithID
}