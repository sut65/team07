import React, { ChangeEvent, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DatePicker, LocalizationProvider, MobileDateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { InputAdornment } from "@mui/material";
import './carcare.css';


import { CarcareInterface } from "../../models/carcare_system_models/carcare";
import { CarStatInterface } from "../../models/carcare_system_models/carstat";
import { VehicleInspectionInterface } from "../../models/vehicleinspection_system_models/vehicleinspection";

import {
    CreateCarecare,
    GetCarstat,
    GetVehicleInspection,
} from '../../services/carcare_system_services/HttpClientService';
import { buildTimeValue } from "@testing-library/user-event/dist/utils";




const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CarCareCreate() {

    const [carstats, setCarStats] = useState<CarStatInterface[]>([]);
    const [vehicleInspections, setVehicleInspection] = useState<VehicleInspectionInterface[]>([]);
    const [carcare, setCarcare] = useState<CarcareInterface>({

        SendDate: new Date(),
        ReciveDate: new Date(),
        Bill: 0,
        Note: "",
        SaveDate: new Date(),

    });

    const getVehicleInspection = async () => {
        let res = await GetVehicleInspection();
        if (res) {
            setVehicleInspection(res);
        }
    };

    const getCarStats = async () => {
        let res = await GetCarstat();
        if (res) {
            setCarStats(res);
        }
    };


    useEffect(() => {
        getVehicleInspection();
        getCarStats();
    }, [])

    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setSuccess(false);
        setError(false);
    };

    const handleChange = (event: SelectChangeEvent) => {
        const name = event.target.name as keyof typeof carcare;
        setCarcare({
            ...carcare,
            [name]: event.target.value,
        });
    };

    const handleChangeTextField = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name as keyof typeof carcare;
        setCarcare({
            ...carcare,
            [name]: event.target.value,
        });
    };

    const convertType = (data: string | number | undefined | null) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    async function submit() {
        let data = {
            VehicleInspectionID: convertType(carcare.VehicleInspectionID),
            CarStatID: convertType(carcare.CarStatID),
            SendDate: carcare.SendDate,
            ReciveDate: carcare.ReciveDate,
            Bill: carcare.Bill,
            Note: carcare.Note,
            Savedate: carcare.SaveDate,
        }
        console.log(data)

        let res = await CreateCarecare(data);
        if (res) {
            setSuccess(true);
        } else {
            setError(true);
        }
    }
    function dayjs(arg0: string): Date | (() => Date | null) | null {
        throw new Error("Function not implemented.");
    }

    return (
        <Container maxWidth="md">
            <Snackbar
                open={success}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={handleClose} severity="success">
                    complet
                </Alert>
            </Snackbar>
            <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    fail
                </Alert>
            </Snackbar>
            <Paper>
                <Box
                    display="flex"
                    sx={{
                        marginTop: 2,
                    }}
                >
                    <Box sx={{ paddingX: 2, paddingY: 1 }}>
                        <Typography
                            component="h2"
                            variant="h6"
                            color="secondary"
                            gutterBottom
                        >
                            CarStat
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <Grid container spacing={3} sx={{ padding: 2 }}>

                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <p>Ambulance ID</p>
                            <Select
                                id="vehicleInspections"
                                native
                                value={carcare.VehicleInspectionID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "VehicleInspectionInterfaceID",
                                }}
                            >
                                {<option aria-label="None" >---VehicleID---</option>}
                                {vehicleInspections.map((item: VehicleInspectionInterface) => (
                                    <option key={item.ID} value={`${item.ID}`}>{item.ID}</option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <p>Status</p>
                            <Select
                                id="carstat"
                                native
                                value={carcare.VehicleInspectionID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "CarStatID",
                                }}
                            >
                                {<option aria-label="None" >---CarStat---</option>}
                                {carstats.map((item: CarStatInterface) => (
                                    <option key={item.ID} value={`${item.ID}`}>{item.Name}</option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="filled" disabled>
                            <p>Ambulance Brand</p>
                            <TextField
                                id="brand"
                                variant="filled"
                                onChange={handleChangeTextField}
                                disabled
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={3}>
                        <FormControl fullWidth variant="filled" disabled>
                            <p>Regitration</p>
                            <TextField
                                id="brand"
                                variant="filled"
                                onChange={handleChangeTextField}
                                disabled
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={3}>
                        <FormControl fullWidth variant="filled" disabled>
                            <p>ODO</p>
                            <TextField
                                id="brand"
                                variant="filled"
                                onChange={handleChangeTextField}
                                disabled
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="filled" disabled>
                            <p>Ambulance Part Name</p>
                            <TextField
                                id="brand"
                                variant="filled"
                                onChange={handleChangeTextField}
                                disabled
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="filled" disabled>
                            <p>Damage Detail</p>
                            <TextField
                                id="brand"
                                variant="filled"
                                onChange={handleChangeTextField}
                                disabled
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <p>Send Date</p>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    className='StyledTextField'
                                    value={carcare.SendDate}
                                    onChange={(newValue) => {
                                        setCarcare({
                                            ...carcare,
                                            SaveDate: newValue,
                                        });
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <p>Recive Date</p>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    className='StyledTextField'
                                    value={carcare.ReciveDate}
                                    onChange={(newValue) => {
                                        setCarcare({
                                            ...carcare,
                                            ReciveDate: newValue,
                                        });
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="filled" disabled>
                            <p>Bill</p>
                            <TextField
                                id="bill"
                                onChange={handleChangeTextField}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">฿</InputAdornment>,
                                }}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <p>Recive Date</p>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    className='StyledTextField'
                                    value={carcare.ReciveDate}
                                    onChange={(newValue) => {
                                        setCarcare({
                                            ...carcare,
                                            ReciveDate: newValue,
                                        });
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </FormControl>
                    </Grid>

                    {/* <Grid item xs={6}>
                        <FormControl fullWidth>
                            <p>Save Date</p>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <MobileDateTimePicker
                                    value={carcare.SaveDate}
                                    onChange={(newValue) => {
                                        setCarcare({
                                            ...carcare,
                                            SaveDate: newValue,
                                        });
                                    }}
                                    label="With error handler"
                                    onError={console.log}
                                    minDate={dayjs('2018-01-01T00:00')}
                                    inputFormat="YYYY/MM/DD hh:mm a"
                                    mask="____/__/__ __:__ _M"
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </FormControl>
                    </Grid> */}

                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <p>Note</p>
                            <TextField
                                id="note"
                                multiline
                                rows={3}
                                onChange={handleChangeTextField}
                                inputProps={{
                                    name: "Note",
                                }}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            component={RouterLink}
                            to="/Carcare"
                            variant="contained"
                            color="secondary"
                        >
                            Back
                        </Button>
                        <Button
                            style={{ float: "right" }}
                            onClick={submit}
                            variant="contained"
                            color="secondary"
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default CarCareCreate;


