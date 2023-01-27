import { GenderInterface } from "./gender"
import { EmergencyInterface } from "./emergency";
import { EmployeeInterface } from "../employeeSystemModel/IEmployee";

export interface CaseInterface {

    ID?:                number | null,
    Location:           string | null,
    Patient:            string | null,
    Age:                number | null,
    Status:             string | null,
    Date:               Date | null,

    GenderID?:          number | null,
    Gender?:            GenderInterface,

    EmergencyID?:       number | null,
    Emergency?:         EmergencyInterface,
    
    EmployeeID?:        number | null,
    EmployeeInterface?: EmployeeInterface,
}