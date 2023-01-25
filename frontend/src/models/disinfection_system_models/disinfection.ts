import { AmbulancesInterface } from "../ambulance_system_models/ambulance";
import { EmployeeInterface } from "../employeeSystemModel/IEmployee";
import { DisintantInterface } from "./disinfectant";

export interface DisinfectionInterface {

    ID?: number | null,
    Note: string | null,
    WorkTime: Date | null,
    AmountDisinfectant: number | null,

    AmbulanceID?: number | null,
    Ambulance?: AmbulancesInterface,

    DisinfactantID?: number | null,
    Disinfactant?: DisintantInterface,
    
    EmployeeID?: number | null,
    EmployeeInterface?: EmployeeInterface,
}