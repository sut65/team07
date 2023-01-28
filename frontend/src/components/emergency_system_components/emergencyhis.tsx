import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";

import { GetEmercaseBySID } from "../../services/emergency_system_service/HttpClientServices";
import { CaseInterface } from "../recordtimeout_system_components/RecordTimeOutCreate";

function Case() {
  const [cases, setCases] = useState<CaseInterface[]>([]);

  const getCaseBySiD = async () => {
    let res = await GetEmercaseBySID();
    if (res) {
      setCases(res);
    }
  };

  useEffect(() => {

    getCaseBySiD();

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
      valueFormatter: (params) => params.value.Name,
      headerAlign: "center",
    },

    {
      field: "Patient",
      headerName: "ชื่อผู้ประสบเหตุ",
      width: 250,
      valueFormatter: (params) => params.value.ReasonInfo,
      headerAlign: "center",
    },

    {
      field: "Age",
      headerName: "อายุ",
      width: 50,
      valueFormatter: (params) => params.value.ReasonInfo,
      headerAlign: "center",
    },

    {
      field: "Gender",
      headerName: "เพศ",
      width: 60,
      valueFormatter: (params) => params.value.ReasonInfo,
      headerAlign: "center",
    },

    {
      field: "Status",
      headerName: "อาการโดยรวม",
      width: 250,
      valueFormatter: (params) => params.value.ReasonInfo,
      headerAlign: "center",
    },

    {
      field: "Scholarship",
      headerName: "ผู้รับเเจ้ง",
      width: 150,
      valueFormatter: (params) => params.value.ScholarName,
      headerAlign: "center",
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
          to="/Ambulance/AmbulanceUpdate"
          size="small"
          variant="contained"
          color="error"
          onClick={() => {
            localStorage.setItem("aid", row.ID);
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
        <Button component={RouterLink}
          to="/Ambulance/AmbulanceUpdate"
          size="small"
          variant="contained"
          color="error"
          onClick={() => {
            localStorage.setItem("aid", row.ID);
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

export default Case;