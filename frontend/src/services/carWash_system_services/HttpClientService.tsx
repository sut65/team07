import { CarWashsInterface } from "../../models/carWash_system_models/carWash";
import { apiUrl } from "../utility";


async function CreatCarWashs(data:any) {
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };

    let res = await fetch(`${apiUrl}/carWash`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            console.log(res)
            if (res) {
                
                return res;
            } else {
                return false;
            }
        });

    return res;
}

async function GetCarWashByID() {
    let cid = localStorage.getItem("cid");
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(
        `${apiUrl}/carWashs/${cid}`,
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

async function GetCarWashByEmployee() {
    let empid = localStorage.getItem("id");
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(
        `${apiUrl}/carWash/${empid}`,
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

async function ListStatusAms() {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/statusAms`, requestOptions)
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

async function ListCarWashs() {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    };

    let res = await fetch(`${apiUrl}/carWashs`, requestOptions)
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

async function UpdateCarWash(data: CarWashsInterface) {
    
    const requestOptions = {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }

    let res = await fetch(`${apiUrl}/carWash`, requestOptions)
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

// Delete CarWash
async function DeleteCarWash(ID:number) {
    const reqOpt = {
        method: "DELETE",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    };
    
    let res = await fetch(`${apiUrl}/carWash/${ID}`, reqOpt)
    .then((response) => response.json())
    .then((res) => {
        if(res.data){
            return res.data
        } else{
            return false
        }
    })
    return res
}

export {
    
    CreatCarWashs,
    GetCarWashByID,
    GetCarWashByEmployee,
    ListStatusAms,
    ListCarWashs,
    ListAmbulances,
    DeleteCarWash, 
    UpdateCarWash,
}