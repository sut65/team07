import { EmployeeInterface } from "../../models/employeeSystemModel/IEmployee";
import { apiUrl, convertType } from "../utility";



// List Employee
async function ListEmployees() {
    const reqOpt = {
        method: "GET",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    };

    let res = await fetch(`${apiUrl}/employees`, reqOpt)
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

// GET By ID Employee
async function GetEmployee(ID: string | undefined) {
    const reqOpt = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }

    let res = await fetch(`${apiUrl}/employee/${ID}`, reqOpt)
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

// Create Employee
async function PostEmployee(emp:Partial<EmployeeInterface>) {
    let data = {
        Name: emp.Name,
        Surname: emp.Surname,
        Age: convertType(emp.Age),
        Date: new Date().toJSON().split("Z").at(0)+"+07:00",
        UserID:convertType(emp.UserID),
        WorkingAreaID: convertType(emp.WorkingAreaID),
        StatusID: convertType(emp.StatusID),
        EducationID : convertType(emp.EducationID)
    }
    
    // return JSON.stringify(data)

    const reqOpt = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }
    

    let res = await fetch(`${apiUrl}/employee`, reqOpt)
    .then((response) => response.json())
    .then((res) => {
        return res
    })
    return res

}



// Update Employee
async function UpdateEmployee(emp : Partial<EmployeeInterface>){
    let data = {
        ID:convertType(emp.ID),
        Name: emp.Name,
        Surname: emp.Surname,
        Age: convertType(emp.Age),
        Date: emp.Date,
        UserID:convertType(emp.UserID),
        WorkingAreaID: convertType(emp.WorkingAreaID),
        StatusID: convertType(emp.StatusID),
        EducationID : convertType(emp.EducationID)
    }

    const reqOpt = {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }

    let res = await fetch(`${apiUrl}/employee`, reqOpt)
    .then((response) => response.json())
    .then((res) => {
        if(res){
            return res
        }
    })
    return res
}


// Delete Employee
async function DeleteEmployee(ID:number) {
    const reqOpt = {
        method: "DELETE",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    };
    
    let res = await fetch(`${apiUrl}/employee/${ID}`, reqOpt)
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

// List Role
async function ListRoles() {
    const reqOpt = {
        method: "GET",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }
    let res = await fetch(`${apiUrl}/roles`, reqOpt)
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


// GET ALL DATA FOR Select

async function ListEducation() {
    const reqOpt = {
        method: "GET",
        header: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }
    let res = await fetch(`${apiUrl}/educations`, reqOpt)
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


async function ListStatus() {
    const reqOpt = {
        method: "GET",
        header: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }
    let res = await fetch(`${apiUrl}/statuses`, reqOpt)
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

async function ListWorkingArea() {
    const reqOpt = {
        method: "GET",
        header: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }
    let res = await fetch(`${apiUrl}/workingareas`, reqOpt)
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

// List User
async function ListUser() {
    const reqOpt = {
        method: "GET",
        header: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        }
    }
    let res = await fetch(`${apiUrl}/users`, reqOpt)
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
    ListEmployees, 
    ListRoles, 
    DeleteEmployee, 
    PostEmployee, 
    UpdateEmployee, 
    GetEmployee, 
    ListStatus, 
    ListWorkingArea,
    ListEducation,
    ListUser
}