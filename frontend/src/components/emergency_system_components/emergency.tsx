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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import './emergency.css';


import { CaseInterface } from "../../models/emergency_system_models/case";
import { EmergencyInterface } from "../../models/emergency_system_models/emergency";
import { GenderInterface } from "../../models/emergency_system_models/gender";

import {
    GetEmergency,
    GetGender,
    CreateEmercase,
} from '../../services/emergency_system_service/HttpClientServices';



const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CaseCreate() {

    const [emergencys, setEmergencys] = useState<EmergencyInterface[]>([]);
    const [genders, setGenders] = useState<GenderInterface[]>([]);
    const [emercase, setCase] = useState<CaseInterface>({
        Location: "",
        Patient: "",
        Age: 0,
        Status: "",
        Date: new Date(),

    });

    const getGenders = async () => {
        let res = await GetGender();
        if (res) {
            setGenders(res);
        }
    };

    const getEmergencys = async () => {
        let res = await GetEmergency();
        if (res) {
            setEmergencys(res);
        }
    };


    useEffect(() => {
        getGenders();
        getEmergencys();
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
        const name = event.target.name as keyof typeof emercase;
        setCase({
            ...emercase,
            [name]: event.target.value,
        });
    };

    const handleChangeTextField = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name as keyof typeof emercase;
        setCase({
            ...emercase,
            [name]: event.target.value,
        });
    };

    const convertType = (data: string | number | undefined | null) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    async function submit() {
        let data = {
            GenderID: convertType(emercase.GenderID),
            EmergencyID: convertType(emercase.EmergencyID),
            Location: emercase.Location,
            Patient: emercase.Patient,
            Age: emercase.Age,
            Status: emercase.Status,
            Date: emercase.Date,
        }
        console.log(data)

        let res = await CreateEmercase(data);
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
                            Emergency
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <Grid container spacing={3} sx={{ padding: 2 }}>

                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <p>Emergency Type</p>
                            <Select
                                id="emergency"
                                native
                                value={emercase.GenderID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "EmergencyID",
                                }}
                            >
                                {<option aria-label="None" >---Emergency---</option>}
                                {emergencys.map((item: EmergencyInterface) => (
                                    <option key={item.ID} value={`${item.ID}`}>{item.Name}</option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth>
                        <p>Date Time</p>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                className='StyledTextField'
                                value={emercase.Date}
                                onChange={(newValue) => {
                                    setCase({
                                        ...emercase,
                                        Date: newValue,
                                    });
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        </FormControl>
                    </Grid>



                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <p>Location</p>
                            <TextField
                                id="location"
                                multiline
                                rows={4}
                                onChange={handleChangeTextField}
                                inputProps={{
                                    name: "Location",
                                }}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p>Patient</p>
                            <TextField
                                id="patient"
                                variant="outlined"
                                onChange={handleChangeTextField}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={3}>
                        <FormControl fullWidth>
                            <p>Gender</p>
                            <Select
                                id="gender"
                                native
                                value={emercase.GenderID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "GenderID",
                                }}
                            >
                                {<option aria-label="None" >---Gender---</option>}
                                {genders.map((item: GenderInterface) => (
                                    <option key={item.ID} value={`${item.ID}`}>{item.Name}</option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={3}>
                        <FormControl fullWidth variant="outlined">
                            <p>Age</p>
                            <TextField
                                name="Age"
                                type="number"
                                value={emercase.Age}
                                onChange={handleChangeTextField}
                                required
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <p>Patient Status</p>
                            <TextField
                                id="status"
                                multiline
                                rows={4}
                                onChange={handleChangeTextField}
                                inputProps={{
                                    name: "status",
                                }}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            component={RouterLink}
                            to="/Case"
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

export default CaseCreate;


