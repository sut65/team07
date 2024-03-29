import * as React from "react";
import { useParams } from "react-router-dom";
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
import { convertType } from "../../services/utility";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function VehicleInspectionCreate() {
  const params = useParams();
  const [vehicleinspection, setVehicleInspection] = React.useState<
    Partial<VehicleInspectionInterface>
  >({ VehicleInspectionDatetime: new Date() });
  const [checkParam, setcheckParam] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [abl, setAmbulance] = React.useState<AmbulancesInterface[]>([]);
  const [typeAbls, setTypeAbls] = React.useState<TypeAblsInterface[]>([]);
  const [typeAbl, setTypeAbl] = React.useState<string>("");
  const [statuscheck, setStatuscheck] = React.useState<StatusCheckInterface[]>(
    []
  );
  const [message, setMessage] = React.useState("");
  const [ablpart, setAmbulancePart] = React.useState<AmbulancePartInterface[]>(
    []
  );
  const [employee, setEmployee] = React.useState<EmployeeInterface>();
  const [detailAbl, setDetailAbl] = React.useState<string>("รายละเอียด");
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

    if (event.target.name === "TypeAblID") {
      setTypeAbl(event.target.value);
      setVehicleInspection({ ...vehicleinspection, AmbulanceID: 0 });
      setDetailAbl("รายละเอียด");
      if (event.target.value === "") {
        setAmbulance([]);
      } else {
        getAmbulance(event.target.value);
      }
    }

    if (event.target.name === "AmbulanceID") {
      const a = abl.filter((v) => v.ID === Number(event.target.value))[0];
      if (a) {
        setDetailAbl(
          `ไอดีรถ: ${a.ID} ยี่ห้อรถ: ${a.CarBrand} เลขทะเบียนรถ: ${a.Clp}`
        );
      } else {
        setDetailAbl("รายละเอียด");
      }
    }
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name as keyof typeof vehicleinspection;
    setVehicleInspection({
      ...vehicleinspection,
      [name]: event.target.value,
    });
  };
  //get Employee /:id
  const getEmployee = async () => {
    let res = await HttpClientServices.get(
      `/employee/${localStorage.getItem("id")}`
    );
    if (!res.error) {
      setEmployee(res.results);
    } else {
      console.log(res.error);
    }
  };
  //get Ambulance
  const getAmbulance = async (id: string) => {
    let res = await HttpClientServices.get(`/checkabl/${id}`);
    if (!res.error) {
      setAmbulance(res.results);
      // console.log(res.results);
    } else {
      console.log(res.error);
    }
  };
  //get Type Ambulance
  const getTypeAbl = async () => {
    let res = await HttpClientServices.get(`/type_abls`);
    if (!res.error) {
      setTypeAbls(res.results);
      // console.log(res.results);
    } else {
      console.log(res.error);
    }
  };
  //get StatusCheck
  const getStatusCheck = async () => {
    let res = await HttpClientServices.get(`/statuschecks`);
    if (!res.error) {
      setStatuscheck(res.results);
      //console.log(res.results);
    } else {
      console.log(res.error);
    }
  };
  //get Ambulance Part
  const getAmbulancePart = async () => {
    let res = await HttpClientServices.get(`/ambulanceparts`);
    if (!res.error) {
      setAmbulancePart(res.results);
      //console.log(res.results);
    } else {
      console.log(res.error);
    }
  };

  const getVehicleInspection = async (id: string) => {
    let res = await HttpClientServices.get(`/vehicleinspection/${id}`);
    if (!res.error) {
      setVehicleInspection({
        AmbulanceID: res.results.AmbulanceID,
        EmployeeID: res.results.EmployeeID,
        StatusCheckID: res.results.StatusCheckID,
        AmbulancePartID: res.results.AmbulancePartID,
        Fail: res.results.Fail,
        OdoMeter: res.results.OdoMeter,
        VehicleInspectionDatetime: new Date(),
      });
      setTypeAbl(res.results.Ambulance?.TypeAblID);
      getAmbulance(res.results?.Ambulance?.TypeAblID);
      setDetailAbl(
        `ไอดีรถ: ${res.results.AmbulanceID} ยี่ห้อรถ: ${res.results.Ambulance.CarBrand} เลขทะเบียนรถ: ${res.results.Ambulance.Clp}`
      );
    } else {
      console.log(res.error);
      setError(true);
      setMessage(res.message);
      setTimeout(() => {
        window.location.href = "/VehicleInspectionHistory";
      }, 1500);
    }
  };

  React.useEffect(() => {
    const param = params ? params : null;
    if (param?.id) {
      setcheckParam(true);
      getVehicleInspection(param?.id);
    }
    getTypeAbl();
    getStatusCheck();
    getAmbulancePart();
    getEmployee();
  }, []);

  async function submit() {
    let data = {
      OdoMeter: convertType(vehicleinspection?.OdoMeter),
      Fail: vehicleinspection?.Fail,
      VehicleInspectionDatetime: vehicleinspection?.VehicleInspectionDatetime,
      EmployeeID: convertType(employee?.ID),
      AmbulancePartID: convertType(vehicleinspection?.AmbulancePartID),
      AmbulanceID: convertType(vehicleinspection?.AmbulanceID),
      StatusCheckID: convertType(vehicleinspection.StatusCheckID),
    };
    console.log(data);

    const param = params ? params : null;
    if (param?.id) {
      //update
      const ID = { ID: Number(param?.id) };
      data = { ...data, ...ID };
      let res = await HttpClientServices.patch(`/car-manager/vehicleinspection`, data);
      if (!res.error) {
        setSuccess(true);
        console.log(res);
        setMessage("อัพเดตข้อมูลสำเร็จ");
        // setTimeout(() => {
        //   window.location.href = "/VehicleInspectionHistory";
        // }, 800);
      } else {
        setError(true);
        setMessage("อัพเดตข้อมูลไม่สำเร็จ " + res.message);
        // console.log(res.message);
      }
    } else {
      //create
      let res = await HttpClientServices.post("/car-manager/vehicleinspection", data);
      if (!res.error) {
        setSuccess(true);
        console.log(res);
        setMessage("บันทึกข้อมูลสำเร็จ");
        // setTimeout(() => {
        //   window.location.href = "/VehicleInspectionHistory";
        // }, 800);
      } else {
        setError(true);
        setMessage("บันทึกข้อมูลไม่สำเร็จ " + res.message);
        // console.log(res.message);
      }
    }

    // let res = await HttpClientServices.post("/vehicleinspection", data);
    // if (!res.error) {
    //   setSuccess(true);
    //   console.log(res.results);
    // } else {
    //   setError(true);
    //   console.log(res.error, res.message);
    // }
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
            ใบตรวจเช็คสภาพรถ
          </Typography>
        </Box>

        <Divider />

        <Grid container spacing={2} sx={{ padding: 1 }}>
        {!checkParam && (
            <>
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
                value={String(typeAbl)}
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
                disabled={typeAbl != "" ? false : true}
                value={String(vehicleinspection.AmbulanceID)}
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
          </>
          )}
          <Grid item xs={12}>
          <Typography>รายละเอียดรถพยาบาล</Typography>
            <TextField
              disabled
              fullWidth
              rows={2}
              multiline
              value={detailAbl}
            />
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
                value={vehicleinspection?.OdoMeter ?? ""}
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
                value={vehicleinspection?.Fail ?? ""}
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
                value={String(vehicleinspection.AmbulancePartID)}
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
                value={String(vehicleinspection.StatusCheckID)}
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
                  openTo={"day"}
                  value={vehicleinspection?.VehicleInspectionDatetime}
                  onChange={(newValue) => {
                    const id =
                      "VehicleInspectionDatetime" as keyof typeof vehicleinspection;
                    setVehicleInspection({
                      ...vehicleinspection,
                      [id]: newValue,
                    });
                  }}
                  inputFormat="dd/MM/yyyy"
                  renderInput={(params) => (
                    <TextField {...params} size="small" />
                  )}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
        </Grid>
      </Paper>
      <Snackbar
        open={success}
        // autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          {message}
        </Alert>
      </Snackbar>
      <Snackbar
        open={error}
        // autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
