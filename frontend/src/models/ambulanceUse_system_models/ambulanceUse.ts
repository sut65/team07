import { EmployeeInterface } from "../employeeSystemModel/IEmployee";
import { MedicineInterface } from "./medicine";
import { AmbulancesInterface } from "../ambulance_system_models/ambulance";

export interface AmbulanceUseInterface {

    ID?: number | null,
    Amount: number | null,
    Date: Date | null,

    EmployeeID?: number | null,
	Employee?: EmployeeInterface,

	MedicineID?: number | null,
	Medicine?: MedicineInterface,

	AmbulanceID?: number | null,
	Ambulance?: AmbulancesInterface,

}