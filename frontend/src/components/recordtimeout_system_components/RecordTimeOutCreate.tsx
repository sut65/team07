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
import { TypeAblsInterface } from "../../models/ambulance_system_models/typeAbl";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export interface CaseInterface {
  ID: number;
  Patient: string;
  Location: string;
  Age: number;
  Status: string;
  DateTime: Date;
}

function RecordTimeOutCreate() {
  const [recordtimeout, setRecordTimeOut] = useState<
    Partial<RecordTimeOutInterface>
  >({ RecordTimeOutDatetime: new Date() });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [emp, setEmployee] = useState<EmployeeInterface[]>([]);
  const [cases, setCases] = useState<CaseInterface[]>([]);

  const [abl, setAmbulance] = useState<AmbulancesInterface[]>([]);
  const [typeAbls, setTypeAbl] = useState<TypeAblsInterface[]>([]);
  const [a, setA] = useState<string>("");
  const [detailCase, setDetailCase] = useState<string>("รายละเอียด");

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

    if (event.target.name === "CaseID") {
      cases.forEach((val: any) => {
        if (val.ID === Number(event.target.value)) {
          setDetailCase(`ไอดีเคส: ${val.ID} สถานที่เกิดเหตุ: ${val.Location}`);
        }
      });
      if (event.target.value === "") {
        setDetailCase("รายละเอียด");
      }
    }

    if (event.target.name === "TypeAblID") {
      getAmbulance(event.target.value);
      setA(event.target.value);
      if (event.target.value === "") {
        setAmbulance([]);
      }
    }
    console.log(recordtimeout);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name as keyof typeof recordtimeout;
    setRecordTimeOut({
      ...recordtimeout,
      [name]: event.target.value,
    });
  };

  const getAmbulance = async (id: string) => {
    try {
      let res = await HttpClientServices.get(`/abl/${id}`);
      setAmbulance(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getCases = async () => {
    try {
      let res = await HttpClientServices.get(`/cases`);
      setCases(res.data);
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
    // getAmbulance();
    getEmployee();
    getTypeAbl();
    getCases();
  }, []);

  async function submit() {
    let data = {
      // ID: recordtimeout.ID ?? 0,
      OdoMeter: convertType(recordtimeout?.OdoMeter) ?? 0,
      Annotation: recordtimeout?.Annotation ?? "",
      RecordTimeOutDatetime: recordtimeout?.RecordTimeOutDatetime ?? new Date(),
      EmployeeID: convertType(recordtimeout?.EmployeeID) ?? 1,
      CaseID: convertType(recordtimeout?.CaseID) ?? 0,
      AmbulanceID: convertType(recordtimeout?.AmbulanceID) ?? 0,
    };
    console.log(data);

    try {
      let res = await HttpClientServices.post("/recordtimeout", data);
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
                // value={String(recordtimeout?.CaseID)}
                onChange={handleChange}
                inputProps={{
                  name: "CaseID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกเคส
                </option>
                {cases.map((item: CaseInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.ID}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label={detailCase}
              disabled
              fullWidth
              rows={2.5}
              multiline
              // defaultValue={detailCase}
            />
          </Grid>

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
            <TextField
              label="detail"
              disabled
              fullWidth
              rows={2.5}
              multiline
              // value={abl?.Clp}
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
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <Typography>หมายเหตุ</Typography>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Annotation"
                name="Annotation"
                type="string"
                size="small"
                color="primary"
                inputProps={{
                  name: "Annotation",
                }}
                onChange={handleInputChange}
              />
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
