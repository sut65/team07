import { StatusAmsInterface } from "./statusAm";
import { AmbulancesInterface } from "../ambulance_system_models/ambulance";
import { EmployeeInterface } from "../employeeSystemModel/IEmployee";

export interface CarWashsInterface {

    ID?: number | null ,
    ComName: string | any,
    ComTel: string | any,
    ReceiptNum: string | any,
    SerFees: number | any,
    Date: Date | any,
    

    StatusAmID?: number | null,
    StatusAm?: StatusAmsInterface,

    AmbulanceID?: number | any,
    Ambulance?: AmbulancesInterface,
    
    EmployeeID?: number | any,
    EmployeeInterface?: EmployeeInterface,
}