import { AmbulancesInterface } from "../ambulance_system_models/ambulance";
import { EmployeeInterface } from "../employeeSystemModel/IEmployee";
import { RecordTimeOutInterface } from "../recordtimeout_system_models/recordtimeout";

export interface RecordTimeInInterface {

  ID?: number | null,
  Note?: string | null,
  Odo?: number | null,
  TimeIn?: Date | null,

  AmbulanceID?: number | null,
  Ambulance?: AmbulancesInterface,

	RecordTimeOUTID?: number | null,
	RecordTimeOUT?: RecordTimeOutInterface,

  EmployeeID?: number| null,
  Employee ?: EmployeeInterface ,
}

// export interface RecordTimeInInterface {

//   ID?: number;
//   Note?: string;
//   Odo?: number;
//   TimeIn?: Date;

//   AmbulanceID?: number;
//   Ambulance?: AmbulancesInterface,

// 	RecordTimeOUTID?: number;
// 	RecordTimeOUT?: RecordTimeOutInterface,

//   EmployeeID?: number;
//   Employee ?: EmployeeInterface ,
// }