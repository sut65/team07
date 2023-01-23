import React, { useEffect, useState } from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {CssBaseline,Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import Select from "@mui/material/Select";
import { Link as RouterLink } from "react-router-dom";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function RecordTimeOutCreate() {
  //   const [RecordTimeOut, setRecordTimeOut] = useState<
  //   Partial<RecordTimeOutInterface>
  //  >({ Record_Time_Out_Datetime: new Date() });

  
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  // const [rec, setRecordTimeOutID] = useState("");

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
  //   const handleChange = (event: SelectChangeEvent) => {
  //     const name = event.target.name as keyof typeof prescription;
  //     setPrescription({ ...prescription, [name]: event.target.value });
  //     console.log(name);

  //     if (name === "PatientID") {
  //       localStorage.setItem("PID", event.target.value);
  //       get_Patient();
  //     }
  //     if (name === "MedicineID") {
  //       localStorage.setItem("MID", event.target.value);
  //       get_Medicine();
  //     }
  //   };

  //   const handleInputChange = (
  //     event: React.ChangeEvent<{ id?: string; value: any }>
  //   ) => {
  //     const id = event.target.id as keyof typeof Prescriptions;
  //     const { value } = event.target;
  //     setPrescription({ ...prescription, [id]: value });
  //   };

  useEffect(() => {}, []);

  //   function submit() {
  //     let data = {
  //       PrescriptionID: prescriptionID,
  //       EmployeeID: convertType(employee?.ID) ?? "",
  //       MedicineID: convertType(prescription?.MedicineID) ?? "",
  //       PatientID: convertType(prescription?.PatientID) ?? "",
  //       Symptom: prescription?.Symptom ?? "",
  //       Case_Time: prescription?.Case_Time ?? "",
  //     };
  //     console.log(data);

  //     const apiUrl = "http://localhost:8080/pharmacist/prescription";
  //     const requestOptions = {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     };

  //     fetch(apiUrl, requestOptions)
  //       .then((response) => response.json())
  //       .then((res) => {
  //         if (res.data) {
  //           setSuccess(true);
  //         } else {
  //           setError(true);
  //         }
  //       });
  //   }

  return (
    <Container
      className="container"
      maxWidth="md"
      
      sx={{
        marginTop: 2
      }}
    >  <CssBaseline />
      <Paper className="paper"  elevation={3}>
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
              <Select>
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
              <Select>
                <option>กรุณาเลือกประเภทรถพยาบาล</option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined">
              <Typography>รถพยาบาล</Typography>
              <Select>
                <option>กรุณาเลือกรถพยาบาล</option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField label="detail" disabled fullWidth rows={2.5} multiline />
          </Grid>
          <Grid item xs={4}>
            <Typography >เลขไมล์ (ODO Meter)</Typography>
            <FormControl fullWidth variant="outlined">
              <TextField   id="Name" type="number" variant="outlined" />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <Typography>หมายเหตุ</Typography>
            <FormControl fullWidth variant="outlined">
              <TextField id="Name" type="string" variant="outlined" />
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
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Button
              style={{ float: "left" }}
              //   onClick={}
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
