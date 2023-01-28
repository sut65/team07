import { EmployeeInterface } from "../employeeSystemModel/IEmployee";
import { MedicineInterface } from "./medicine";
import { AmbulancesInterface } from "../ambulance_system_models/ambulance";

export interface AmbulanceUseInterface {

    ID?: number | any,
    Amount: number | any,
    Date: Date | any,

    EmployeeID?: number | any,
	Employee?: EmployeeInterface,

	MedicineID?: number | any,
	Medicine?: MedicineInterface,

	AmbulanceID?: number | any,
	Ambulance?: AmbulancesInterface,

}