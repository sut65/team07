import { CarStatInterface } from "./carstat";
import { EmployeeInterface } from "../employeeSystemModel/IEmployee";
import { VehicleInspectionInterface } from "../vehicleinspection_system_models/vehicleinspection";

export interface CarcareInterface {
    
    ID?: number | null,
    SendDate?: Date | null,
    ReciveDate?: Date | null,
    Bill?: number | null,
    Note?: string | null,
    SaveDate?: Date | null,

    CarStatID?: number | null,
    CarStat?: CarStatInterface,

    EmployeeID?: number | null,
    Employee?: EmployeeInterface,

    VehicleInspectionID?: number | null,
    VehicleInspection?: VehicleInspectionInterface
}

