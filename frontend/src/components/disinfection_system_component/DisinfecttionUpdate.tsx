import { Button, CssBaseline, FormControl, Grid, IconButton, Select, SelectChangeEvent, Snackbar, Stack, TextField, Typography } from '@mui/material'
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Link as RouterLink, useParams } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { AmbulancesInterface } from '../../models/ambulance_system_models/ambulance';
import { DisinfectionInterface } from '../../models/disinfection_system_models/disinfection';
//import { HttpClientServices } from '../../services/recordtimeout_system_services/HttpClientServices';
import { GetDisinfectionByID, ListAmbulances, ListDisinfectants, UpdateDisinfection } from '../../services/disinfection_system_services/HttpClientServices';
import { DisintantInterface } from '../../models/disinfection_system_models/disinfectant';
import { any } from 'prop-types';
import { HttpClientServices } from '../../services/disinfection_system_services/HttpClientServices';
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function DisinfectionUpdate(props: any) {
  //const params = useParams();
  const { params } = props;

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const [disinfectant, setDisinfeatant] = useState<DisintantInterface[]>([]);
  const getDisinfeatant = async () => {
    let res = await ListDisinfectants();
    if (res) {
      setDisinfeatant(res);
    }
  };

  const [abl, setAmbulance] = useState<AmbulancesInterface[]>([]);
  const getAmbulance = async () => {
    let res = await ListAmbulances();
    if (res) {
      setAmbulance(res);
    }
  };

  const [disinfection, setDisinfection] = useState<DisinfectionInterface>({
    Note: "",
    WorkTime: new Date(),
    AmountDisinfectant: 0,
  });

  const getDisinfectionByID = async () => {
    let res = await GetDisinfectionByID();
    if (res) {
      setDisinfection(res);
    }
  };

  const convertType = (data: string | number | undefined | null) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  const handleChangeTextField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name as keyof typeof disinfection;
    console.log(name)
    setDisinfection({
      ...disinfection,
      [name]: event.target.value,
    });

  };

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof disinfection;
    setDisinfection({
      ...disinfection,
      [name]: event.target.value,
    });
  };

  async function submit() {

    let data = {
      ID: convertType(disinfection.ID),
      WorkTime: disinfection?.WorkTime ?? new Date(),
      Note: disinfection.Note,
      AmountDisinfectant: convertType(disinfection.AmountDisinfectant),
      EmployeeID: convertType(localStorage.getItem("id")),
      AmbulanceID: convertType(disinfection.AmbulanceID),
      DisinfactantID: convertType(disinfection.DisinfactantID),
    };
    console.log(data)
    // let res = await UpdateDisinfection(data);
    // if (res) {
    //     setSuccess(true);
    // } else {
    //     setError(true);
    // }

    try {
      let res = await HttpClientServices.patch("/disinfection", data);
      setSuccess(true);
      // console.log(res.data);
    } catch (err) {
      setError(false);
      console.log(err)
    }
  }

  useEffect(() => {

    getDisinfeatant();
    getAmbulance();
    getDisinfectionByID();

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
          อัพเดตข้อมูลสำเร็จ
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
          อัพเดตข้อมูลไม่สำเร็จ
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
          bgcolor: 'rgb(252, 254, 255)'
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
            แก้ไขข้อมูล  การฆ่าเชื้อรถพยาบาล  ลำดับที่ {disinfection?.ID}
          </Typography>
        </Stack>
        <Grid container spacing={2} >

          <Grid item={true} xs={12}>
            <FormControl fullWidth variant="outlined"><br></br>
              <Typography className='StyledTypography'> ชนิดน้ำยาฆ่าเชื้อ : </Typography>
              <Select
                className='StyledTextField'
                id="ID"
                native
                name="DisinfactantID"
                size="small"
                color="primary"
                value={disinfection.DisinfactantID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "DisinfactantID",
                }}
              >

                <option>กรุณาเลือกชนิดน้ำยาฆ่าเชื้อ</option>
                {disinfectant.map((item: DisintantInterface) => (
                  <option value={item.ID!} key={item.ID}>
                    {item.Type}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <p>ปริมาณที่ใช้น้ำยาฆ่าเชื้อ</p>
              <TextField
                className='StyledTextField'
                id="AmountDisinfectant"
                type="number"
                size="small"
                value={disinfection.AmountDisinfectant}

                InputProps={{
                  inputProps: { min: 1, max: 99999 },
                  name: "AmountDisinfectant",
                }}
                onChange={handleChangeTextField}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <Typography className='StyledTypography'> รถคันที่ใช้ : </Typography>
              <Select
                className='StyledTextField'
                id="ID"
                native
                name="AmbulanceID"
                size="small"
                value={disinfection.AmbulanceID + ""}
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


          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <Typography> วัน/เวลา ทำการฆ่าเชื้อ </Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                className='StyledTextField'
                value={disinfection.WorkTime}
                onChange={(newValue) => {
                    setDisinfection({
                        ...disinfection,
                        WorkTime: newValue,
                    });
                }}
                renderInput={(params) => <TextField {...params} size="small" />
                }
              />
              </LocalizationProvider>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Typography>หมายเหตุ</Typography>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="ID"
                name="Note"
                type="string"
                size="small"
                color="primary"
                value={disinfection.Note}
                inputProps={{
                  name: "Note",
                }}
                onChange={handleChangeTextField}
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
            color="error"
            component={RouterLink}
            to="/DisinfectionHistory"
            sx={{ '&:hover': { color: '#FC0000', backgroundColor: '#F9EBEB' } }}
          >
            ยกเลิก
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={submit}
            sx={{ '&:hover': { color: '#1543EE', backgroundColor: '#e3f2fd' } }}
          >
            อัพเดตข้อมูล
          </Button>
        </Stack>
      </Container>
    </div>
  )



  // const [success, setSuccess] = useState(false);
  // const [error, setError] = useState(false);

  // const [emp, setEmployee] = useState<EmployeeInterface[]>([]);

  // const [abl, setAmbulance] = useState<AmbulancesInterface[]>([]);
  // const [disinfectant, setDisinfeatant] = useState<DisintantInterface[]>([]);
  // const [disinfection, setDisinfection] = useState<
  //   Partial<DisinfectionInterface>>({ WorkTime: new Date() });

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const name = event.target.name as keyof typeof disinfection;
  //   setDisinfection({
  //     ...disinfection,
  //     [name]: event.target.value,
  //   });
  // };

  // const getAmbulance = async () => {
  //   try {
  //     let res = await HttpClientServices.get("/ambulances");
  //     setAmbulance(res.data);
  //     //console.log(res.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // const getDisinfectant = async () => {
  //   try {
  //     let res = await HttpClientServices.get("/disinfactants");
  //     setDisinfeatant(res.data);
  //     //console.log(res.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // const getEmployee = async () => {
  //   try {
  //     let res = await HttpClientServices.get("/employees");
  //     setEmployee(res.data);
  //     //console.log(res.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // // const getDisinfections = async (id: string) => {
  // //   try {
  // //     let res = await HttpClientServices.get(`/disinfection/${id}`);
  // //     setDisinfection(res.data);
  // //     console.log(res.data);
  // //   } catch (err) {
  // //     console.log(err);
  // //   }
  // // };

  // const getDisinfectionbyID = async (id: string) => {
  //   try {
  //     let res = await HttpClientServices.get(`/disinfection/${id}`);
  //     setDisinfection({
  //       AmbulanceID: res.data.AmbulanceID,
  //       EmployeeID: res.data.EmployeeID,
  //       DisinfactantID: res.data.DisinfactantID,
  //       Note: res.data.Note,
  //       AmountDisinfectant: res.data.AmountDisinfectant,
  //       WorkTime: res.data.WorkTime
  //     })

  //     console.log(res.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setSuccess(false);
  //   setError(false);
  // };

  // const convertType = (data: string | number | undefined | null) => {
  //   let val = typeof data === "string" ? parseInt(data) : data;
  //   return val;
  // };

  // const handleChangeTextField = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const name = event.target.name as keyof typeof disinfection;
  //   console.log(name)
  //   setDisinfection({
  //     ...disinfection,
  //     [name]: event.target.value,
  //   });

  // };

  // const handleChange = (event: SelectChangeEvent) => {
  //   const name = event.target.name as keyof typeof disinfection;
  //   setDisinfection({
  //     ...disinfection,
  //     [name]: event.target.value,
  //   });
  // };

  // async function submit() {
  //   let data = {
  //     WorkTime: disinfection?.WorkTime ?? new Date(),
  //     Note: disinfection?.Note ?? "",
  //     AmountDisinfectant: convertType(disinfection?.AmountDisinfectant) ?? 0,
  //     EmployeeID: convertType(disinfection?.EmployeeID) ?? 1,
  //     AmbulanceID: convertType(disinfection?.AmbulanceID) ?? 0,
  //     DisinfactantID: convertType(disinfection?.DisinfactantID) ?? 0,
  //   };
  //   console.log(data)

  //   try {
  //     let res = await HttpClientServices.patch("/disinfection", data);
  //     setSuccess(true);
  //     console.log(res.data);
  //   } catch (err) {
  //     setError(false);
  //     console.log(JSON.stringify(err));
  //   }
  // }


  // useEffect(() => {
  //   //getDisinfectionbyID();
  //   getAmbulance();
  //   getEmployee();
  //   getDisinfectant();
  //   // getDisinfections();
  //   const p = params ? params : null;
  //   if (p?.id) {
  //     getDisinfectionbyID(p?.id);
  //   }



  // }, []);

  // return (
  //   <div>
  //     <Snackbar
  //       open={success}
  //       autoHideDuration={2000}
  //       onClose={handleClose}
  //       anchorOrigin={{ vertical: "top", horizontal: "center" }}
  //       sx={{ mt: 10 }}
  //     >
  //       <Alert
  //         onClose={handleClose}
  //         severity="success"
  //         sx={{ width: '100%', borderRadius: 3 }}
  //       >
  //         อัพเดตข้อมูลสำเร็จ
  //       </Alert>
  //     </Snackbar>

  //     <Snackbar
  //       open={error}
  //       autoHideDuration={2000}
  //       onClose={handleClose}
  //       anchorOrigin={{ vertical: "top", horizontal: "center" }}
  //       sx={{ mt: 10 }}
  //     >
  //       <Alert
  //         onClose={handleClose}
  //         severity="error"
  //         sx={{ width: '100%', borderRadius: 3 }}
  //       >
  //         อัพเดตข้อมูลไม่สำเร็จ
  //       </Alert>
  //     </Snackbar>


  //     <Container
  //       component="main"
  //       maxWidth="md"
  //       sx={{
  //         mt: 5,
  //         mb: 2,
  //         p: 2,
  //         boxShadow: 3,
  //         bgcolor: '#F1F6F5'
  //       }}>
  //       <CssBaseline />
  //       <Stack
  //         sx={{ p: 0, m: 0, mb: 3 }}
  //       >
  //         <Typography
  //           variant="h5"
  //           color="primary"
  //           sx={{ fontWeight: 'bold' }}
  //         >
  //           แก้ไขข้อมูล  การฆ่าเชื้อรถพยาบาล  ID {disinfection?.ID}
  //         </Typography>
  //       </Stack>
  //       <Grid container spacing={2} >
  //         <Grid item={true} xs={6}>
  //           <FormControl fullWidth variant="outlined">
  //             <Typography className='StyledTypography'> ชนิดน้ำยาฆ่าเชื้อ : </Typography>
  //             <Select
  //               className='StyledTextField'
  //               size="small"
  //               color="primary"
  //               native
  //               value={disinfection.DisinfactantID + ""}
  //               onChange={handleChange}
  //               inputProps={{
  //                 name: "DisinfactantID",
  //               }}
  //             >

  //               <option aria-label="None" value="">กรุณาเลือกชนิดน้ำยาฆ่าเชื้อ</option>
  //               {disinfectant.map((item: DisintantInterface) => (
  //                 <option value={item.ID} key={item.ID}>
  //                   {item.Type}
  //                 </option>
  //               ))}
  //             </Select>
  //           </FormControl>
  //         </Grid>
  //         <Grid item xs={6}>
  //           <FormControl fullWidth variant="outlined">
  //             <p>ปริมาณที่ใช้น้ำยาฆ่าเชื้อ</p>
  //             <TextField
  //               className='StyledTextField'
  //               id="AmountDisinfectant"
  //               variant="outlined"
  //               type="number"
  //               size="medium"
  //               value={disinfection.AmountDisinfectant}

  //               InputProps={{
  //                 inputProps: { min: 1, max: 99999 },
  //                 name: "AmountDisinfectant",
  //               }}
  //               onChange={handleInputChange}
  //             />
  //           </FormControl>
  //         </Grid>



  //         <Grid item xs={6}>
  //           <FormControl fullWidth variant="outlined">
  //             <Typography className='StyledTypography'> รถคันที่ใช้ : </Typography>
  //             <Select
  //               className='StyledTextField'
  //               id="ID"
  //               native
  //               name="AmbulanceID"
  //               size="medium"
  //               value={disinfection.AmbulanceID + ""}
  //               onChange={handleChange}
  //               inputProps={{
  //                 name: "AmbulanceID",
  //               }}
  //             ><option>กรุณาเลือกรถพยาบาล</option>
  //               {abl.map((item: AmbulancesInterface) => (
  //                 <option value={item.ID!} key={item.ID}>
  //                   {item.Clp}
  //                 </option>
  //               ))}
  //             </Select>
  //           </FormControl>
  //         </Grid>


  //         <Grid item xs={6}>
  //           <FormControl fullWidth variant="outlined">
  //             <Typography> วัน/เวลา ทำการฆ่าเชื้อ </Typography>
  //             <LocalizationProvider dateAdapter={AdapterDateFns}>
  //               <DatePicker
  //                 value={Number(disinfection.WorkTime)}
  //                 onChange={(newValue) => {
  //                   newValue = 1;
  //                 }}
  //                 renderInput={(params) => (
  //                   <TextField {...params} size="small" />
  //                 )}
  //               />
  //             </LocalizationProvider>
  //           </FormControl>
  //         </Grid>

  //         <Grid item xs={4}>
  //           <Typography>หมายเหตุ</Typography>
  //           <FormControl fullWidth variant="outlined">
  //             <TextField
  //               id="ID"
  //               name="Note"
  //               type="string"
  //               size="small"
  //               color="primary"
  //               value={disinfection.Note}
  //               inputProps={{
  //                 name: "Note",
  //               }}
  //               onChange={handleInputChange}
  //             />
  //           </FormControl>
  //         </Grid>
  //       </Grid>
  //       <Stack
  //         spacing={2}
  //         direction="row"
  //         justifyContent="space-between"
  //         alignItems="flex-start"
  //         sx={{ mt: 3 }}
  //       >
  //         <Button
  //           variant="contained"
  //           color="error"
  //           component={RouterLink}
  //           to="/Ambulance"
  //           sx={{ '&:hover': { color: '#FC0000', backgroundColor: '#F9EBEB' } }}
  //         >
  //           ยกเลิก
  //         </Button>
  //         <Button
  //           variant="contained"
  //           color="primary"
  //           onClick={submit}
  //           sx={{ '&:hover': { color: '#1543EE', backgroundColor: '#e3f2fd' } }}
  //         >
  //           อัพเดตข้อมูล
  //         </Button>
  //       </Stack>
  //     </Container>
  //   </div> )
}
export default DisinfectionUpdate