import { Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { EmployeeInterface } from '../../models/employeeSystemModel/IEmployee'
import { Role } from '../../models/role'
import { ListEmployees, ListRoles } from '../../services/employeeSystemServices/EmployeeHttpClient'

import "./EmployeeList.css"

export default function EmployeeList() {

    //Employee State
    const [employee, setEmployee] = React.useState<EmployeeInterface[]>([])
    const getEmployee = async () =>{
        let res = await ListEmployees();
        if (res) {
            setEmployee(res)
            //debug
            console.log(res)
        }
    }

    //Role State
    const [role, setRole] = React.useState<Role[]>([])
    const getRoles = async () =>{
        let res = await ListRoles();
        if (res) {
            setRole(res)
            //debug
            // console.log(res)
        }
    }


    React.useEffect(() => {
        getEmployee();
        getRoles();
        
    },[])


    const convertDateFormat = (date : Date) => {
        const newDate = new Date(date)
        
        return `${newDate.getDate()} / ${newDate.getMonth()} / ${newDate.getFullYear()} | ${newDate.getHours()} : ${newDate.getMinutes()}`
    }

    return (
        <Container maxWidth="lg">
            <Grid container spacing={5} >
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ชื่อ</TableCell>
                                    <TableCell>นามสกุล</TableCell>
                                    <TableCell>ตำแหน่งงาน</TableCell> {/* Role Get From Searching*/}
                                    <TableCell>พื้นที่ทำการ</TableCell>
                                    <TableCell>อายุ</TableCell>
                                    <TableCell>การศึกษา</TableCell>
                                    <TableCell>เวลาบันทึก</TableCell>
                                    <TableCell>ความพร้อม</TableCell>
                                    <TableCell>แก้ไข</TableCell>
                                    <TableCell>ลบ</TableCell>
                                </TableRow>
                            </TableHead>

                            {/* Body */}
                            <TableBody>
                                {
                                    employee.map((item) => (
                                        <TableRow
                                            key={item.ID}
                                            sx={{'&:last-child td, &:last-child th': { border: 0 }}}
                                        >
                                            <TableCell>{item.Name}</TableCell>
                                            <TableCell>{item.Surname}</TableCell>
                                            <TableCell>
                                                {
                                                    role.filter((role)=> {
                                                        return item.User.RoleID == role.ID
                                                    }).at(0)?.Name
                                                }
                                            </TableCell>{/* Role Get From Searching*/}
                                            <TableCell>{item.WorkingArea.WorkingArea}</TableCell>
                                            <TableCell>{item.Age}</TableCell>
                                            <TableCell>{item.Education.Level}</TableCell>
                                            <TableCell>{convertDateFormat(item.Date)}</TableCell>
                                            <TableCell>{item.Status.Status}</TableCell>

                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                {/* <Grid item xs={6}>
                    Test
                </Grid> */}
            </Grid>
        </Container>
    )
}
