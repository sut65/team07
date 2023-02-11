import { Button, CssBaseline, FormControl, Grid, Select, SelectChangeEvent, Snackbar, Stack, TextField, Typography } from '@mui/material'
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import './AmbulanceCreate.css';

import { CompaniesInterface } from '../../models/ambulance_system_models/company';
import { TypeAblsInterface } from '../../models/ambulance_system_models/typeAbl';
import { AmbulancesInterface } from '../../models/ambulance_system_models/ambulance';
import { ListCompanies, ListTypeAbls, GetAmbulanceByID, UpdateAmbulance } from '../../services/ambulance_system_services/HttpClientService';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AmbulanceUpdate() {
    
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

    const [companies, setCompanies] = useState<CompaniesInterface[]>([]);
    const getCompanies = async () => {
        let res = await ListCompanies();
        if (res) {
            setCompanies(res);
        }
    };

    const [typeAbls, setTypeAbls] = useState<TypeAblsInterface[]>([]);
    const getTypeAbls = async () => {
        let res = await ListTypeAbls();
        if (res) {
            setTypeAbls(res);
        }
    };

    const [ambulance, setAmbulance] = useState<AmbulancesInterface>({
        Clp: "",
        Date: new Date(),
        CarBrand: "",
    });

    const getAmbulanceDataByID = async () => {
        let res = await GetAmbulanceByID();
        if (res) {
            setAmbulance(res);
        }
    };

    const convertType = (data: string | number | undefined | null) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    const handleChangeTextField = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name as keyof typeof ambulance;

        setAmbulance({
            ...ambulance,
            [name]: event.target.value,
        });

    };

    const handleChange = (event: SelectChangeEvent) => {
        const name = event.target.name as keyof typeof ambulance;
        
        setAmbulance({
            ...ambulance,
            [name]: event.target.value,
        });
    };


    const navigator = useNavigate();
    async function submit() {

        let data = {
            ID: convertType(ambulance.ID),
            CompanyID: convertType(ambulance.CompanyID),
            TypeAblID: convertType(ambulance.TypeAblID),
            EmployeeID: convertType(localStorage.getItem("id")),
            Clp: ambulance.Clp,
            Date: ambulance.Date,
            CarBrand: ambulance.CarBrand,
        };
        let res = await UpdateAmbulance(data);
        if (res.data) {
            setAlertMessage("อัพเดตข้อมูลสำเร็จ")
            setSuccess(true);
            setTimeout(() => {
                navigator("/Ambulance")
            }, 3000)
        } else {
            setAlertMessage(res.error)
            setError(true);
        }
    }

    useEffect(() => {

        getCompanies();
        getTypeAbls();
        getAmbulanceDataByID();

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
                maxWidth="md"
                sx={{
                    mt: 5,
                    mb: 2,
                    p: 2,
                    boxShadow: 3,
                    bgcolor: '#F1F6F5',
                    borderRadius: 3
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
                        แก้ไขข้อมูล  รถพยาบาล  ID {ambulance?.ID}
                    </Typography>
                </Stack>
                <Grid container spacing={2} >
                    <Grid item={true} xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <Typography className='StyledTypography'> ประเภทรถ </Typography>
                            <Select
                                className='StyledTextField'
                                size="small"
                                color="primary"
                                native
                                value={ambulance.TypeAblID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "TypeAblID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    กรุณาเลือกประเภทรถ
                                </option>
                                {typeAbls.map((item: TypeAblsInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.Name}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item={true} xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <Typography className='StyledTypography'> บริษัท </Typography>
                            <Select
                                className='StyledTextField'
                                size="small"
                                color="primary"
                                native
                                value={ambulance.CompanyID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "CompanyID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    กรุณาเลือกบริษัท
                                </option>
                                {companies.map((item: CompaniesInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.Name}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item={true} xs={6}>
                        <Typography className='StyledTypography'> เลขทะเบียนรถ </Typography>
                        <TextField className='StyledTextField'
                            autoComplete="off"
                            id="Name"
                            variant="outlined"
                            size="small"
                            color="primary"
                            fullWidth
                            onChange={handleChangeTextField}
                            inputProps={{
                                name: "Clp",
                            }}
                            value={ambulance.Clp}
                        />
                    </Grid>
                    <Grid item={true} xs={6}>
                        <Typography className='StyledTypography'> ยี่ห้อรถ </Typography>
                        <TextField className='StyledTextField'
                            autoComplete="off"
                            id="Name"
                            variant="outlined"
                            size="small"
                            color="primary"
                            fullWidth
                            onChange={handleChangeTextField}
                            inputProps={{
                                name: "CarBrand",
                            }}
                            value={ambulance.CarBrand}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <Typography className='StyledTypography'> วันที่และเวลา </Typography>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    className='StyledTextField'
                                    value={ambulance.Date}
                                    onChange={(newValue) => {
                                        setAmbulance({
                                            ...ambulance,
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
                        to="/Ambulance"
                        sx={{ borderRadius: 10, '&:hover': { color: '#FC0000', backgroundColor: '#F9EBEB' } }}
                    >
                        ยกเลิก
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
export default AmbulanceUpdate