import { Button, CssBaseline, Divider, FormControl, Grid, IconButton, Paper, Select, SelectChangeEvent, Snackbar, Stack, TextField, Typography } from '@mui/material'
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Link as RouterLink, useParams } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Box, Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { AmbulancesInterface } from '../../models/ambulance_system_models/ambulance';
import { DisinfectionInterface } from '../../models/disinfection_system_models/disinfection';
//import { HttpClientServices } from '../../services/recordtimeout_system_services/HttpClientServices';
import { GetDisinfectionByID, ListAmbulances, ListDisinfectants, UpdateDisinfection } from '../../services/disinfection_system_services/HttpClientServices';
import { DisintantInterface } from '../../models/disinfection_system_models/disinfectant';
import { any } from 'prop-types';
import { HttpClientServices } from '../../services/disinfection_system_services/HttpClientServices';
import { GetRecordTimeInByEmployee, GetRecordTimeInByID, ListRecordtimeouts, UpdateRecordTimeIn } from '../../services/recordtimein_system_services/HttpClientServices';
//import { HttpClientServices } from '../../services/recordtimeout_system_services/HttpClientServices';
import { RecordTimeInInterface } from '../../models/recordtimein_system_models/recordtimein';
import { RecordTimeOutInterface } from '../../models/recordtimeout_system_models/recordtimeout';
import { EmployeeInterface } from '../../models/employeeSystemModel/IEmployee';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function RecordTimeInUpdate() {
  const params = useParams();

  const [recordtimein, setRecordtimein] = useState<Partial<RecordTimeInInterface>>({
    Note: "",
    TimeIn: new Date(),
    Odo: 0,
  });

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

  const [recordtimeout, setRecordTimeOut] = useState<RecordTimeOutInterface[]>([]);
  const getRecordTimeOut = async () => {
    let res = await ListRecordtimeouts();
    if (res) {
        setRecordTimeOut(res);
    }
  };


  const [abl, setAmbulance] = useState<AmbulancesInterface[]>([]);
  const getAmbulance = async () => {
    let res = await ListAmbulances();
    if (res) {
      setAmbulance(res);
    }
  };

  const getRecordTimeinByID = async () => {
    let res = await GetRecordTimeInByID();
    if (res) {
        setRecordtimein(res);
    }
  };

  const convertType = (data: string | number | undefined | null) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  const handleChangeTextField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name as keyof typeof recordtimein;
    console.log(name)
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
      ID: convertType(recordtimein.ID),
      TimeIn: recordtimein.TimeIn,
      Note: recordtimein.Note,
      Odo: convertType(recordtimein.Odo),
      EmployeeID: convertType(localStorage.getItem("id")),
      AmbulanceID: convertType(recordtimein.AmbulanceID),
      RecordTimeOUTID: convertType(recordtimein.RecordTimeOUTID),
    };
    // console.log(data)
    // let res = await UpdateRecordTimeIn(data);
    // if (res) {
    //     setSuccess(true);
    // } else {
    //     setError(true);
    // }

    let res = await HttpClientServices.patch(`/recordtimein`, data);
    if (!res.error) {
      setSuccess(true);
      console.log(res);
      setAlertMessage("อัพเดตข้อมูลสำเร็จ");
    } else {
      setError(true);
      setAlertMessage("อัพเดตข้อมูลไม่สำเร็จ " + res.message);
      // console.log(res.message);
    }
  }

    useEffect(() => {
        getRecordTimeOut();
        getAmbulance();
        getRecordTimeinByID();
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
                        บันทึกข้อมูลการใช้รถขาเข้าของพนักงานขับรถ ลำดับที่ {recordtimein.ID}
                    </Typography>
                    </Box>
                    <Divider />
                
                    
                    
                
                <Grid container spacing={2} sx={{ padding: 1 }}><br></br>

                <Grid item xs={12} >
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
                                {recordtimeout.map((item: RecordTimeOutInterface) => (
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
                                {abl.map((item: AmbulancesInterface) => (
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
                        value={String(recordtimein?.Odo)}
                    />
                </FormControl>
                </Grid>

            <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <Typography> วัน/เวลา ทำการฆ่าเชื้อ </Typography>
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
                renderInput={(params) => <TextField {...params}/>
                }
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
            color="error"
            component={RouterLink}
            to="/RecordTimeInHistory"
            sx={{ '&:hover': { color: '#FC0000', backgroundColor: '#F9EBEB' } }}
          >
            ยกเลิก
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={submit}
            sx={{ '&:hover': { color: '#1543EE', backgroundColor: '#e3f2fd' } }}
          >
            อัพเดตข้อมูล
          </Button>
        </Stack>
        </Paper>
      </Container>
    </div>
  )

}
export default RecordTimeInUpdate