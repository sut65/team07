import { Alert, Box, Button, DialogTitle, FormControl, Paper, Select, Snackbar, TextField, Typography } from '@mui/material'
import Container from '@mui/material/Container'
import Dialog from '@mui/material/Dialog'
import Grid from '@mui/material/Grid'
import React from 'react'
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom'
import { EducationInterface } from '../../models/employeeSystemModel/IEducation'
import { EmployeeInterface } from '../../models/employeeSystemModel/IEmployee'
import { EmpStatusInterface } from '../../models/employeeSystemModel/IStatus'
import { WorkingAreaInterface } from '../../models/employeeSystemModel/IWorkingArea'
import { User } from '../../models/user'
import { GetEmployee, ListEducation, ListStatus, ListWorkingArea, UpdateEmployee } from '../../services/employeeSystemServices/EmployeeHttpClient'
import { convertType } from '../../services/utility'

export default function EmployeeUpdate() {

    let {id} = useParams();
    const navigator = useNavigate()

    const [snackBar, setSnackBar] = React.useState({
        open: false,
        error: false,
        errorMsg: ""
    })


    // List all Database
    // Get employee by id
    const [employee, setEmployee] = React.useState<Partial<EmployeeInterface>>({})
    const getEmployeeByID = async (id:string | undefined) => {
        let res = await GetEmployee(id)
        if(res){
            setEmployee(res)
        }
    }

    // List Working 
    const [working, setWorking] = React.useState<WorkingAreaInterface[]>([])
    const getWorkingArea = async () => {
        let res = await ListWorkingArea()
        if(res){
            setWorking(res)
        }
    }

    // List Status
    const [status, setStatus] = React.useState<EmpStatusInterface[]>([])
    const getStatus = async () => {
        let res = await ListStatus()
        if(res){
            setStatus(res)
        }
    }

    // List education
    const [education, setEducation] = React.useState<EducationInterface[]>([])
    const getEducation = async () => {
        let res = await ListEducation()
        if(res){
            setEducation(res)
        }
    }

    React.useEffect(()=>{
        getEmployeeByID(id);
        getWorkingArea();
        getStatus();
        getEducation();
    },[])

    // submit
    const submit = async () => {
        console.log(employee)

        let res = await UpdateEmployee(employee)
        
        if(res.data){
            handleSnackBarOpen()
            // setTimeout(() => {
            //     navigator("/employee")
            // }, 5000)
        }else{
            handleSnackBarError(res.error)
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

    // Change Value in Box
    const handleChange: any = (event: React.ChangeEvent<{ name: string; value: any }>) => {
        const name = event.target.name as keyof typeof employee;

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
                            <p>User</p>
                            <Select
                                native
                                value={employee.UserID}
                                onChange={handleChange}
                                inputProps={{
                                    name: "UserID"
                                }}
                                disabled
                            >
                                <option aria-label="None" value="">
                                    {employee.User?.Name}
                                </option>
                                
                            </Select>
                        </FormControl>
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
                                    working.map((item: WorkingAreaInterface) =>
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
        </Container>
    )
}
