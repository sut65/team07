
import { Link as RouterLink } from "react-router-dom";
import * as React from "react";
import Button from "@mui/material/Button";
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
          ข้อมูลการใช้รถพยาบาล
        </DialogTitleProps>
        
        <DialogContent dividers sx={{ width: "550px", height: "350px" }}>
          <Typography gutterBottom>
            วันที่ :{" "}
            {moment(params.record_time_out_datetime).format("DD/MM/YYYY")}
            &nbsp; เวลา :
            {moment(params.record_time_out_datetime).format("HH:mm")} น.
          </Typography>
          <Typography gutterBottom>หมายเหตุ : {params.annotation}</Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="error">
            Close
          </Button>
          <Button component={RouterLink} to="/RecordTimeOutCreate">
            Edit
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
