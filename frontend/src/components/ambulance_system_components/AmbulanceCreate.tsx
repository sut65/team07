import { Button, CssBaseline, FormControl, Grid, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material'
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Link as RouterLink } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'


import './AmbulanceCreate.css';


import { CompaniesInterface } from '../../models/ambulance_system_models/company';
import { TypeAblsInterface } from '../../models/ambulance_system_models/typeAbl';
import { AmbulancesInterface } from '../../models/ambulance_system_models/ambulance';

import { ListCompanies, ListTypeAbls, CreatAmbulances } from '../../services/ambulance_system_services/HttpClientService';

function AmbulanceCreate() {

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const [companies, setCompanies] = useState<CompaniesInterface[]>([]);
    const getCompanies = async () => {
        let res = await ListCompanies();
        if (res) {
            setCompanies(res);
            console.log(res)
        }
    };

    const [typeAbls, setTypeAbls] = useState<TypeAblsInterface[]>([]);
    const getTypeAbls = async () => {
        let res = await ListTypeAbls();
        if (res) {
            setTypeAbls(res);
            console.log(res)
        }
    };

    const [ambulance, setAmbulance] = useState<AmbulancesInterface>({
        Clp: "",
        Date: new Date(),
        CarBrand: "",
    });

    const convertType = (data: string | number | undefined) => {
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

    async function submit() {
        let data = {
            CompanyID: convertType(ambulance.CompanyID),
            TypeAblID: convertType(ambulance.TypeAblID),
            EmployeeID: 1, //test
            Clp: ambulance.Clp,
            Date: ambulance.Date,
            CarBrand: ambulance.CarBrand,
        };
        console.log(data)
        let res = await CreatAmbulances(data);
        if (res) {
            setSuccess(true);
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
            <Container
                component="main"
                maxWidth="md"
                sx={{
                    mt: 5,
                    mb: 2,
                    p: 2,
                    boxShadow: 3,
                    bgcolor: '#E3E3E3'
                }}>
                <CssBaseline />

                <Stack
                    sx={{ p: 0, m: 0, mb: 5 }}
                >
                    <Typography
                        variant="h5"
                        color="secondary"
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
                        color="secondary"
                        component={RouterLink}
                        to="/"
                    >
                        ถอยกลับ
                    </Button>

                    <Button variant="contained" color="secondary" onClick={submit}> บันทึกข้อมูล </Button>

                </Stack>

            </Container>
        </div>
    )
}

export default AmbulanceCreate
