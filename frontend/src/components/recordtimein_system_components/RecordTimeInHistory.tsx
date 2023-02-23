import { Box, Button, CssBaseline, FormControl, Grid, IconButton, Paper, Select, SelectChangeEvent, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Link as RouterLink } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'

import './RecordTimeInCreate.css';
import { HttpClientServices } from '../../services/disinfection_system_services/HttpClientServices';
import { RecordTimeInInterface } from '../../models/recordtimein_system_models/recordtimein';
import RecordTimeInEdit from "./RecordTimeInEdit"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RecordTimeInUpdate from './RecordTimeInUpdate';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowParams } from '@mui/x-data-grid';
import moment from 'moment';
import DisinfectionDelete from '../disinfection_system_component/DisinfectionDelete';
import RecordTimeInDelete from './RecordTimeInDelete';
import { GetRecordTimeInByEmployee, ListRecordTimeIN, ListRecordtimeouts } from '../../services/recordtimein_system_services/HttpClientServices';


function RecordTimeInHistory() {

  const [recordtimein, setRecordtimein] = React.useState< RecordTimeInInterface[]>([])

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getRecordTimeIns = async () => {
    try {
      let res = await HttpClientServices.get("/driver/recordtimeins");
      setRecordtimein(res.data);
      // console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  //For Delete state 
  const [deleteID, setDeleteID] = React.useState<number>(0)

  // For Set dialog open
  const [openDelete, setOpenDelete] = React.useState(false);

  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [editID, setEditID] = React.useState(0);

  const columns: GridColDef[] = [
    {
      field: "ID",
      headerName: "ลำดับ",
      width: 80,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "RecordTimeOut.CaseID",
      headerName: "เคส",
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams<any>) => {
        return <>{params.row.RecordTimeOUT.ID}</>;
      },
    },
    {
      field: "Ambulance.Clp",
      headerName: "เลขทะเบียนรถ",
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams<any>) => {
        return <>{params.row.Ambulance.Clp}</>;
      },
    },
    {
      field: "Odo",
      headerName: "Odo Meter",
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams<any>) => {
        return <>{params.row.Odo}</>;
      },
    },
        {
      field: "TimeIn",
      headerName: "วัน เวลา ที่ทำ",
      width: 220,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams<any>) => {
        return (
          <>
            {`${moment(params.row.TimeIn).format(
              "DD/MM/YYYY"
            )}    ${moment(params.row.TimeIn).format(
              "HH:mm"
            )} น.`}
          </>
        );
      },
    },
    {
      field: "Note",
      headerName: "หมายเหตุ",
      width: 130,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams<any>) => {
        return <>{params.row.Note}</>;
      },
    },
    {
      field: "แก้ไขข้อมูล",
      align: "center",
      headerAlign: "center",
      width: 85,

      renderCell: ({ row }: Partial<GridRowParams>) =>
        <IconButton  component={RouterLink}
        to="/RecordTimeInUpdate"
            size="small"
            color="secondary"
            onClick={() => {
                console.log("ID", row.ID)
                localStorage.setItem("rid", row.ID);
            }}
        >
          <EditIcon />
        </IconButton >,
    },
    {
      field: "ลบ",
      align: "center",
      headerAlign: "center",
      width: 85,
      renderCell: (params: GridRenderCellParams<any>) => {
        return <RecordTimeInDelete params={params.row.ID} />;
      },
      sortable: false,
      description: "ลบ",
    },
  ];

  React.useEffect(() => {
    getRecordTimeIns();
  }, [])

  return (
    <div>
      <Container className="container" maxWidth="lg">
        <Paper
            className="paper"
            elevation={6}
            sx={{
              padding: 2.5,
              borderRadius: 3,
            }}
          >
            <Box display="flex">
              <Box flexGrow={1}>
                <Typography sx={{ fontWeight: "bold" }}
                variant="h5"
                color="primary">
                  ประวัติการบันทึกการใช้รถ ขา เข้าของพนักงาน
                </Typography>
              </Box>
              <Box>
                <Button
                  component={RouterLink}
                  to="/RecordTimeInCreate"
                  variant="contained"
                  color="primary"
                >
                  เพิ่มการบันทึก
                </Button>
              </Box>
            </Box>

            <div style={{ height: 400, maxWidth: "100%", marginTop: "20px" }}>
              <DataGrid
                rows={recordtimein}
                getRowId={(row) => row.ID}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </div>

        </Paper>
      </Container>

    </div>
  )
}

export default RecordTimeInHistory