import { Button, CssBaseline, FormControl, Grid, Select, SelectChangeEvent, Snackbar, Stack, TextField, Typography } from '@mui/material'
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Link as RouterLink } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import './CarWashCreate.css';

import { StatusAmsInterface } from '../../models/carWash_system_models/statusAm';
import { CarWashsInterface } from '../../models/carWash_system_models/carWash';
import { ListStatusAms,  GetCarWashByID, UpdateCarWash } from '../../services/carWash_system_services/HttpClientService';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function CarWashUpdate() {
    const [Alertmsg, setAlertmsg] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") { //
            return;
        }
        setSuccess(false);
        setError(false);
    };

    const [statusAms, setStatusAms] = useState<StatusAmsInterface[]>([]);
    const getStatusAms = async () => {
        let res = await ListStatusAms();
        if (res) {
            setStatusAms(res);
        }
    };


    const [carWash, setCarWash] = useState<CarWashsInterface>({
        ComName: "",
        ComTel: "",
        ReceiptNum: "",
        SerFees: 0,
        Date: new Date(),
    });

    const getCarWashDataByID = async () => {
        let res = await GetCarWashByID();
        if (res) {
            console.log(res)
            setCarWash(res);
        }
    };

    const convertType = (data: string | number | undefined | null) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    const handleChangeTextField = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name as keyof typeof carWash;
        setCarWash({
            ...carWash,
            [name]: event.target.value,
        });

    };

    const handleChange = (event: SelectChangeEvent) => {
        const name = event.target.name as keyof typeof carWash;
        setCarWash({
            ...carWash,
            [name]: event.target.value,
        });
    };

    async function submit() {

        let data = {
            ID: convertType(localStorage.getItem("cid")),
            StatusAmID: convertType(carWash.StatusAmID),
            AmbulanceID: convertType(localStorage.getItem("id")), //Math.floor(Math.random() * 10)+1,
            EmployeeID: convertType(localStorage.getItem("id")), //Math.floor(Math.random() * 10)+1,
            ComName: carWash.ComName,
            ComTel: carWash.ComTel,
            ReceiptNum: carWash.ReceiptNum,
            SerFees: convertType(carWash.SerFees),
            Date: carWash.Date,
        };
        let res = await UpdateCarWash(data);
        console.log(res)
        if (res.data) {
            setAlertmsg("อัพเดตข้อมูลสำเร็จ");
            setSuccess(true);
            setError(false)
        } else {
            setAlertmsg("อัพเดตข้อมูลไม่สำเร็จ"+res);
            console.log(res)
            setError(true);
        }
    }

    useEffect(() => {

        getStatusAms();
        getCarWashDataByID();

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
                        แก้ไขข้อมูลการล้างรถ
                    </Typography>
                </Stack>
                <Grid container spacing={2} >
         
      
                    <Grid item={true} xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <Typography className='StyledTypography'> สถานะ </Typography>
                            <Select
                                className='StyledTextField'
                                size="small"
                                color="primary"
                                native
                                value={carWash.StatusAmID + ""}
                                onChange={handleChange}
                                inputProps={{
                                    name: "StatusAmID",
                                }}
                            >
                                <option aria-label="None" value="">
                                กรุณาเลือกสถานะ
                                </option>
                                {statusAms.map((item: StatusAmsInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.Status}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item={true} xs={12}>
                        <Typography className='StyledTypography'> ชื่อบริษัท </Typography>
                        <TextField className='StyledTextField'
                            autoComplete='off'
                            id="Name"
                            variant="outlined"
                            size="small"
                            color="primary"
                            fullWidth
                            onChange={handleChangeTextField}
                            inputProps={{
                                name: "ComName",
                            }}
                            value={carWash.ComName}
                        />
                    </Grid>
                
                    <Grid item={true} xs={12}>
                        <Typography className='StyledTypography'> เบอร์โทรบริษัท </Typography>
                        <TextField className='StyledTextField'
                            autoComplete='off'
                            id="Name"
                            variant="outlined"
                            size="small"
                            color="primary"
                            fullWidth
                            onChange={handleChangeTextField}
                            inputProps={{
                                name: "ComTel",
                            }}
                            value={carWash.ComTel}
                        />
                    </Grid>
                    <Grid item={true} xs={12}>
                        <Typography className='StyledTypography'> เลขใบเสร็จ </Typography>
                        <TextField className='StyledTextField'
                            autoComplete='off'
                            id="Name"
                            variant="outlined"
                            size="small"
                            color="primary"
                            fullWidth
                            onChange={handleChangeTextField}
                            inputProps={{
                                name: "ReceiptNum",
                            }}
                            value={carWash.ReceiptNum}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <p>ค่าบริการ</p>
                        <TextField
                            name='SerFees'
                            type="number"
                            value={carWash.SerFees || ""}
                            sx={{ width: "100%" }}
                            onChange={handleChangeTextField}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <Typography className='StyledTypography'> วันที่และเวลา </Typography>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    className='StyledTextField'
                                    value={carWash.Date}
                                    onChange={(newValue) => {
                                        setCarWash({
                                            ...carWash,
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
                        to="/CarWash"
                        sx={{ borderRadius: 10, '&:hover': { color: '#FC0000', backgroundColor: '#F9EBEB' } }}
                    >
                        ยกเลิก
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        component={RouterLink}
                        to="/CarWash"
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
export default CarWashUpdate