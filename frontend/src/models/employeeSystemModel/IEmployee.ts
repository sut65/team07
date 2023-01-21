import { User } from "../user";
import { EducationInterface } from "./IEducation";
import { EmpStatusInterface } from "./IStatus";
import { WorkingAreaInterface } from "./IWorkingArea";

export interface EmployeeInterface {
    ID:number,
    Name:string,
    Surname:string,
    Age: number,
    Date: Date,

    UserID:number,
    User: User

    WorkingAreaID: number,
    WorkingArea : WorkingAreaInterface,

    StatusID : number,
    Status: EmpStatusInterface,

    EducationID: number,
    Education : EducationInterface
}