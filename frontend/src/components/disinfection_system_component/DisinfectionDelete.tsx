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
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { RecordTimeOutInterface } from "../../models/recordtimeout_system_models/recordtimeout";
//import { HttpClientServices } from "../../services/recordtimeout_system_services/HttpClientServices";
import { HttpClientServices } from "../../services/disinfection_system_services/HttpClientServices";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function DisinfectionDelete(props: any) {
  const { params } = props;
  const [open, setOpen] = React.useState(false);

  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
 
  const handleClose = () => {
    setOpen(false);
    setSuccess(false);
    setError(false)
  };
  
  async function submit() {
    try {
      let res = await HttpClientServices.delete(`/disinfection/${params}`);
      console.log(res.data);
      setSuccess(true);
    } catch (err) {
      setError(true);
      console.log(err);
    }
  }

  return (
    <div>
      <IconButton
        color="error"
        size="small"
        aria-label="delete"
        onClick={handleClickOpen}
      >
        <DeleteOutlineIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          ยืนยันการลบรายการนี้ ?
        </DialogTitle>
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
