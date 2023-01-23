import { AmbulancesInterface } from "../ambulance_system_models/ambulance";

export interface RecordTimeInInterface {
  ID?: number;
  Note?: string;
  Odo?: number;
  TimeIn?: Date;

  AmbulanceID?: number;
  Ambulance?: AmbulancesInterface;

  CaseID?: number;
  //   Case ?: CaseInterface;

  EmployeeID?: number;
  //   Employee ?: EmployeeInterface ;
}