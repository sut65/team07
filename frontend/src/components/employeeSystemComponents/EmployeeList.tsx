import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import { EmployeeInterface } from '../../models/employeeSystemModel/IEmployee'
import { Role } from '../../models/role'
import { DeleteEmployee, ListEmployees, ListRoles } from '../../services/employeeSystemServices/EmployeeHttpClient'
import { Link as RouterLink } from "react-router-dom";


import "./EmployeeList.css"
import EmployeeUpdate from './EmployeeUpdate'

export default function EmployeeList() {

    //Employee State
    const [employee, setEmployee] = React.useState<EmployeeInterface[]>([])
    const getEmployee = async () => {
        let res = await ListEmployees();
        console.log(res)
        if (res) {
            setEmployee(res)
            //debug
            // console.log(res)
        }
    }

    //Role State
    const [role, setRole] = React.useState<Role[]>([])
    const getRoles = async () => {
        let res = await ListRoles();
        if (res) {
            setRole(res)
            //debug
            // console.log(res)
        }
    }


    //For Delete state 
    const [deleteID, setDeleteID] = React.useState<number>(0)

    // For Set dialog open
    const [openDelete, setOpenDelete] = React.useState(false);

    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [editID, setEditID] = React.useState(0);



    React.useEffect(() => {
        getEmployee();
        getRoles();

    }, [])


    const convertDateFormat = (date: Date) => {
        const newDate = new Date(date)
        return `${newDate.getDate()} / ${newDate.getMonth() + 1} / ${newDate.getFullYear()} | ${newDate.getHours()} : ${newDate.getMinutes()}`
    }



    const handleDialogDeleteOpen = (ID: number) => {
        setDeleteID(ID)
        setOpenDelete(true)
    }

    const handleDialogDeleteclose = () => {
        setOpenDelete(false)
        setTimeout(() => {
            setDeleteID(0)
        }, 500)
    }


    const handleDelete = async () => {
        let res = await DeleteEmployee(deleteID)
        if (res) {
            console.log(res.data)
        } else {
            console.log(res.data)
        }
        getEmployee();
        setOpenDelete(false)

    }

    const handleDialogUpdateclose = async () => {
        setOpenUpdate(false)
        setTimeout(() => {
            setEditID(0)
        }, 500)
    }

    const handleDialogUpdateOpen = async (ID: number) => {
        setEditID(ID)
        setOpenUpdate(true)
    }

    // const debughandle = () => {
    //     console.log(deleteID)
    // }

    return (
        <Container maxWidth="lg">
            <Grid container spacing={3} >
                <Grid item xs={10} >
                    <Typography
                        component="h3"
                        variant="h5"
                        color="text"
                        gutterBottom
                    >
                        ข้อมูลพนักงาน
                    </Typography>
                </Grid>
                <Grid item xs={2} >
                    <Button
                        variant='contained'
                        color='primary'
                        component={RouterLink}
                        to="/employee/create"
                        className='submit-button'
                    >
                        เพิ่มข้อมูลพนักงาน
                    </Button>
                </Grid>
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
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell>{item.Name}</TableCell>
                                            <TableCell>{item.Surname}</TableCell>
                                            <TableCell>
                                                {
                                                    role.filter((role) => {
                                                        return item.User.RoleID === role.ID
                                                    }).at(0)?.Name
                                                }
                                            </TableCell>{/* Role Get From Searching*/}
                                            <TableCell>{item.WorkingArea.WorkingArea}</TableCell>
                                            <TableCell>{item.Age}</TableCell>
                                            <TableCell>{item.Education.Level}</TableCell>
                                            <TableCell>{convertDateFormat(item.Date)}</TableCell>
                                            <TableCell>
                                                {
                                                    <div>
                                                        <span className={
                                                            (item.StatusID === 1) ? "green-dot" : (
                                                                (item.StatusID === 2) ? "yellow-dot" : (
                                                                    (item.StatusID === 3) ? "red-dot" : "offline-dot"
                                                                )
                                                            )
                                                        }></span>
                                                        {item.Status.Status}
                                                    </div>
                                                }
                                            </TableCell>

                                            <TableCell>
                                                {
                                                    <Button
                                                        variant='outlined'
                                                        color='warning'
                                                        component={RouterLink}
                                                        to={"/employee/update/" + item.ID}
                                                    >
                                                        Update
                                                    </Button>

                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    <Button variant='outlined' color='error' onClick={() => { handleDialogDeleteOpen(item.ID) }}>Delete</Button>
                                                }
                                            </TableCell>
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
            <Dialog
                open={openDelete}
                onClose={handleDialogDeleteclose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`คุณต้องการลบข้อมูลของพนักงาน ${employee.filter((emp) => (emp.ID === deleteID)).at(0)?.Name} จริงหรือไม่`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        หากคุณลบข้อมูลนี้แล้วนั้น คุณจะไม่สามารถกู้คืนได้อีก คุณต้องการลบข้อมูลนี้ใช่หรือไม่
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogDeleteclose}>ยกเลิก</Button>
                    <Button onClick={handleDelete} className="bg-red" autoFocus>
                        ยืนยัน
                    </Button>
                </DialogActions>

            </Dialog>

            {/* <EmployeeUpdate openUpdate={openUpdate} handleDialogUpdateclose={handleDialogUpdateclose} id={editID}/> */}

            {/* <Button onClick={debughandle}>Test</Button> */}
        </Container>


    )
}
