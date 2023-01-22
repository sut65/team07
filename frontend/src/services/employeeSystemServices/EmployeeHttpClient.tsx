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
async function GetEmployee(ID: number) {
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
async function PostEmployee(emp:EmployeeInterface) {
    let data = {
        Name: convertType(emp.Name),
        Surname: convertType(emp.Surname),
        Age: convertType(emp.Age),
        Date: new Date(),
        UserID:convertType(emp.UserID),
        WorkingAreaID: convertType(emp.WorkingAreaID),
        StatusID: convertType(emp.StatusID),
        EducationID : convertType(emp.EducationID)
    }

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
        if(res.data){
            return res.data
        }else{
            return false
        }
    })
    return res

}



// Update Employee
async function UpdateEmployee(emp : EmployeeInterface){
    let data = {
        Name: convertType(emp.Name),
        Surname: convertType(emp.Surname),
        Age: convertType(emp.Age),
        Date: new Date(),
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
        if(res.data){
            return res.data
        }else{
            return false
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


export {ListEmployees, ListRoles, DeleteEmployee, PostEmployee}