import { Box, FormControl, Grid, Select, TextField, Typography } from '@mui/material'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Snackbar from '@mui/material/Snackbar'
import React from 'react'
import { EducationInterface } from '../../models/employeeSystemModel/IEducation'
import { EmployeeInterface } from '../../models/employeeSystemModel/IEmployee'
import { EmpStatusInterface } from '../../models/employeeSystemModel/IStatus'
import { WorkingAreaInterface } from '../../models/employeeSystemModel/IWorkingArea'
import { User } from '../../models/user'
import { ListEducation, ListEmployees, ListStatus, ListUser, ListWorkingArea, PostEmployee } from '../../services/employeeSystemServices/EmployeeHttpClient'
import { convertType } from '../../services/utility'
import { Link as RouterLink, useNavigate } from "react-router-dom";


export default function EmployeeCreate() {

    const [snackBar, setSnackBar] = React.useState({
        open: false,
        error: false,
        errorMsg: ""
    })

    // State for get data to display
    // main
    const [employee, setEmployee] = React.useState<Partial<EmployeeInterface>>({})
    // relation
    const [status, setStatus] = React.useState<EmpStatusInterface[]>([]);
    const [user, setUser] = React.useState<User[]>([]);
    const [workingArea, setWorkingArea] = React.useState<WorkingAreaInterface[]>([]);
    const [education, setEducation] = React.useState<EducationInterface[]>([]);

    const [mymap, setMyMap] = React.useState(new Map())

    // for show data
    const [selectUser, setSelectUser] = React.useState<User>();
    // const [selectUser, setSelectUser] = React.useState<User>();

    const [error, setError] = React.useState({
        status: "",
        user: "",
        workingArea: "",
        education: ""
    })
    // get status
    const getStatus = async () => {
        let res = await ListStatus();
        if (res) {
            setStatus(res);
        } else {
            setError({
                ...error,
                status: "cannot load status from this api"
            })
        }
    }

    // get employee in database for filter using user
    const listEmployee = async () => {
        const hashmaps = new Map()
        let res = await ListEmployees()
        for (var i = 0 ; i < res.length ; i++){
            setMyMap(hashmaps.set(res.at(i).UserID, i))
        }
        // console.log(hashmaps)
        return hashmaps
    }

    // get user
    const getUser = async () => {
        let res = await ListUser();
        if (res) {
            setUser(res);
        } else {
            setError({
                ...error,
                user: "cannot load user from this api"
            })
        }
    }

    // get working area
    const getWorkingArea = async () => {
        let res = await ListWorkingArea();
        if (res) {
            setWorkingArea(res)
        } else {
            setError({
                ...error,
                workingArea: "cannot load working area from this api"
            })
        }
    }

    // get Education
    const getEducation = async () => {
        let res = await ListEducation();
        if (res) {
            setEducation(res)
        } else {
            setError({
                ...error,
                education: "cannot load education from this api"
            })
        }
    }


    // Function snackbar
    const handleSnackBarOpen = () => {
        setSnackBar({
            ...snackBar,
            open: true
        })
    }
    const handleSnackBarError = (res : any) => {
        setSnackBar({
            ...snackBar,
            error: true,
            errorMsg: res
        })
    }
    const handleSnackBarClose = () => {
        setSnackBar({
            ...snackBar,
            open: false,
            error: false,
        })
    }
    
    const navigator = useNavigate();
    // Submit Function
    const submit = async () => {
        // console.log(employee)

        let res = await PostEmployee(employee)
        console.log(res)
        if(res.data){
            handleSnackBarOpen()
            setTimeout(() => {
                navigator("/employee")
            }, 1000)
        }else{
            console.log("Error")
            handleSnackBarError(res.error)
        }
    }

    React.useEffect(() => {
        getStatus();
        getUser();
        getEducation();
        getWorkingArea();
        listEmployee()
    }, [])


    const handleChange: any = (event: React.ChangeEvent<{ name: string; value: any }>) => {
        const name = event.target.name as keyof typeof employee;
        if (name === "UserID") {
            console.log()
            if (event.target.value !== "") {
                setSelectUser(user.filter((userfind) => userfind.ID === convertType(event.target.value)).at(0))
            }
            else {
                setSelectUser({
                    ID: 0,
                    Name: "",
                    Password: "",
                    Role: {
                        ID: 0,
                        Name: ""
                    },
                    RoleID: 0
                })
            }
        }

        setEmployee({
            ...employee,
            [name]: event.target.value
        })
    }

    return (
        <Container maxWidth="lg">
            {/* Snackbar success Part */}
            <Snackbar open={snackBar.open} autoHideDuration={3000} onClose={handleSnackBarClose}>
                <Alert onClose={handleSnackBarClose} severity="success">
                    บันทึกสำเร็จ
                </Alert>
            </Snackbar>

            {/* Snackbar Error part */}
            <Snackbar open={snackBar.error} autoHideDuration={3000} onClose={handleSnackBarClose}>
                <Alert onClose={handleSnackBarClose} severity="error">
                    ไม่สามารถบันทึกได้ : {snackBar.errorMsg}
                </Alert>
            </Snackbar>

            <Paper sx={{ p: 4, pb: 10 }}>
                <Box display="flex">
                    <Box flexGrow={1}>
                        <Typography
                            component="h2"
                            variant="h6"
                            gutterBottom
                            color="black"
                        >
                            บันทึกข้อมูลพนักงาน
                        </Typography>
                    </Box>
                </Box>
                <hr />

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant='outlined'>
                            <p>เลือก User</p>
                            <Select
                                native
                                value={employee.UserID}
                                onChange={handleChange}
                                inputProps={{
                                    name: "UserID"
                                }}
                            >
                                <option aria-label="None" value="">
                                    กรุณาเลือก ชื่อผู้ใช้
                                </option>
                                {
                                    user.filter((item) => {
                                        // console.log(mymap.has(item.ID))
                                        // console.log(item.Role.Name)
                                        return ! mymap.has(item.ID)
                                    }).map((item: User) =>
                                    (<option value={item.ID} key={item.ID}>
                                        {item.Name}
                                    </option>)

                                    )
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <p>ตำแหน่ง</p>
                        <TextField label={selectUser?.Role.Name} disabled />
                    </Grid>
                </Grid>

                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <p>ชื่อ</p>
                        <TextField
                            name='Name'
                            type="text"
                            value={employee.Name || ""}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <p>นามสกุล</p>
                        <TextField
                            name='Surname'
                            type="text"
                            value={employee.Surname || ""}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <p>อายุ</p>
                        <TextField
                            name='Age'
                            type="number"
                            value={employee.Age || ""}
                            placeholder="22"
                            InputProps={{
                                inputProps: {
                                    min: 1,
                                    max: 100
                                }
                            }}
                            sx={{ width: "100%" }}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <FormControl fullWidth variant='outlined'>
                            <p>การศึกษา</p>
                            <Select
                                native
                                value={employee.EducationID}
                                onChange={handleChange}
                                inputProps={{
                                    name: "EducationID"
                                }}
                            >
                                <option aria-label="None" value="">
                                    การศึกษา
                                </option>
                                {
                                    education.map((item: EducationInterface) =>
                                    (<option value={item.ID} key={item.ID}>
                                        {item.Level}
                                    </option>)
                                    )
                                }
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={4}>
                        <FormControl fullWidth variant='outlined'>
                            <p>ความพร้อม</p>
                            <Select
                                native
                                value={employee.StatusID}
                                onChange={handleChange}
                                inputProps={{
                                    name: "StatusID"
                                }}
                            >
                                <option aria-label="None" value="">
                                    ความพร้อม
                                </option>
                                {
                                    status.map((item: EmpStatusInterface) =>
                                    (<option value={item.ID} key={item.ID}>
                                        {item.Status}
                                    </option>)
                                    )
                                }
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={4}>
                        <FormControl fullWidth variant='outlined'>
                            <p>พื้นที่ทำการ</p>
                            <Select
                                native
                                value={employee.WorkingAreaID}
                                onChange={handleChange}
                                inputProps={{
                                    name: "WorkingAreaID"
                                }}
                            >
                                <option aria-label="None" value="">
                                พื้นที่ทำการ
                                </option>
                                {
                                    workingArea.map((item: WorkingAreaInterface) =>
                                    (<option value={item.ID} key={item.ID}>
                                        {item.WorkingArea}
                                    </option>)
                                    )
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} >
                        <Button component={RouterLink} to="/employee" variant='outlined'>
                            ย้อนกลับ
                        </Button>
                        <Button
                            style={{ float: "right" }}
                            variant="contained"
                            onClick={submit}
                        >
                            บันทึกข้อมูล
                        </Button>
                    </Grid>
                </Grid>



            </Paper>

            {/* 
        // Button Debuger
        <Button onClick={handleSnackBarOpen}>
            TestOpen
        </Button>
        <Button onClick={handleSnackBarError}>
            TestError
        </Button> 
        
        */}
        </Container>
    )
}
