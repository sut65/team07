import { User } from "../user";
import { Education } from "./education";
import { EmpStatus } from "./status";
import { WorkingArea } from "./workingArea";

export interface Employee {
    ID:number,
    Name:string,
    Surname:string,
    Age: number,
    Date: Date | null,

    UserID:number,
    User: User

    WorkingAreaID: number,
    WorkingArea : WorkingArea,

    StatusID : number,
    Status: EmpStatus,

    EducationID: number,
    Education : Education
}