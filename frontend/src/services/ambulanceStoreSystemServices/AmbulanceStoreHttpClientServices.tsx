import { AmbulanceStoreInterface } from "../../models/ambulanceStoreModels/IAmbulanceStore"
import { apiUrl, convertType } from "../utility"

async function ListAmbulanceStores() {
    const reqOpt = {
        method: "GET",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }
    let res = await fetch(`${apiUrl}/ambulanceStores`, reqOpt)
    .then((response) => response.json())
    .then((res) => {
        if(res){
            return res
        } 
    })
    return res
}

// Get By ID AmbulanceStores
async function GetAmbulanceStore(ID : string | undefined) {
    const reqOpt = {
        method: "GET",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }

    let res = await fetch(`${apiUrl}/ambulanceStore/${ID}`, reqOpt)
    .then((response) => response.json())
    .then((res) => {
        if(res.data){
            return res.data
        }else{
            return false
        }
    })
    return res
}

// Create Ambulance Stores
async function CreateAmbulanceStore(ambStore:Partial<AmbulanceStoreInterface>){
    let data = {
        Amount: convertType(ambStore.Amount),
        Date: ambStore.Date?.toJSON().split("Z").at(0)+"+07:00",
        MedicineID: convertType(ambStore.MedicineID),
        AmbulanceID: convertType(ambStore.AmbulanceID),
        EmployeeID: convertType(ambStore.EmployeeID)
    }


}


async function GetAmbulanceWithID(ID:string | undefined) {
    const reqOpt = {
        method: "GET",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }

    let res = await fetch(`${apiUrl}/ambulances/${ID}`, reqOpt)
    .then((response) => response.json())
    .then((res) => {
        if(res.data){
            return res.data
        }else{
            return false
        }
    })
    return res
}
export {
    GetAmbulanceStore,
    ListAmbulanceStores,
    GetAmbulanceWithID
}