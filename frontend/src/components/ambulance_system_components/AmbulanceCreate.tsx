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

import { ListCompanies, ListTypeAbls, CreatAmbulances } from '../../services/ambulance_system_services/HttpClientService';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



function AmbulanceCreate() {

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
            CompanyID: convertType(ambulance.CompanyID),
            TypeAblID: convertType(ambulance.TypeAblID),
            EmployeeID: convertType(localStorage.getItem("id")),
            Clp: ambulance.Clp,
            Date: ambulance.Date,
            CarBrand: ambulance.CarBrand,
        };
        let res = await CreatAmbulances(data);
        if (res) {
            setSuccess(true);
            setTimeout(() => {
                navigator("/Ambulance")
            }, 1200)
        } else {
            setError(true);
        }
    }


    useEffect(() => {

        getCompanies();
        getTypeAbls();

    }, []);


    return (
        <div>
            <Snackbar 
                open={success} 
                autoHideDuration={2000} 
                onClose={handleClose} 
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                sx={{mt:10}}
            >
                <Alert 
                    onClose={handleClose} 
                    severity="success" 
                    sx={{ width: '100%', borderRadius: 3 }}
                >
                    บันทึกข้อมูลสำเร็จ
                </Alert>
            </Snackbar>

            <Snackbar 
                open={error} 
                autoHideDuration={2000} 
                onClose={handleClose} 
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                sx={{mt:10}}
            >
                <Alert 
                    onClose={handleClose} 
                    severity="error"
                    sx={{ width: '100%', borderRadius: 3}}
                >
                    บันทึกข้อมูลไม่สำเร็จ
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
                        บันทึกข้อมูลการจัดซื้อรถพยาบาล
                    </Typography>
                </Stack>
                <Grid container spacing={2} >
                    <Grid item={true} xs={12}>
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
                    <Grid item={true} xs={12}>
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
                    <Grid item={true} xs={12}>
                        <Typography className='StyledTypography'> เลขทะเบียนรถ </Typography>
                        <TextField className='StyledTextField'
                            autoComplete='off'
                            id="Name"
                            variant="outlined"
                            size="small"
                            color="primary"
                            fullWidth
                            onChange={handleChangeTextField}
                            inputProps={{
                                name: "Clp",
                            }}
                        />
                    </Grid>
                    <Grid item={true} xs={12}>
                        <Typography className='StyledTypography'> ยี่ห้อรถ </Typography>
                        <TextField className='StyledTextField'
                            autoComplete='off'
                            id="Name"
                            variant="outlined"
                            size="small"
                            color="primary"
                            fullWidth
                            onChange={handleChangeTextField}
                            inputProps={{
                                name: "CarBrand",
                            }}
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
                        sx={{ borderRadius: 10, '&:hover': {color: '#FC0000', backgroundColor: '#F9EBEB'}}}
                    >
                        ถอยกลับ
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={submit}
                        sx={{ borderRadius: 10, '&:hover': { color: '#065D95', backgroundColor: '#e3f2fd' }}}
                    >
                        บันทึกข้อมูล
                    </Button>

                </Stack>
            </Container>
        </div>
    )
}

export default AmbulanceCreate
