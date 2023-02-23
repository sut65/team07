import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { DialogTitle, DialogContent, DialogContentText, DialogActions, Dialog, Slide } from "@mui/material";

import moment from "moment";
import { TransitionProps } from "@mui/material/transitions";
import { DeleteCarcareByID, GetCarcareAll } from "../../services/carcare_system_services/HttpClientService";
import { CarcareInterface } from "../../models/carcare_system_models/carcare"; 
import { convertType } from "../../services/utility";



const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Carcarehis() {
  const [carcares, setCarcare] = useState<CarcareInterface[]>([]);

  const getCarcareByiD = async () => {
    let res = await GetCarcareAll();
    if (res) {
      setCarcare(res);
      console.log(res)
    }
  };


  const [open, setOpen] = useState(false);

  const getDeletegetCarcareByID = async () => {
    let cc_id = convertType(localStorage.getItem("cc_id"))
    let res = await DeleteCarcareByID(cc_id);
    if (res) {
      console.log(res.data);
    } else {
      console.log(res.data);
    }
    getCarcareByiD();
  };
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    getDeletegetCarcareByID();
    setOpen(false);

  }

  useEffect(() => {

    getCarcareByiD();

  }, []);


  const columns: GridColDef[] = [
    {
      field: "ID",
      headerName: "ลำดับ",
      width: 60,
      headerAlign: "center",
    },

    {
      field: "VehicleInspectionID",
      headerName: "ใบตรวจเช็คสภาพ",
      width: 100,
      headerAlign: "center",
      valueFormatter: (params) =>{
        return  params.value.VehicleInspection
      },
    },

    {
      field: "SendDate",
      headerName: "วันส่งซ่อม",
      width: 200,
      headerAlign: "center",
      align: "center",
      valueFormatter: (params) => moment(params?.value).format("DD/MM/YYYY")
    },

    {
      field: "ReciveDate",
      headerName: "วันรับรถ",
      width: 200,
      headerAlign: "center",
      align: "center",
      valueFormatter: (params) => moment(params?.value).format("DD/MM/YYYY")
    },

    {
      field: "Bill",
      headerName: "งบประมาณ",
      width: 100,
      valueFormatter: (params) => {
        return params.value.Bill
      },
      headerAlign: "center",
    },

    {
      field: "Note",
      headerName: "ข้อเสนอเเนะ",
      width: 350,
      valueFormatter: (params) => params.value.Note,
      headerAlign: "center",
    },

    {
      field: "CarStat",
      headerName: "สถานะการส่งซ่อม",
      width: 100,
      valueFormatter: (params) => params.value.Name,
      headerAlign: "center",
    },

    {
      field: "SaveDate",
      headerName: "วันที่เเจ้งซอม",
      width: 200,
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
        <Button  component={RouterLink}
          to="/CarcareUpdate"
          size="small"
          variant="contained"
          color="error"
          onClick={() => {
            localStorage.setItem("cc_id", row.ID);
            localStorage.setItem("ve_id",row.VehicleInspectionID);
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
            localStorage.setItem("cc_id", row.ID);
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
              ข้อมูลการเเจ้งซ่อม
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/CarCareCreate"
              variant="contained"
              color="secondary"
            >
              เเจ้งซ่อม
            </Button>
          </Box>
        </Box>
        <div style={{ borderRadius: 20 }}>
          <DataGrid
            rows={carcares}
            getRowId={(row) => row.ID}
            columns={columns}
            pageSize={5}
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
        <DialogTitle>{`คุณต้องการลบข้อมูลใบสั่งซ่อมหมายเลข ${localStorage.getItem("cc_id")}  ใช่หรือไม่?`}</DialogTitle>
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

export default Carcarehis;