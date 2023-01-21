import { EmployeeInterface } from "../../models/employeeSystemModel/IEmployee";

const apiUrl = "http://localhost:8080";

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

// Delete
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


export {ListEmployees, ListRoles, DeleteEmployee}