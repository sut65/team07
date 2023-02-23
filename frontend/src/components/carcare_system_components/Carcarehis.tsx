import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import moment from "moment";

import { GetCarcareAll } from "../../services/carcare_system_services/HttpClientService";
import { CarcareInterface } from "../../models/carcare_system_models/carcare"; 

function Carcarehis() {
  const [carcares, setCarcare] = useState<CarcareInterface[]>([]);

  const getCarcareByiD = async () => {
    let res = await GetCarcareAll();
    if (res) {
      setCarcare(res);
    }
  };

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
        console.log(params)
        return  params.value.VehicleInspection
      },
    },

    {
      field: "SendDate",
      headerName: "วันส่งซ่อม",
      width: 200,
      headerAlign: "center",
      align: "center",
      valueFormatter: (params) => moment(params?.value).format("DD/MM/YYYY hh:mm A")
    },

    {
      field: "ReciveDate",
      headerName: "วันรับรถ",
      width: 200,
      headerAlign: "center",
      align: "center",
      valueFormatter: (params) => moment(params?.value).format("DD/MM/YYYY hh:mm A")
    },

    {
      field: "Bill",
      headerName: "งบประมาณ",
      width: 100,
      valueFormatter: (params) => {
        console.log(params.value.Bill)
        return params.value.Bill
      },
      headerAlign: "center",
    },

    {
      field: "Note",
      headerName: "ข้อเสนอเเนะ",
      width: 450,
      valueFormatter: (params) => params.value.Note,
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
        <Button 
          size="small"
          variant="contained"
          color="error"
          onClick={() => {
            localStorage.setItem("cc_id", row.ID);
          }}
          sx={{ borderRadius: 20, '&:hover': { color: '#FC0000', backgroundColor: '#F9EBEB' } }}
        >
          แก้ไข
        </Button>,
    },

    {
      field: "Delete",
      headerName: "Delete",
      sortable: true,
      width: 100,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }: Partial<GridRowParams>) =>
        <Button 
          size="small"
          variant="contained"
          color="error"
          onClick={() => {
            localStorage.setItem("cc_id", row.ID);
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
      </Container>
    </div>

  );
}

export default Carcarehis;