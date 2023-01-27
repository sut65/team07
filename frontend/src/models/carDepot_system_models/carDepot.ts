import { ParksInterface } from "./park";
import { AmbulancesInterface } from "../ambulance_system_models/ambulance";
import { EmployeeInterface } from "../employeeSystemModel/IEmployee";

export interface CarDepotsInterface {

    ID?: number | null ,
    EmpCode: string | null,
    PNum: number | null,
    Date: Date | null,
    

    ParkID?: number | null,
    Park?: ParksInterface,

    AmbulanceID?: number | null,
    Ambulance?: AmbulancesInterface,
    
    EmployeeID?: number | null,
    EmployeeInterface?: EmployeeInterface,
}