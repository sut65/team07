import { Button, CssBaseline, FormControl, Grid, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material'
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Link as RouterLink } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'

import './RecordTimeInCreate.css';

import { AmbulancesInterface } from '../../models/ambulance_system_models/ambulance';
import { RecordTimeInInterface } from '../../models/recordtimein_system_models/recordtimein';

import { ListCompanies, ListTypeAbls, CreatAmbulances } from '../../services/ambulance_system_services/HttpClientService';

function RecordTimeInCreate() {

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [date, setDate] = React.useState<Date | null>(null);


    // const getCompanies = async () => {
    //     let res = await ListCompanies();
    //     if (res) {
    //         setCompanies(res);
    //         console.log(res)
    //     }
    // };

    // const [typeAbls, setTypeAbls] = useState<TypeAblsInterface[]>([]);
    // const getTypeAbls = async () => {
    //     let res = await ListTypeAbls();
    //     if (res) {
    //         setTypeAbls(res);
    //         console.log(res)
    //     }
    // };

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
            // CompanyID: convertType(ambulance.CompanyID),
            // TypeAblID: convertType(ambulance.TypeAblID),
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

        // getCompanies();
        // getTypeAbls();

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
                    bgcolor: 'rgb(252, 254, 255)'
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
                        บันทึกข้อมูลการใช้รถขาเข้าของพนักงานขับรถ
                    </Typography>
                    
                </Stack>
                
                <Grid container spacing={2}>

                <Grid item xs={12}>
                    
                    <Typography className='StyledTypography'> กรณีใช้รถ : </Typography>
                    <FormControl fullWidth variant="outlined">
                        <TextField
                            className='StyledTextField'
                            disabled
                            id="Name"
                            type="string"
                            size="medium"
                            // variant="filled"
                            // value={ p?.Surname}
                        />
                     </FormControl>
                </Grid>

         

                <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                        <Typography className='StyledTypography'> รถคันที่ใช้ : </Typography>
                        <Select
                            className='StyledTextField'
                            id="ID"
                            native
                            name="PatientID"
                            size="medium"
                            // value={String(prescription?.PatientID)}
                            // onChange={handleChange}
                            inputProps={{
                            name: "PatientID",
                            }}
                        ><option></option>
                            {/* {patient.map((item: PatientInterface) => (
                            <option value={item.ID} key={item.ID}>
                                {item.PID}
                            </option>
                            ))} */}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={6}>
                    <Typography className='StyledTypography'> ทะเบียนรถ : </Typography>
                    <FormControl fullWidth variant="outlined">
                        <TextField
                            className='StyledTextField'
                            disabled
                            id="Name"
                            type="string"
                            size="medium"
                            // variant="filled"
                            // value={ p?.Surname}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                        
                        <Typography className='StyledTypography'> ODO Meter : </Typography>
                            <TextField
                            className='StyledTextField'
                            id="Age"
                            variant="outlined"
                            type="number"
                            size="medium"
                            InputProps={{ inputProps: { min: 1 } }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            //    value={user.Age || ""}
                            //    onChange={handleInputChange}
                            />
                    </FormControl>
                </Grid>

                <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                        
                        <Typography className='StyledTypography'> เวลาขาเข้า : </Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns} >
                        <DatePicker
                            className='StyledTextField'
                            value={date}
                             onChange={(newValue) => {
                               setDate(newValue);
                             }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        </LocalizationProvider>
                    </FormControl>
                </Grid>

          <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                
                <Typography className='StyledTypography'> ผู้บันทึก : </Typography>
                <Select
                    className='StyledTextField'
                  native
                  // value={medicine.EmployeeID + ""}
                  // onChange={handleChange}
                  disabled
                  inputProps={{
                    name: "EmployeeID",
                  }}
                >
                  <option aria-label="None" value="">
                    กรุณาเลือกผู้บันทึก
                  </option>
                  {/* <option value={employee?.ID} key={employee?.ID}>
                    {employee?.Name}
                  </option> */}
                  
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
           
                <Typography className='StyledTypography'> หมายเหตุ : </Typography>
                <FormControl fullWidth variant="outlined">
                    <TextField
                    className='StyledTextField'
                        id="Name"
                        type="string"
                        size="medium"
                        
                        // value={ p?.Surname}
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

            </Container>
        </div>
    )
}

export default RecordTimeInCreate
