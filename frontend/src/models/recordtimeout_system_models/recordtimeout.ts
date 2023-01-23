import { AmbulancesInterface } from "../ambulance_system_models/ambulance";

export interface RecordTimeOutInterface {
  ID?: number;
  Annotation?: string;
  OdoMeter?: number;
  RecordTimeOutDatetime?: Date ;
  AmbulanceID?: number;
  Ambulance?: AmbulancesInterface;

  CaseID?: number;
  //   Case ?: CaseInterface;

  EmployeeID?: number;
  //   Employee ?: EmployeeInterface ;
}
