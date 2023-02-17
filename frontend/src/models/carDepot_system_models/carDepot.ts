import { ParksInterface } from "./park";
import { AmbulancesInterface } from "../ambulance_system_models/ambulance";
import { EmployeeInterface } from "../employeeSystemModel/IEmployee";

export interface CarDepotsInterface {

    ID?: number | null ,
    EmpCode: string | any,
    PNum: number | any,
    Date: Date | any,
    

    ParkID?: number | null,
    Park?: ParksInterface,

    AmbulanceID?: number | any,
    Ambulance?: AmbulancesInterface,
    
    EmployeeID?: number | any,
    EmployeeInterface?: EmployeeInterface,
}