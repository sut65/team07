import { SelectChangeEvent, Container, CssBaseline, Stack, Typography, Grid, FormControl, TextField, Select, Button, AlertProps, Snackbar, Paper, Divider, Box } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React, { useEffect, useState } from 'react'
import { AmbulancesInterface } from '../../models/ambulance_system_models/ambulance';
import { TypeAblsInterface } from '../../models/ambulance_system_models/typeAbl';
import { ListTypeAbls, CreatAmbulances, ListCompanies } from '../../services/ambulance_system_services/HttpClientService';
import { DisinfectionInterface } from '../../models/disinfection_system_models/disinfection';
import { Link as RouterLink } from "react-router-dom";
import { CreatDisinfection, HttpClientServices } from '../../services/disinfection_system_services/HttpClientServices';
import { setDate } from 'date-fns';
import { CompaniesInterface } from '../../models/ambulance_system_models/company';
import { EmployeeInterface } from '../../models/employeeSystemModel/IEmployee';
import MuiAlert from "@mui/material/Alert";
import { DisintantInterface } from '../../models/disinfection_system_models/disinfectant';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
  
function DisinfectionCreate() {
    const [disinfection, setDisinfection] = useState<
    Partial<DisinfectionInterface>>({ WorkTime: new Date()});

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [message, setAlertMessage] = useState("");

    const [emp, setEmployee] = useState<EmployeeInterface[]>([]);
    
    const [abl, setAmbulance] = useState<AmbulancesInterface[]>([]);
    const [disinfectant, setDisinfeatant] = useState<DisintantInterface[]>([]);

    const convertType = (data: string | number | undefined | null) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    const getAmbulance = async () => {
        try {
          let res = await HttpClientServices.get("/ambulances");
          setAmbulance(res.data);
          console.log(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      const getDisinfectant = async () => {
        try {
          let res = await HttpClientServices.get("/disinfactants");
          setDisinfeatant(res.data);
          console.log(res.data);
        } catch (err) {
          console.log(err);
        }
      };

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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name as keyof typeof disinfection;
        setDisinfection({
          ...disinfection,
          [name]: event.target.value,
        });
      };

    const handleChange = (event: SelectChangeEvent) => {
        const name = event.target.name as keyof typeof disinfection;
        console.log(name)
        setDisinfection({
            ...disinfection,
            [name]: event.target.value,
        });
    };

    useEffect(() => {
        getAmbulance();
        getDisinfectant();
      }, []);

    async function submit() {
        let data = {
            WorkTime: disinfection?.WorkTime ?? new Date(),
            Note: disinfection?.Note ?? "",
            AmountDisinfectant: convertType(disinfection?.AmountDisinfectant) ?? 0,
            EmployeeID: convertType(localStorage.getItem("id")),
            AmbulanceID: convertType(disinfection?.AmbulanceID) ?? 0,
            DisinfactantID: convertType(disinfection?.DisinfactantID) ?? 0,
        };
        console.log(data)
        let res = await HttpClientServices.post("/disinfectionStaff/disinfection", data);
            if (!res.error) {
              setSuccess(true);
              console.log(res);
              setAlertMessage("บันทึกข้อมูลสำเร็จ");
            } else {
              setError(true);
              setAlertMessage("บันทึกข้อมูลไม่สำเร็จ " + res.message);
              // console.log(res.message);
            }
    }

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
                            sx={{ padding: 2, fontWeight: "bold" }}
                        >
                            บันทึกข้อมูลการฆ่าเชื้อรถพยาบาล
                        </Typography>
                    </Box>
                    <Divider />
                
                <Grid container spacing={2} sx={{ padding: 1 }}>
                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p>ชนิดน้ำยาฆ่าเชื้อ :</p>
                            <Select
                                className='StyledTextField'
                                native
                                name="DisinfectantID"
                                size="medium"
                                value={disinfection.DisinfactantID+""}
                                onChange={handleChange}
                                inputProps={{
                                name: "DisinfactantID",
                                }}
                            ><option aria-label="None" value="">กรุณาเลือกชนิดน้ำยาฆ่าเชื้อ</option>
                                {disinfectant.map((item: DisintantInterface) => (
                                <option value={item.ID!} key={item.ID}>
                                    {item.Type}
                                </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p>ปริมาณที่ใช้น้ำยาฆ่าเชื้อ : </p>
                            <TextField
                            className='StyledTextField'
                            id="AmountDisinfectant"
                            variant="outlined"
                            type="number"
                            size="medium"
                            value={disinfection.AmountDisinfectant}
                            
                            InputProps={{
                                inputProps: { min: 1, max: 99999 },
                                name: "AmountDisinfectant",
                              }}
                              onChange={handleInputChange}
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
                                name="AmbulanceID"
                                size="medium"
                                //value={disinfection.AmbulanceID + ""}
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
                        <Typography> วัน/เวลา ทำการฆ่าเชื้อ : </Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                            
                                value={disinfection.WorkTime}
                                onChange={(newValue) => {
                                    setDisinfection({
                                        ...disinfection,
                                        WorkTime: newValue,
                                    });
                                }}
                                renderInput={(params) => <TextField {...params} size="medium" />
                                }
                            />
                        </LocalizationProvider>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <Typography>หมายเหตุ : </Typography>
                        <FormControl fullWidth variant="outlined">
                        <TextField
                            id="ID"
                            name="Note"
                            type="string"
                            size="medium"
                            color="primary"
                            value={disinfection.Note}
                            inputProps={{
                            name: "Note",
                            }}
                            onChange={handleInputChange}
                        />
                        </FormControl>
                    </Grid>
          <Grid item xs={4}></Grid>
          
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
                        color="primary"
                        component={RouterLink}
                        to="/DisinfectionHistory"
                        sx={{'&:hover': {color: '#1543EE', backgroundColor: '#e3f2fd'}}}
                    >
                        ถอยกลับ
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={submit}
                        sx={{'&:hover': {color: '#1543EE', backgroundColor: '#e3f2fd'}}}
                    >
                        บันทึกข้อมูล
                    </Button>

            </Stack>
            </Paper></Container>
        </div>
    )
}

export default DisinfectionCreate