import { CompaniesInterface } from "./company";
import { TypeAblsInterface } from "./typeAbl";

export interface AmbulancesInterface {

    ID?: number,
    Clp: string | null,
    Date: Date | null,
    CarBrand: string | null,

    CompanyID?: number,
    Company?: CompaniesInterface,

    TypeAblID?: number,
    TypeAbl?: TypeAblsInterface,
    
    EmployeeID?: number, //test
}