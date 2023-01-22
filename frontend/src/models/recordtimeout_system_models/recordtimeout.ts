import { AmbulancesInterface } from "../ambulance_system_models/ambulance";

export interface RecordTimeOutInterface {
  ID?: number;
  Annotation?: string;
  Odo_Meter?: number;
  Record_Time_Out_Datetime?: Date;
  AmbulanceID?: number;
  Ambulance?: AmbulancesInterface;

  CaseID?: number;
  //   Case ?: CaseInterface;

  EmployeeID?: number;
  //   Employee ?: EmployeeInterface ;
}
