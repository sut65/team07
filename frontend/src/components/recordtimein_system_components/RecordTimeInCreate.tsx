import { Box, Button, CssBaseline, Divider, FormControl, Grid, Paper, Select, SelectChangeEvent, Snackbar, Stack, TextField, Typography } from '@mui/material'
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Link as RouterLink } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import './RecordTimeInCreate.css';
import { CreatRecordTimeIn,  GetRecordTimeInByEmployee,  GetRecordTimeInByID,  ListEmployee, ListRecordtimeouts } from '../../services/recordtimein_system_services/HttpClientServices';

import { AmbulancesInterface } from '../../models/ambulance_system_models/ambulance';
import { RecordTimeInInterface } from '../../models/recordtimein_system_models/recordtimein';
import { ListCompanies, ListTypeAbls, CreatAmbulances, ListAmbulances } from '../../services/ambulance_system_services/HttpClientService';
import { RecordTimeOutInterface } from '../../models/recordtimeout_system_models/recordtimeout';
import { EmployeeInterface } from '../../models/employeeSystemModel/IEmployee';
import { HttpClientServices } from '../../services/recordtimeout_system_services/HttpClientServices';
import { ListEmployees } from '../../services/employeeSystemServices/EmployeeHttpClient';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function RecordTimeInCreate() {

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [message, setAlertMessage] = useState("");

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setSuccess(false);
        setError(false);
    };

    const [recordtimeOUT, setRecordtimeOUT] = useState<RecordTimeOutInterface[]>([]);
    const getRecordtimeOUT = async () => {
        let res = await ListRecordtimeouts();
        if (res) {
            setRecordtimeOUT(res);
        }
    };

    const [employee, setEmployee] = useState<EmployeeInterface[]>([]);
    const getEmployee = async () => {
        let res = await GetRecordTimeInByEmployee();
        if (res) {
            setEmployee(res);
        }
    };
    // const getEmployee = async () => {
    //     let res = await HttpClientServices.get(
    //       `/employee/${localStorage.getItem("id")}`
    //     );
    //     if (!res.error) {
    //       setEmployee(res.results);
    //     } else {
    //       console.log(res.error);
    //     }
    //   };

    const [ambulance, setAmbulance] = useState<AmbulancesInterface[]>([]);
    const getAmbulance = async () => {
        let res = await ListAmbulances();
        if (res) {
            setAmbulance(res);
        }
    };

    const [recordtimein, setRecordtimein] = useState<RecordTimeInInterface>({
        Note: "",
        TimeIn: new Date(),
        Odo: 0,
    });

    const convertType = (data: string | number | undefined | null) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    const handleChangeTextField = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name as keyof typeof recordtimein;
        setRecordtimein({
            ...recordtimein,
            [name]: event.target.value,
        });

    };

    const handleChange = (event: SelectChangeEvent) => {
        const name = event.target.name as keyof typeof recordtimein;
        setRecordtimein({
            ...recordtimein,
            [name]: event.target.value,
        });
    };

    async function submit() {

            let data = {
                AmbulanceID: convertType(recordtimein.AmbulanceID),
                RecordTimeOUTID: convertType(recordtimein.RecordTimeOUTID),
                EmployeeID: convertType(localStorage.getItem("id")),
                Note: recordtimein.Note,
                TimeIn: recordtimein.TimeIn,
                Odo: convertType(recordtimein.Odo),
            };
            let res = await HttpClientServices.post("/driver/recordtimein", data);
            if (!res.error) {
              setSuccess(true);
              console.log(res);
              setAlertMessage("บันทึกข้อมูลสำเร็จ");
            } else {
              setError(true);
              setAlertMessage("บันทึกข้อมูลไม่สำเร็จ " + res.message);
              // console.log(res.message);
            }
            // let res = await CreatRecordTimeIn(data);
            // if (res) {
            //     setSuccess(true);
            //     setAlertMessage("บันทึกข้อมูลสำเร็จ");
            // } else {
            //     setError(true);
            //     setAlertMessage("บันทึกข้อมูลไม่สำเร็จ " + res.message);
            // }
        // let res = await CreatRecordTimeIn(data);

    }

    useEffect(() => {

        getRecordtimeOUT();
        getAmbulance();
        getEmployee();

    }, []);


    return (
        <div>
            <Snackbar
                id="success"
                open={success}
                autoHideDuration={8000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={handleClose} severity="success">
                    {message}
                </Alert>
            </Snackbar>
            <Snackbar
                id="error"
                open={error}
                autoHideDuration={8000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={handleClose} severity="error">
                    {message}
                </Alert>
            </Snackbar>
        

            <Container
                component="main"
                maxWidth="md"
                sx={{
                    marginTop: 2,
                }}>
                <CssBaseline />
                <Paper
                    className="paper"
                    elevation={6}
                    sx={{
                    padding: 2,
                    borderRadius: 3,
                    }}
                >
                    <Box>
                        <Typography
                        variant="h5"
                        color="secondary"
                        sx={{padding: 2, fontWeight: 'bold' }}
                    >
                        บันทึกข้อมูลการใช้รถขาเข้าของพนักงานขับรถ
                    </Typography>
                    </Box>
                    <Divider />
                
                
                <Grid container spacing={2} sx={{ padding: 1 }}>

                <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <Typography className='StyledTypography'> เคสที่ออกปฏิบัติงาน : </Typography>
                            <Select
                                className='StyledTextField'
                                id="ID"
                                native
                                name="RecordTimeOUTID"
                                size="medium"
                                value={recordtimein.RecordTimeOUTID + ""}
                                onChange={handleChange}
                                inputProps={{
                                name: "RecordTimeOUTID",
                                }}
                            ><option>กรุณาเลือกเคส</option>
                                {recordtimeOUT.map((item: RecordTimeOutInterface) => (
                                <option value={item.ID!} key={item.ID}>
                                    ลำดับเคส: {item.CaseID} สถานที่เกิดเหตุ: {item.Case?.Location}
                                </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <Typography className='StyledTypography'> รถคันที่ใช้ : </Typography>
                            <Select
                                className='StyledTextField'
                                id="ID"
                                native
                                name="AmbulanceID"
                                size="medium"
                                value={recordtimein.AmbulanceID + ""}
                                onChange={handleChange}
                                inputProps={{
                                name: "AmbulanceID",
                                }}
                            ><option>กรุณาเลือกรถพยาบาล</option>
                                {ambulance.map((item: AmbulancesInterface) => (
                                <option value={item.ID!} key={item.ID}>
                                    {item.Clp}
                                </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                    <Typography className='StyledTypography'> ODO Meter : </Typography>
                    <TextField
                        id="Odo"
                        name="Odo"
                        type="number"
                        size="medium"
                        InputProps={{
                        inputProps: { min: 1, max: 99999 },
                        name: "Odo",
                        }}
                        onChange={handleChangeTextField}
                        value={recordtimein.Odo}
                    />
                </FormControl>
                </Grid>

                <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                        
                        <Typography className='StyledTypography'> เวลาขาเข้า : </Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                className='StyledTextField'
                                value={recordtimein.TimeIn}
                                onChange={(newValue) => {
                                    setRecordtimein({
                                        ...recordtimein,
                                        TimeIn: newValue,
                                    });
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </FormControl>
                </Grid>

            <Grid item xs={6}>
           
                <Typography className='StyledTypography'> หมายเหตุ : </Typography>
                <FormControl fullWidth variant="outlined">
                    <TextField
                        className='StyledTextField'
                        id="Note"
                        name="Note"
                        type="string"
                        size="medium"
                        color="primary"
                        inputProps={{
                        name: "Note",
                        }}
                        onChange={handleChangeTextField}
                        value={String(recordtimein?.Note ?? "")}
                    />
                </FormControl>
            </Grid>

            
          
          </Grid>

                <Stack
                    spacing={2}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    sx={{ mt: 3 }}
                >

                    <Button
                        variant="contained"
                        color="secondary"
                        component={RouterLink}
                        to="/RecordTimeInHistory"
                    >
                        ถอยกลับ
                    </Button>

                    <Button variant="contained" color="secondary" onClick={submit}> บันทึกข้อมูล </Button>

                </Stack>
            </Paper>
            </Container>
        </div>
    )
}

export default RecordTimeInCreate
