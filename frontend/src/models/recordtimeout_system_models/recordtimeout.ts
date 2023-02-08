import { AmbulancesInterface } from "../ambulance_system_models/ambulance";
import { EmployeeInterface } from "../employeeSystemModel/IEmployee";
import { CaseInterface } from "../emergency_system_models/case";
export interface RecordTimeOutInterface {

  ID?: number;
  Annotation?: string;
  OdoMeter?: number;
  RecordTimeOutDatetime?: Date;
  AmbulanceID?: number;
  Ambulance?: AmbulancesInterface;

  CaseID?: number;
  Case ?: CaseInterface;

  EmployeeID?: number;
  Employee?: EmployeeInterface;
}
