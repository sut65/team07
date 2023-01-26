import { MedicineInterface } from "../ambulanceUse_system_models/medicine";
import { AmbulancesInterface } from "../ambulance_system_models/ambulance";
import { EmployeeInterface } from "../employeeSystemModel/IEmployee";

export interface AmbulanceStoreInterface {
    ID: number,
    Amount: number, 
    Date: Date,

    MedicineID: number, 
    Medicine: MedicineInterface,

    AmbulanceID: number,
    Ambulance: AmbulancesInterface,

    EmployeeID: number, 
    Employee: EmployeeInterface,
}