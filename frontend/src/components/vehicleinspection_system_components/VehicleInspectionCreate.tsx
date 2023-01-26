import * as React from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { CssBaseline, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Link as RouterLink } from "react-router-dom";
import { VehicleInspectionInterface } from "../../models/vehicleinspection_system_models/vehicleinspection";
import { AmbulancesInterface } from "../../models/ambulance_system_models/ambulance";
import { HttpClientServices } from "../../services/recordtimeout_system_services/HttpClientServices";
import { TypeAblsInterface } from "../../models/ambulance_system_models/typeAbl";
import { StatusCheckInterface } from "../../models/vehicleinspection_system_models/vehicleinspection";
import { AmbulancePartInterface } from "../../models/vehicleinspection_system_models/vehicleinspection";
import { EmployeeInterface } from "../../models/employeeSystemModel/IEmployee";
import { apiUrl, convertType } from "../../services/utility";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function VehicleInspectionCreate() {
  const [vehicleinspection, setVehicleInspection] = React.useState<
    Partial<VehicleInspectionInterface>
  >({ VehicleInnspectionDatetime: new Date() });
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [abl, setAmbulance] = React.useState<AmbulancesInterface[]>([]);
  const [typeAbls, setTypeAbl] = React.useState<TypeAblsInterface[]>([]);
  const [a, setA] = React.useState<string>("");
  const [statuscheck, setStatuscheck] = React.useState<StatusCheckInterface[]>(
    []
  );
  const [ablpart, setAmbulancePart] = React.useState<AmbulancePartInterface[]>(
    []
  );
  const [emp, setEmployee] = React.useState<EmployeeInterface[]>([]);
  const [detailABL, setDatail] = React.useState<string>("รายละเอียด");
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
  //select
  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof vehicleinspection;
    setVehicleInspection({ ...vehicleinspection, [name]: event.target.value });

    // if (event.target.name === "AmbulanceID") {
    //   abl.forEach((val: any) => {
    //     if (val.CarBrand === Number(event.target.value)) {
    //       setDatail(`ไอดีรถ: ${val.ID} ยี่ห้อรถ: ${val.CarBrand} เลขทะเบียนรถ: ${val.Clp}`);
    //     }
    //   });
    //   if (event.target.value === "") {
    //     setDatail("รายละเอียด");
    //   }
    // }

    if (event.target.name === "TypeAblID") {
      getAmbulance(event.target.value);
      setA(event.target.value);
      if (event.target.value === "") {
        setAmbulance([]);
      }
    }
    if (event.target.name === "AmbulanceID") {
      abl.forEach((val: any) => {
        if (val.CarBrand === Number(event.target.value)) {
          setDatail(
            `ไอดีรถ: ${val.ID} ยี่ห้อรถ: ${val.CarBrand} เลขทะเบียนรถ: ${val.Clp}`
          );
        }
      });
      if (event.target.value === "") {
        setDatail("รายละเอียด");
      }
    }
    console.log(vehicleinspection);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name as keyof typeof vehicleinspection;
    setVehicleInspection({
      ...vehicleinspection,
      [name]: event.target.value,
    });
  };
  //get Ambulance
  const getAmbulance = async (id: string) => {
    let res = await HttpClientServices.get(`/abl/${id}`);
    if (!res.error) {
      setAmbulance(res.results);
      // console.log(res.results);
    } else {
      console.log(res.error);
    }
  };
  //get Type Ambulance
  const getTypeAbl = async () => {
    let res = await HttpClientServices.get("/type_abls");
    if (!res.error) {
      setTypeAbl(res.results);
      // console.log(res.results);
    } else {
      console.log(res.error);
    }
  };
  //get StatusCheck
  const getStatusCheck = async () => {
    let res = await HttpClientServices.get("/statuschecks");
    if (!res.error) {
      setStatuscheck(res.results);
      console.log(res.results);
    } else {
      console.log(res.error);
    }
  };
  //get Ambulance Part
  const getAmbulancePart = async () => {
    let res = await HttpClientServices.get("/ambulanceparts");
    if (!res.error) {
      setAmbulancePart(res.results);
      console.log(res.results);
    } else {
      console.log(res.error);
    }
  };

  React.useEffect(() => {
    // getAmbulance();
    getTypeAbl();
    getStatusCheck();
    getAmbulancePart();
  }, []);

  async function submit() {
    let data = {
      OdoMeter: convertType(vehicleinspection?.OdoMeter),
      Fail: vehicleinspection?.Fail,
      VehicleInnspectionDatetime: vehicleinspection?.VehicleInnspectionDatetime,
      EmployeeID: convertType(vehicleinspection?.EmployeeID),
      AmbulancePartID: convertType(vehicleinspection?.AmbulancePartID),
      AmbulanceID: convertType(vehicleinspection?.AmbulanceID),
      StatusCheckID: convertType(vehicleinspection.StatusCheckID),
    };
    console.log(data);

    let res = await HttpClientServices.post("/vehicleinspection", data);
    if (!res.error) {
      setSuccess(true);
      console.log(res.results);
    } else {
      setError(true);
      console.log(res.error, res.message);
    }
  }

  return (
    <Container
      className="container"
      maxWidth="md"
      sx={{
        marginTop: 2,
      }}
    >
      {" "}
      <CssBaseline />
      <Paper className="paper" elevation={3}>
        <Box>
          <Typography
            variant="h5"
            color="secondary"
            sx={{ padding: 2, fontWeight: "bold" }}
          >
            ใบตรวจเช็คสภาพรถ
          </Typography>
        </Box>

        <Divider />

        <Grid container spacing={2} sx={{ padding: 1 }}>
          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined">
              <Typography>ประเภทรถพยาบาล</Typography>
              <Select
                id="ID"
                native
                name="TypeAblID"
                size="small"
                onChange={handleChange}
                inputProps={{
                  name: "TypeAblID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกประเภทรถพยาบาล
                </option>
                {typeAbls.map((item: TypeAblsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined">
              <Typography>รถพยาบาล</Typography>
              <Select
                id="ID"
                native
                name="AmbulanceID"
                size="small"
                onChange={handleChange}
                inputProps={{
                  name: "AmbulanceID",
                }}
                disabled={a != "" ? false : true}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกรถพยาบาล
                </option>
                {abl.map((item: AmbulancesInterface) => (
                  <option value={Number(item.ID)} key={item.ID}>
                    {item.CarBrand}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField label="detail" disabled fullWidth rows={2} multiline />
          </Grid>

          <Grid item xs={4}>
            <Typography>เลขไมล์ (ODO Meter)</Typography>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="OdoMeter"
                name="OdoMeter"
                type="number"
                size="small"
                InputProps={{
                  inputProps: { min: 1, max: 99999 },
                  name: "OdoMeter",
                }}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <Typography>ปัญหา (Fail)</Typography>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Fail"
                name="Fail"
                type="string"
                size="small"
                color="primary"
                inputProps={{
                  name: "Fail",
                }}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined">
              <Typography>ชิ้นส่วนรถ</Typography>
              <Select
                id="ID"
                native
                name="AmbulancePartID"
                size="small"
                onChange={handleChange}
                inputProps={{
                  name: "AmbulancePartID",
                }}
                // disabled={a != "" ? false : true}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกสถานะรถ
                </option>
                {ablpart.map((item: AmbulancePartInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.PartName}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined">
              <Typography>สถานะรถ</Typography>
              <Select
                id="ID"
                native
                name="StatusCheckID"
                size="small"
                onChange={handleChange}
                inputProps={{
                  name: "StatusCheckID",
                }}
                // disabled={a != "" ? false : true}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกสถานะรถ
                </option>
                {statuscheck.map((item: StatusCheckInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.StatusName}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined">
              <Typography> วัน/เวลา </Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={0}
                  onChange={(newValue) => {
                    newValue = 1;
                  }}
                  renderInput={(params) => (
                    <TextField {...params} size="small" />
                  )}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Grid item xs={6}>
              <Button
                style={{ float: "left" }}
                //   onClick={}
                component={RouterLink}
                to="/VehicleInspectionHistory"
                variant="contained"
                color="secondary"
              >
                ย้อนกลับ
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                style={{ float: "right" }}
                onClick={submit}
                variant="contained"
                color="primary"
              >
                บันทึกข้อมูล
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar
        open={error}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
        </Alert>
      </Snackbar>
    </Container>
  );
}
