import { AmbulancesInterface } from "../ambulance_system_models/ambulance";
import { EmployeeInterface } from "../employeeSystemModel/IEmployee";

export interface DisinfectionInterface {

    ID?: number | null,
    Note: string | null,
    WorkTime: Date | null,
    AmountDisinfectant: number | null,

    AmbulanceID?: number;
    Ambulance?: AmbulancesInterface;

    DisinfactantID?: number | null,
    Disinfactant?: DisintantInterface,
    
    EmployeeID?: number | null,
    EmployeeInterface?: EmployeeInterface,
}

export interface DisintantInterface {
    ID: number,
    Type: string,
} 