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
import { useParams } from "react-router-dom";
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
  const params = useParams();
  const [recordtimeout, setRecordTimeOut] = useState<
    Partial<RecordTimeOutInterface>
  >({ RecordTimeOutDatetime: new Date() });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const [employee, setEmployee] = useState<EmployeeInterface>();
  const [cases, setCases] = useState<CaseInterface[]>([]);

  const [abl, setAmbulance] = useState<AmbulancesInterface[]>([]);
  const [typeAbls, setTypeAbls] = useState<TypeAblsInterface[]>([]);
  const [typeAbl, setTypeAbl] = useState<string>("");
  const [detailCase, setDetailCase] = useState<string>("รายละเอียด");
  const [detailABL, setDetailAbl] = useState<string>("รายละเอียด");
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
      setTypeAbl(event.target.value);
      setDetailAbl("รายละเอียด");

      
      if (event.target.value === "") {
        setAmbulance([]);
      }
    }
    if (event.target.name === "AmbulanceID") {
      
      abl.forEach((val: any) => {
        if (val.CarBrand === Number(event.target.value)) {
          setAmbulance([]);
        }
      });

      if (event.target.value !== "") {
        setDetailAbl(
          `ไอดีรถ: ${event.target.value} ยี่ห้อรถ: ${event.target.value} เลขทะเบียนรถ: ${event.target.value}`
        );
      } else {
        setDetailAbl("รายละเอียด");
      }
    }
    // console.log(recordtimeout);
  };

  const submitTest = () => {
    console.log(abl)
  }
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name as keyof typeof recordtimeout;
    setRecordTimeOut({
      ...recordtimeout,
      [name]: event.target.value,
    });
  };

  //get Ambulance
  const getAmbulance = async (id: string) => {
    let res = await HttpClientServices.get(`/abl/${id}`);
    if (!res.error) {
      setAmbulance(res.results);
      // console.log(res);
    } else {
      console.log(res.error);
    }
  };
  //get Case
  const getCases = async () => {
    let res = await HttpClientServices.get(`/cases`);
    if (!res.error) {
      setCases(res.results);
      // console.log(res);
    } else {
      console.log(res.error);
    }
  };
  //get Type Ambulance
  const getTypeAbl = async () => {
    let res = await HttpClientServices.get("/type_abls");
    if (!res.error) {
      setTypeAbls(res.results);
      // console.log(res);
    } else {
      console.log(res.error);
    }
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
  // get RecordTimeOut Update /:id
  const getRecordTimeOut = async (id: string) => {
    let res = await HttpClientServices.get(`/recordtimeout/${id}`);
    if (!res.error) {
      setRecordTimeOut({
        AmbulanceID: res.results.AmbulanceID,
        Annotation: res.results.Annotation,
        CaseID: res.results.CaseID,
        EmployeeID: res.results.EmployeeID,
        OdoMeter: res.results.OdoMeter,
        RecordTimeOutDatetime: res.results.RecordTimeOutDatetime,
      });
      // console.log(res?.Ambulance?.TypeAblID);
      setTypeAbl(res.results.Ambulance?.TypeAblID);
      getAmbulance(res.results?.Ambulance?.TypeAblID);
      setDetailCase(
        `ไอดีเคส: ${res.results.CaseID} สถานที่เกิดเหตุ: ${res.results.Case.Location}`
      );
      // console.log(res);
    } else {
      console.log(res.error);
    }
  };

  useEffect(() => {
    // param recordtimeout /:id
    // get recordtimeout
    const param = params ? params : null;
    if (param?.id) {
      getRecordTimeOut(param?.id);
    }

    //get
    getEmployee();
    getTypeAbl();
    getCases();
  }, []);

  async function submit() {
    let data = {
      OdoMeter: convertType(recordtimeout?.OdoMeter),
      Annotation: recordtimeout?.Annotation,
      RecordTimeOutDatetime: recordtimeout?.RecordTimeOutDatetime,
      EmployeeID: convertType(employee?.ID),
      CaseID: convertType(recordtimeout?.CaseID),
      AmbulanceID: convertType(recordtimeout?.AmbulanceID),
    };
    console.log(data);

    //บันทึก || อัพเดท
    const param = params ? params : null;
    if (param?.id) {
      //update
      let res = await HttpClientServices.patch(`/recordtimeout`, data);
      if (!res.error) {
        setSuccess(true);
        console.log(res);
        setMessage("อัพเดทข้อมูลสำเร็จ");
        setTimeout(() => {
          window.location.href = "/RecordTimeOutHistory";
        }, 800);
      } else {
        setError(true);
        setMessage("อัพเดทข้อมูลไม่สำเร็จ " + res.message);
        // console.log(res.message);
      }
    } else {
      //create
      let res = await HttpClientServices.post("/recordtimeout", data);
      if (!res.error) {
        setSuccess(true);
        console.log(res);
        setMessage("บันทึกข้อมูลสำเร็จ");
        setTimeout(() => {
          window.location.href = "/RecordTimeOutHistory";
        }, 800);
      } else {
        setError(true);
        setMessage("บันทึกข้อมูลไม่สำเร็จ " + res.message);
        // console.log(res.message);
      }
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
                type="number"
                value={String(recordtimeout?.CaseID)}
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
              disabled
              fullWidth
              rows={2}
              multiline
              type="string"
              value={detailCase}
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
              disabled
              fullWidth
              rows={2}
              multiline
              value={detailABL}
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
                value={String(recordtimeout?.OdoMeter)}
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
                value={String(recordtimeout?.Annotation ?? "")}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined">
              <Typography> วัน/เวลา </Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  openTo={"year"}
                  value={recordtimeout?.RecordTimeOutDatetime}
                  onChange={(newValue) => {
                    const id =
                      "RecordTimeOutDatetime" as keyof typeof recordtimeout;
                    // console.log(newValue);
                    setRecordTimeOut({ ...recordtimeout, [id]: newValue });
                  }}
                  inputFormat="dd/MM/yyyy"
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
              //   onClick={}
              component={RouterLink}
              to="/RecordTimeOutHistory"
              variant="contained"
              color="secondary"
            >
              ย้อนกลับ
            </Button>
          </Grid>
          <Grid item xs={6}>
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
      </Paper>
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          {message}
        </Alert>
      </Snackbar>
      <Snackbar
        open={error}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          {message}
        </Alert>
      </Snackbar>

      {/* <Button onClick={submitTest}>
        Test
      </Button> */}
    </Container>
  );
}

export default RecordTimeOutCreate;
