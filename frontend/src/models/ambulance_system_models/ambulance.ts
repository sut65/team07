import { CompaniesInterface } from "./company";
import { TypeAblsInterface } from "./typeAbl";
import { EmployeeInterface } from "../employeeSystemModel/IEmployee";

export interface AmbulancesInterface {

    ID?: number | null,
    Clp: string | null,
    Date: Date | null,
    CarBrand: string | null,

    CompanyID?: number | null,
    Company?: CompaniesInterface,

    TypeAblID?: number | null,
    TypeAbl?: TypeAblsInterface,
    
    EmployeeID?: number | null,
    EmployeeInterface?: EmployeeInterface,
}