import { Button, CssBaseline, FormControl, Grid, Select, SelectChangeEvent, Snackbar, Stack, TextField, Typography } from '@mui/material'
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { AmbulanceUseInterface } from '../../models/ambulanceUse_system_models/ambulanceUse';
import { AmbulancesInterface } from '../../models/ambulance_system_models/ambulance';
import { MedicineInterface } from '../../models/ambulanceUse_system_models/medicine';

import { ListMedicines, GetAmbulanceUseByID, UpdateAmbulanceUse, GetMedicineByID } from '../../services/ambulanceUse_system_services/HttpClientService';
import { ListAmbulances } from '../../services/ambulance_system_services/HttpClientService';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AmbulanceUseUpdate() {

    const [alertmessage, setAlertMessage] = React.useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setSuccess(false);
        setError(false);
    };

    const [medicines, setMedicines] = useState<MedicineInterface[]>([]);
    const getMedicines = async () => {
        let res = await ListMedicines();
        if (res) {
            setMedicines(res);
        }
    };

    const [ambulances, setAmbulances] = useState<AmbulancesInterface[]>([]);
    const getAmbulances = async () => {
        let res = await ListAmbulances();
        if (res) {
            setAmbulances(res);
        }
    };

    const [ambulanceUse, setAmbulanceUse] = useState<AmbulanceUseInterface>({
        Amount: 0,
        Date: new Date(),
    });
    const getAmbulanceUseByID = async () => {
        let res = await GetAmbulanceUseByID();
        if (res) {
            setAmbulanceUse(res);
            console.log(res)
        }
    };

    const convertType = (data: string | number | undefined | null) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    const handleChangeTextField = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name as keyof typeof ambulanceUse;
        console.log(typeof event.target.valueAsNumber)
        setAmbulanceUse({
            ...ambulanceUse,
            [name]: event.target.valueAsNumber,
        });
        console.log(ambulanceUse)

    };

    const [medicine, setMedicine] = useState<MedicineInterface>({
        ID: 0,
        MedicineName: "",
        MedicineWarning: "",
        MedicineType: "",
        MeasureUnit: "",
    });
    const getMedicineByID = async () => {
        let res = await GetMedicineByID();
        if (res) {
            setMedicine(res);
        }
    };

    const [disTextField, setDisTextField] = useState(false);
    const handleChange = (event: SelectChangeEvent) => {
        const name = event.target.name as keyof typeof ambulanceUse;

        if (name === "MedicineID") {

            if (parseInt(event.target.value)) {

                setMedicine(medicines[parseInt(event.target.value) - 1]);
                setDisTextField(false)
            }
            else {
                setMedicine({
                    ID: 0,
                    MedicineName: "",
                    MedicineWarning: "",
                    MedicineType: "",
                    MeasureUnit: "",
                })

                setDisTextField(true)
            }
        }

        setAmbulanceUse({
            ...ambulanceUse,
            [name]: event.target.value,
        });
    };

    const navigator = useNavigate();
    async function submit() {
        let data = {
            ID: convertType(ambulanceUse.ID),
            EmployeeID: convertType(localStorage.getItem("id")),
            MedicineID: convertType(ambulanceUse.MedicineID),
            AmbulanceID: convertType(ambulanceUse.AmbulanceID),
            Amount: ambulanceUse.Amount,
            Date: ambulanceUse.Date,
        };

        let res = await UpdateAmbulanceUse(data);
        if (res.data) {
            setAlertMessage("อัพเดตข้อมูลสำเร็จ")
            setSuccess(true);
            setTimeout(() => {
                navigator("/AmbulanceUse")
            }, 3000)
        } else {
            setAlertMessage(res.error)
            setError(true);
        }
    }

    useEffect(() => {

        getAmbulances();
        getMedicines();
        getAmbulanceUseByID();
        getMedicineByID();


    }, []);


    return (
        <div>
            <Snackbar
                open={success}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                sx={{ mt: 10 }}
            >
                <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: '100%', borderRadius: 3 }}
                >
                    {alertmessage}
                </Alert>
            </Snackbar>

            <Snackbar
                open={error}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                sx={{ mt: 10 }}
            >
                <Alert
                    onClose={handleClose}
                    severity="error"
                    sx={{ width: '100%', borderRadius: 3 }}
                >
                    {alertmessage}
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
                    bgcolor: '#F1F6F5',
                    borderRadius: 3
                }}
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
                        แก้ไขข้อมูล  ยาที่ใช้รถพยาบาล  ID {ambulanceUse?.ID}
                    </Typography>
                </Stack>

                <Grid container rowSpacing={2}>
                    <Grid item xs={12}>
                        <Typography>ยา</Typography>
                        <FormControl fullWidth variant="outlined"  >
                            <Select
                                sx={{ borderRadius: 3, bgcolor: '#fff' }}
                                value={ambulanceUse.MedicineID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "MedicineID",
                                }}
                                native
                            >
                                <option aria-label="None" value="">
                                    โปรดเลือกชนิดยา
                                </option>
                                {medicines.map((item: MedicineInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.MedicineName}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={10} >
                        <Typography>จำนวน</Typography>
                        <TextField
                            disabled={disTextField}
                            autoComplete='off'
                            placeholder='โปรดระบุจำนวนยาที่ใช้'
                            type="number"
                            sx={{ bgcolor: '#fff' }}
                            variant="outlined"
                            color="primary"
                            fullWidth
                            onChange={handleChangeTextField}
                            InputProps={{
                                inputProps: { min: 1 },
                                name: "Amount"
                            }}
                            value={ambulanceUse.Amount}
                        />

                    </Grid>
                    <Grid item xs={2} >
                        <Typography sx={{ mt: 5, ml: 2 }}>{medicine.MeasureUnit}</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 3 }}>
                        <Typography>รถพยาบาล</Typography>
                        <FormControl variant="outlined"  >
                            <Select
                                size='small'
                                sx={{ borderRadius: 3, bgcolor: '#fff', width: 260 }}
                                value={ambulanceUse.AmbulanceID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "AmbulanceID",
                                }}
                                native
                            >
                                <option aria-label="None" value="">
                                    กรุณาเลือกรถพยาบาล
                                </option>
                                {ambulances.map((item: AmbulancesInterface) => (
                                    <option value={Number(item.ID)} key={item.ID}>
                                        เลขทะเบียน {item.Clp}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} >
                        <Typography>เวลา</Typography>
                        <FormControl variant="outlined" sx={{ bgcolor: '#fff' }}>
                            <LocalizationProvider dateAdapter={AdapterDateFns} >
                                <DatePicker
                                    value={ambulanceUse.Date}
                                    onChange={(newValue) => {
                                        setAmbulanceUse({
                                            ...ambulanceUse,
                                            Date: newValue,
                                        });
                                    }}
                                    disabled={true}
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
                        to="/AmbulanceUse"
                        sx={{ borderRadius: 10, '&:hover': { color: '#FC0000', backgroundColor: '#F9EBEB' } }}
                    >
                        ถอยกลับ
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={submit}
                        sx={{ borderRadius: 10, '&:hover': { color: '#065D95', backgroundColor: '#e3f2fd' } }}
                    >
                        อัพเดตข้อมูล
                    </Button>

                </Stack>

            </Container>
        </div>
    )
}

export default AmbulanceUseUpdate