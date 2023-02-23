import { Button, CssBaseline, FormControl, Grid, Select, SelectChangeEvent, Snackbar, Stack, TextField, Typography } from '@mui/material'
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Link as RouterLink } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import './CarDepotCreate.css';
import { ParksInterface } from '../../models/carDepot_system_models/park';
import { CarDepotsInterface } from '../../models/carDepot_system_models/carDepot';
import { ListParks, CreatCarDepots } from '../../services/carDepot_system_services/HttpClientService';
import { AmbulancesInterface } from '../../models/ambulance_system_models/ambulance';
import { ListAmbulances } from '../../services/ambulance_system_services/HttpClientService';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



function CarDepotCreate() {
    const [Alertmsg, setAlertmsg] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setSuccess(false);
        setError(false);
    };

    const [ambulances, setAmbulances] = useState<AmbulancesInterface[]>([]);
    const getAmbulances = async () => {
        let res = await ListAmbulances();
        if (res) {
            setAmbulances(res);
            console.log(res)
        }
    };

    const [parks, setParks] = useState<ParksInterface[]>([]);
    const getParks = async () => {
        let res = await ListParks();
        if (res) {
            setParks(res);
        }
    };


    const [carDepot, setCarDepot] = useState<CarDepotsInterface>({
        EmpCode: "",
        Date: new Date(),
        PNum: 0,
    });

    const convertType = (data: string | number | undefined | null) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    const handleChangeTextField = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name as keyof typeof carDepot;
        setCarDepot({
            ...carDepot,
            [name]: event.target.value,
        });

    };

    const handleChange = (event: SelectChangeEvent) => {
        const name = event.target.name as keyof typeof carDepot;
        setCarDepot({
            ...carDepot,
            [name]: event.target.value,
        });
    };

    

    async function submit() {
        let data = {
            ParkID: convertType(carDepot.ParkID),
            EmployeeID: convertType(localStorage.getItem("id")),
            AmbulanceID: convertType(carDepot.AmbulanceID),
            EmpCode: carDepot.EmpCode,
            PNum: convertType(carDepot.PNum),
            Date: carDepot.Date,

        };
        let res = await CreatCarDepots(data);
        console.log(res)
        if (res.data) {
            setAlertmsg("บันทึกสำเร็จ");
            setSuccess(true);
            setError(false)
        } else {
            setAlertmsg("บันทึกไม่สำเร็จ"+res);
            console.log(res)
            setError(true);
            
        }
    }


    useEffect(() => {
        getAmbulances();
        getParks();

    }, []);


    return (
        <div>
            <Snackbar 
                open={success} 
                autoHideDuration={10000} 
                onClose={handleClose} 
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                sx={{mt:10}}
            >
                <Alert 
                    onClose={handleClose} 
                    severity="success" 
                    sx={{ width: '100%', borderRadius: 3 }}
                >
                    {Alertmsg}
                </Alert>
            </Snackbar>

            <Snackbar 
                open={error} 
                autoHideDuration={10000} 
                onClose={handleClose} 
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                sx={{mt:10}}
            >
                <Alert 
                    onClose={handleClose} 
                    severity="error"
                    sx={{ width: '100%', borderRadius: 3}}
                >
                    {Alertmsg}
                </Alert>
            </Snackbar>

            <Container
                component="main"
                maxWidth="sm"
                sx={{
                    mt: 5,
                    mb: 2,
                    p: 2,
                    boxShadow: 3,
                    bgcolor: '#F1F6F5'
                }}
                disableGutters={true}
            >
                <CssBaseline />
                <Stack
                    sx={{ p: 0, m: 0, mb: 3 }}
                >
                    <Typography
                        variant="h5"
                        color="primary"
                        sx={{ fontWeight: 'bold' }}
                    >
                        บันทึกสถานที่จอดรถ
                    </Typography>
                </Stack>
                <Grid container spacing={2} >
                <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <p>เลขทะเบียนรถพยาบาล</p>
              <Select
                native
                value={carDepot.AmbulanceID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "AmbulanceID",
                }}
              >
                <option aria-label="None" value="">
                  เลขทะเบียนรถ
                </option>
                {ambulances.map((item: AmbulancesInterface) => (
                  <option value={Number(item.ID)} key={item.ID}>
                    {item.Clp}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>          
      
                    <Grid item={true} xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <Typography className='StyledTypography'> อาคารจอดรถ </Typography>
                            <Select
                                className='StyledTextField'
                                size="small"
                                color="primary"
                                native
                                value={carDepot.ParkID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "ParkID",
                                }}>
                                <option aria-label="None" value="">
                                    กรุณาเลือกที่จอดรถ
                                </option>
                                {parks.map((item: ParksInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.Name}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <p>เลขช่องจอดรถ</p>
                        <TextField
                            name='PNum'
                            type="number"
                            value={carDepot.PNum || ""}
                            InputProps={{
                                inputProps: {
                                    min: 1,
                                    max: 200
                                }
                            }}
                            sx={{ width: "100%" }}
                            onChange={handleChangeTextField}
                        />
                    </Grid>
                    <Grid item={true} xs={12}>
                        <Typography className='StyledTypography'> รหัสพนักงาน </Typography>
                        <TextField className='StyledTextField'
                            autoComplete='off'
                            id="Name"
                            variant="outlined"
                            size="small"
                            color="primary"
                            fullWidth
                            onChange={handleChangeTextField}
                            inputProps={{
                                name: "EmpCode",
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <Typography className='StyledTypography'> วันที่และเวลา </Typography>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    className='StyledTextField'
                                    value={carDepot.Date}
                                    onChange={(newValue) => {
                                        setCarDepot({
                                            ...carDepot,
                                            Date: newValue,
                                        });
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
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
                        to="/CarDepot"
                        sx={{ borderRadius: 10, '&:hover': {color: '#FC0000', backgroundColor: '#F9EBEB'}}}
                    >
                        ถอยกลับ
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={submit}
                        sx={{ borderRadius: 10, '&:hover': {color: '#1543EE', backgroundColor: '#e3f2fd'}}}
                    >
                        บันทึกข้อมูล
                    </Button>

                </Stack>
            </Container>
        </div>
    )
}

export default CarDepotCreate
