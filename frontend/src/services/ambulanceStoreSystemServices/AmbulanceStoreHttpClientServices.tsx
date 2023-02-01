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


async function UpdateAmbulanceStore(ambStore : Partial<AmbulanceStoreInterface>){
    let data = {
        ID:convertType(ambStore.ID),
        Amount: convertType(ambStore.Amount),
        MedicineID:convertType(ambStore.MedicineID),
        AmbulanceID: convertType(ambStore.AmbulanceID),
        EmployeeID: convertType(localStorage.getItem("id") as string),
        Date: new Date(),
    }

    const reqOpt = {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }

    let res = await fetch(`${apiUrl}/ambulanceStore`, reqOpt)
    .then((response) => response.json())
    .then((res) => {
        if(res){
            return res
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




async function GetMedicineByID(ID : string | undefined) {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/medicine/${ID}`, requestOptions)
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


async function DeleteAmbulanceByID(ID : any){
    const requestOptions = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/ambulanceStore/${ID}`, requestOptions)
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
    DeleteAmbulanceByID,
    UpdateAmbulanceStore,
    GetMedicineByID,
    CreateAmbulanceStore,
    GetAmbulanceStore,
    ListAmbulanceStores,
    GetAmbulanceWithID
}