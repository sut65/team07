import { Button, CssBaseline, FormControl, Grid, Select, SelectChangeEvent, Snackbar, Stack, TextField, Typography } from '@mui/material'
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Link as RouterLink } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import './CarDepotCreate.css';
import { AmbulancesInterface } from '../../models/ambulance_system_models/ambulance';
import { ParksInterface } from '../../models/carDepot_system_models/park';
import { CarDepotsInterface } from '../../models/carDepot_system_models/carDepot';
import { ListParks,  GetCarDepotByID, UpdateCarDepot } from '../../services/carDepot_system_services/HttpClientService';
import { ListAmbulances } from '../../services/ambulance_system_services/HttpClientService';
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CarDepotUpdate() {
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

    const [parks, setParks] = useState<ParksInterface[]>([]);
    const getParks = async () => {
        let res = await ListParks();
        if (res) {
            setParks(res);
        }
    };


    const [ambulances, setAmbulances] = useState<AmbulancesInterface[]>([]);
    const getAmbulances = async () => {
        let res = await ListAmbulances();
        if (res) {
            setAmbulances(res);
            console.log(res)
        }
    };

    const [carDepot, setCarDepot] = useState<CarDepotsInterface>({
        EmpCode: "",
        Date: new Date(),
        PNum: 0,
    });

    const getCarDepotDataByID = async () => {
        let res = await GetCarDepotByID();
        if (res) {
            console.log(res)
            setCarDepot(res);
        }
    };

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
            ID: convertType(localStorage.getItem("id")),
            ParkID: convertType(carDepot.ParkID),
            EmployeeID: convertType(localStorage.getItem("id")),
            AmbulanceID: convertType(localStorage.getItem("id")),
            EmpCode: carDepot.EmpCode,
            PNum: convertType(carDepot.PNum),
            Date: carDepot.Date,
        };
        let res = await UpdateCarDepot(data);
        console.log(res)
        if (res.data) {
            setAlertmsg("อัพเดตสำเร็จ");
            setSuccess(true);
            setError(false)
        } else {
            setAlertmsg("อัพเดตไม่สำเร็จ"+res);
            console.log(res)
            setError(true);
            
        }
    }

    useEffect(() => {

        getParks();
        getCarDepotDataByID();

    }, []);

    return (
        <div>
            <Snackbar
                open={success}
                autoHideDuration={2000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                sx={{ mt: 10 }}
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
                autoHideDuration={2000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                sx={{ mt: 10 }}
            >
                <Alert
                    onClose={handleClose}
                    severity="error"
                    sx={{ width: '100%', borderRadius: 3 }}
                >
                    {Alertmsg}
                </Alert>
            </Snackbar>
            <Container
                component="main"
                maxWidth="md"
                sx={{
                    mt: 5,
                    mb: 2,
                    p: 2,
                    boxShadow: 3,
                    bgcolor: '#F1F6F5'
                }}>
                <CssBaseline />
                <Stack
                    sx={{ p: 0, m: 0, mb: 3 }}
                >
                    <Typography
                        variant="h5"
                        color="primary"
                        sx={{ fontWeight: 'bold' }}
                    >
                        แก้ไขข้อมูลคลังจอดรถ {carDepot?.ID}
                    </Typography>
                </Stack>
                <Grid container spacing={2} >
                    <Grid item={true} xs={6}>
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
                                }}
                            >
                                <option aria-label="None" value="">
                                    กรุณาเลือกอาคารจอดรถ
                                </option>
                                {parks.map((item: ParksInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.Name}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>         
          <Grid item xs={12}>
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
                            autoComplete="off"
                            id="Name"
                            variant="outlined"
                            size="small"
                            color="primary"
                            fullWidth
                            onChange={handleChangeTextField}
                            inputProps={{
                                name: "EmpCode",
                            }}
                            value={carDepot.EmpCode}
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
                        sx={{ borderRadius: 10, '&:hover': { color: '#FC0000', backgroundColor: '#F9EBEB' } }}
                    >
                        ยกเลิก
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        component={RouterLink}
                        to="/CarDepot"
                        sx={{ borderRadius: 10, '&:hover': { color: '#FC0000', backgroundColor: '#F9EBEB' } }}
                    >
                        ถอยกลับ
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={submit}
                        sx={{ borderRadius: 10, '&:hover': { color: '#1543EE', backgroundColor: '#e3f2fd' } }}
                    >
                        อัพเดตข้อมูล
                    </Button>
                </Stack>
            </Container>
        </div>
    )
}
export default CarDepotUpdate