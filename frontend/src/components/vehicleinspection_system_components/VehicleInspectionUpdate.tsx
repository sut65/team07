import { Link as RouterLink } from "react-router-dom";
import * as React from "react";
import { Button, Grid, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import moment from "moment";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function DialogTitleProps(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

// RecordTimeOutUpdate.propTypes = {
//   student: PropTypes.any,
//   teacher: PropTypes.any,
//   c: PropTypes.string.isRequired,
//   r: PropTypes.string.isRequired,
// };

export default function VehicleInspectionUpdate(props: any) {
  const { params } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        onClick={handleClickOpen}
      >
        detail
      </Button>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitleProps id="customized-dialog-title" onClose={handleClose}>
          ข้อมูลใบตรวจเช็คสภาพรถ ไอดีที่ {params.ID}
        </DialogTitleProps>

        <DialogContent dividers sx={{ width: "550px", height: "320px" }}>
          <Grid item xs={12} container>
            <Grid item xs={5}>
              วันที่ :{" "}
            </Grid>
            <Grid item xs={7}>
              {moment(params.VehicleInspectionDatetime).format("DD/MM/YYYY")}
            </Grid>
            <Grid item xs={5}>
              {" "}
              เวลา :
            </Grid>
            <Grid item xs={7}>
              {moment(params.VehicleInspectionDatetime).format("HH:mm")} น.
            </Grid>
            <Grid item xs={5}>
              ประเภทรถ:
            </Grid>
            <Grid item xs={7}>
              {params.Ambulance.TypeAbl.Name}
            </Grid>
            <Grid item xs={5}>
              ยี่ห้อรถ :
            </Grid>
            <Grid item xs={7}>
              {params.Ambulance.CarBrand}
            </Grid>
            <Grid item xs={5}>
              เลขทะเบียนรถ:
            </Grid>
            <Grid item xs={7}>
              {params.Ambulance.Clp}
            </Grid>
            <Grid item xs={5}>
              เลขไมล์ (ODO Meter) :
            </Grid>
            <Grid item xs={7}>
              {params.OdoMeter}
            </Grid>
            <Grid item xs={5}>
              ชิ้นส่วนรถที่มีปัญหา :
            </Grid>
            <Grid item xs={7}>
              {params.AmbulancePart.PartName}
            </Grid>
            <Grid item xs={5}>
              ปัญหา (Fail) :
            </Grid>
            <Grid item xs={7}>
              {params.Fail}
            </Grid>
            <Grid item xs={5}>
              สถานะรถ :
            </Grid>
            <Grid item xs={7}>
              {params.StatusCheck.StatusName}
            </Grid>
            <br /> <br />
          </Grid>
          <Divider />
          <Grid item xs={12} container>
            <Grid item xs={5}>
            {params.Employee.User.Role.Name}  :
            </Grid>
            <Grid item xs={7}>
              {params.Employee.Name}
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="error">
            Close
          </Button>
          <Button component={RouterLink} to="/VehicleInspectionCreate">
            Edit
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
