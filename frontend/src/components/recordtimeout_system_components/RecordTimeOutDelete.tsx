import * as React from "react";
import IconButton from "@mui/material/IconButton";
import { Snackbar, Button } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
//icon
import { EmployeeInterface } from "../../models/employeeSystemModel/IEmployee";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { RecordTimeOutInterface } from "../../models/recordtimeout_system_models/recordtimeout";
import { HttpClientServices } from "../../services/recordtimeout_system_services/HttpClientServices";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function RecordTimeOutDelete(props: any) {
  const { params } = props;
  const [open, setOpen] = React.useState(false);

  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [emp, setEmployee] = React.useState<EmployeeInterface>();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSuccess(false);
    setError(false);
  };

  const getEmployee = async () => {
    let res = await HttpClientServices.get(`/employee/${localStorage.getItem("id")}`);
    if (!res.error) {
      setEmployee(res.results);
    } else {
      console.log(res.error);
    }
  };

  async function submit() {
    let res = await HttpClientServices.delete(`/driver/recordtimeout/${params}`);
    if(!res.error){
      console.log(res.results);
      setTimeout(() => {
        window.location.reload();
      }, 800);
      setSuccess(true);
    }else{
      setError(true);
      console.log(res.error);
    }
  }
  
  React.useEffect(() => {
    getEmployee();
  }, []);

  return (
    <div>
      <IconButton
        color="error"
        size="small"
        aria-label="delete"
        onClick={handleClickOpen}
      >
        <DeleteTwoToneIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            คุณ {emp?.Name} ต้องการลบรายการบันทึกเวลาใช้รถไอดีที่ {params}{" "}
            ใช่ไหม ??
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ยกเลิก</Button>
          <Button onClick={submit} autoFocus>
            ยืนยัน
          </Button>
        </DialogActions>
        <Snackbar
          open={success}
          autoHideDuration={2000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="success">
            ลบข้อมูลสำเร็จ
          </Alert>
        </Snackbar>
        <Snackbar
          open={error}
          autoHideDuration={2000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="error">
            ลบข้อมูลไม่สำเร็จ
          </Alert>
        </Snackbar>
      </Dialog>
    </div>
  );
}
