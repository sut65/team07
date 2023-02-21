import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import moment from "moment";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { convertType } from "../../services/utility";

import { CaseInterface } from "../../models/emergency_system_models/case";
import { GetEmercaseAll } from "../../services/emergency_system_service/HttpClientServices";
import { DeleteCaseByID } from "../../services/emergency_system_service/HttpClientServices";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Case() {

  const getDeletegetCaseByID = async () => {
    let ec_id = convertType(localStorage.getItem("ec_id"))
    let res = await DeleteCaseByID(ec_id);
    if (res) {
      console.log(res.data);
    } else {
      console.log(res.data);
    }
    getCaseByID();
  };
  
  const [cases, setCases] = useState<CaseInterface[]>([]);

  const getCaseByID = async () => {
    let res = await GetEmercaseAll();
    console.log(res)
    if (res) {
      setCases(res);
    }
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    getDeletegetCaseByID();
    setOpen(false);

  }

  useEffect(() => {

    getCaseByID();

  }, []);


  const columns: GridColDef[] = [
    {
      field: "ID",
      headerName: "ลำดับ",
      width: 60,
      headerAlign: "center",
    },

    {
      field: "Emergency",
      headerName: "เหตุฉุกเฉิน",
      width: 150,
      valueFormatter: (params) => params.value.Name,
      headerAlign: "center",
    },

    {
      field: "Location",
      headerName: "สถานที่เหตุ",
      width: 350,
      valueFormatter: (params) => params.value.Location,
      headerAlign: "center",
    },

    {
      field: "Patient",
      headerName: "ชื่อผู้ประสบเหตุ",
      width: 250,
      valueFormatter: (params) => params.value.Patient,
      headerAlign: "center",
    },

    {
      field: "Age",
      headerName: "อายุ",
      width: 50,
      valueFormatter: (params) => params.value.Age,
      headerAlign: "center",
    },

    {
      field: "Gender",
      headerName: "เพศ",
      width: 60,
      valueFormatter: (params) => params.value.Name,
      headerAlign: "center",
    },

    {
      field: "Status",
      headerName: "อาการโดยรวม",
      width: 250,
      valueFormatter: (params) => params.value.Status,
      headerAlign: "center",
    },

    {
      field: "Datetime",
      headerName: "วันที่เกิดเหตุ",
      width: 240,
      headerAlign: "center",
      align: "center",
      valueFormatter: (params) => moment(params?.value).format("DD/MM/YYYY hh:mm A")
    },

    {
      field: "Edit",
      headerName: "Edit",
      sortable: true,
      width: 100,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }: Partial<GridRowParams>) =>
        <Button component={RouterLink}
          to="/CaseUpdate"
          size="small"
          variant="contained"
          color="error"
          onClick={() => {
            localStorage.setItem("ec_id", row.ID);
          }}
          sx={{ borderRadius: 20, '&:hover': { color: '#FC0000', backgroundColor: '#F9EBEB' } }}
        >
          แก้ไข
        </Button>,
    },

    {
      field: "Delete", headerName: "Delete", width: 100, align: "center", headerAlign: "center",
      renderCell: ({ row }: Partial<GridRowParams>) =>
        <Button
          size="small"
          variant="contained"
          color="error"
          onClick={() => {
            localStorage.setItem("ec_id", row.ID);
            handleClickOpen();

          }}
          sx={{ borderRadius: 20, '&:hover': { color: '#FC0000', backgroundColor: '#F9EBEB' } }}
        >
          ลบ
        </Button>,
    },
  ];

  return (
    <div>
      <Container maxWidth="xl"
        sx={{
          mt: 1,
          mb: 2,
          p: 1,
          bgcolor: '#F1F6F5',
          borderRadius: 3
        }}
        disableGutters={true}>
        <Box
          display="flex"
          sx={{
            marginTop: 2,
          }}
        >
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="secondary"
              gutterBottom
            >
              ข้อมูลการเเจ้งเหตุ
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/CaseCreate"
              variant="contained"
              color="secondary"
            >
              เเจ้งเหตุฉุกเฉิน
            </Button>
          </Box>
        </Box>
        <div style={{ borderRadius: 20 }}>
          <DataGrid
            rows={cases}
            getRowId={(row) => row.ID}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            autoHeight={true}
            density={'comfortable'}
            sx={{ mt: 2, backgroundColor: '#fff' }}
          />
        </div>

        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{`คุณต้องการลบข้อมูลเหตุฉุกเฉินหมายเลข ${localStorage.getItem("ec_id")}  ใช่หรือไม่?`}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              หากคุณลบข้อมูลนี้แล้วนั้น คุณจะไม่สามารถกู้คืนได้อีก
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              color="error"
              sx={{
                borderRadius: 10,
                '&:hover': { color: '#FC0000', backgroundColor: '#F9EBEB' }
              }} onClick={handleClose}
            >ยกเลิก</Button>
            <Button sx={{
              borderRadius: 10,
              '&:hover': { color: '#065D95', backgroundColor: '#e3f2fd' }
            }}
              onClick={handleDelete}
            >ยืนยัน</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
}

export default Case;

