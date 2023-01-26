import { AmbulancesInterface } from "../ambulance_system_models/ambulance";
import { EmployeeInterface } from "../employeeSystemModel/IEmployee";
export interface VehicleInspectionInterface {
  ID?: number;
  Fail?: string;
  OdoMeter?: number;
  VehicleInspectionDatetime?: Date;

  AmbulanceID?: number;
  Ambulance?: AmbulancesInterface;

  StatusCheckID?: number;
  StatusCheck?: StatusCheckInterface;

  AmbulancePartID?: number;
  AmbulancesPart?: AmbulancePartInterface;

  EmployeeID?: number;
  Employee?: EmployeeInterface;
}

export interface StatusCheckInterface {
  ID?: number;
  StatusName?: string;
}

export interface AmbulancePartInterface {
  ID?: number;
  PartName?: string;
}
