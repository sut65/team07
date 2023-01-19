import { Role } from "./role";
export interface User{
    ID:number,
    Name: string;
    Password: string,

    RoleID:number,
    Role: Role
    
}