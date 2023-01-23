import React, { useEffect, useState } from "react";
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
import { RecordTimeOutInterface } from "../../models/recordtimeout_system_models/recordtimeout";
import { apiUrl, convertType } from "../../services/utility";
import { HttpClientServices } from "../../services/recordtimeout_system_services/HttpClientServices";
import { EmployeeInterface } from "../../models/employeeSystemModel/IEmployee";
import { AmbulancesInterface } from "../../models/ambulance_system_models/ambulance";
import {TypeAblsInterface} from "../../models/ambulance_system_models/typeAbl"
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function RecordTimeOutCreate() {
  const [recordtimeout, setRecordTimeOut] = useState<
    Partial<RecordTimeOutInterface>
  >({ RecordTimeOutDatetime: new Date() });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [emp, setEmployee] = useState<EmployeeInterface[]>([]);
  // const [case,setCase] = useState<CaseInterface[]>([]);
  const [abl, setAmbulance] = useState<AmbulancesInterface[]>([]);
  const [abl_id, setAmbulanceID] = useState<AmbulancesInterface>();

  const [typeabl, setTypeAbl] = useState<TypeAblsInterface[]>([]);

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
    const name = event.target.name as keyof typeof recordtimeout;
    setRecordTimeOut({ ...recordtimeout, [name]: event.target.value });
    console.log(name);

    // if (name === "PatientID") {
    //   localStorage.setItem("PID", event.target.value);
    //   get_Patient();
    // }
    // if (name === "MedicineID") {
    //   localStorage.setItem("MID", event.target.value);
    //   get_Medicine();
    // }
  };

  //   const handleInputChange = (
  //     event: React.ChangeEvent<{ id?: string; value: any }>
  //   ) => {
  //     const id = event.target.id as keyof typeof Prescriptions;
  //     const { value } = event.target;
  //     setPrescription({ ...prescription, [id]: value });
  //   };

  const getAmbulance = async () => {
    try {
      let res = await HttpClientServices.get("/ambulances");
      setAmbulance(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getTypeAbl = async () => {
    try {
      let res = await HttpClientServices.get("/type_abls");
      setTypeAbl(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getEmployee = async () => {
    try {
      let res = await HttpClientServices.get("/employees");
      setEmployee(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAmbulance();
    getEmployee();
    getTypeAbl();
  }, []);

  async function submit() {
    let data = {
      ID: recordtimeout.ID ?? 0,
      OdoMeter: recordtimeout?.OdoMeter ?? 0,
      Annotation: recordtimeout?.Annotation ?? "",
      RecordTimeOutDatetime: recordtimeout?.RecordTimeOutDatetime ?? new Date(),
      EmployeeID: convertType(recordtimeout?.EmployeeID) ?? 0,
      CaseID: convertType(recordtimeout?.CaseID) ?? 0,
      AmbulanceID: convertType(recordtimeout?.AmbulanceID) ?? 0,
    };
    console.log(data);

    try {
      let res = await HttpClientServices.post("/recordtimeouts", data);
      setSuccess(true);
      console.log(res.data);
    } catch (err) {
      setError(false);
      console.log(err);
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
            color="primary"
            sx={{ padding: 2, fontWeight: "bold" }}
          >
            บันทึกเวลาใช้รถขาออกของพนักงานขับรถ
          </Typography>
        </Box>
        <Divider />
        <Grid container spacing={2} sx={{ padding: 1 }}>
          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined">
              <Typography>เคสที่ได้รับแจ้ง</Typography>
              <Select
                id="ID"
                native
                name="CaseID"
                size="small"
                value={String(recordtimeout?.CaseID)}
                onChange={handleChange}
                inputProps={{
                  name: "CaseID",
                }}
              >
                <option>กรุณาเลือกเคส</option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField label="detail" disabled fullWidth rows={2.5} multiline />
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined">
              <Typography>ประเภทรถพยาบาล</Typography>
              <Select
                id="ID"
                native
                name="TypeAblID"
                size="small"
                value={String(typeabl.)}
                onChange={handleChange}
                inputProps={{
                  name: "TypeAblID",
                }}
              >
                <option aria-label="None" value="กรุณาเลือกประเภทรถพยาบาล">
                  กรุณาเลือกประเภทรถพยาบาล
                </option>
                {abl.map((item: AmbulancesInterface) => (
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
                // value={String(abl?.)}
                value={"TOYOTA"}
                onChange={handleChange}
                inputProps={{
                  name: "AmbulanceID",
                }}
              >
                <option>กรุณาเลือกรถพยาบาล</option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="detail"
              disabled
              fullWidth
              rows={2.5}
              multiline
              value={abl_id?.Clp}
            />
          </Grid>

          <Grid item xs={4}>
            <Typography>เลขไมล์ (ODO Meter)</Typography>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="OdoMeter"
                type="number"
                size="small"
                value={recordtimeout?.OdoMeter}
              />
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <Typography>หมายเหตุ</Typography>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Annotation"
                type="string"
                size="small"
                value={recordtimeout?.Annotation}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined" size="small">
              <Typography> วัน/เวลา </Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={0}
                  onChange={(newValue) => {
                    newValue = 1;
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Button
              style={{ float: "left" }}
              onClick={submit}
              variant="contained"
              color="primary"
            >
              บันทึกข้อมูล
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              style={{ float: "right" }}
              //   onClick={}
              component={RouterLink}
              to="/RecordTimeOutHistory"
              variant="contained"
              color="secondary"
            >
              ย้อนกลับ
            </Button>
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
      <Snackbar open={error} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default RecordTimeOutCreate;
