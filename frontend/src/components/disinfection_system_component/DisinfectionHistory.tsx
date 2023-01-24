import { SelectChangeEvent, Container, Box, Typography, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { AmbulancesInterface } from '../../models/ambulance_system_models/ambulance';
import { TypeAblsInterface } from '../../models/ambulance_system_models/typeAbl';
import { ListTypeAbls, CreatAmbulances } from '../../services/ambulance_system_services/HttpClientService';
import { Link as RouterLink } from "react-router-dom";
import { DisinfectionInterface } from '../../models/disinfection_system_models/disinfection';
import { Role } from '../../models/role';
import { ListEmployees, ListRoles, DeleteEmployee } from '../../services/employeeSystemServices/EmployeeHttpClient';
import { HttpClientServices } from '../../services/disinfection_system_services/HttpClientServices';
import { format } from 'date-fns';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import moment from 'moment';
import RecordTimeOutDelete from '../recordtimeout_system_components/RecordTimeOutDelete';
import RecordTimeOutUpdate from '../recordtimeout_system_components/RecordTimeOutUpdate';
import DisinfectionDelete from './DisinfectionDelete';

function DisinfectionHistory() {

    const [disinfection, setDisinfection] = React.useState<DisinfectionInterface[]>([])
    
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  
    const getDisinfections = async () => {
      try {
        let res = await HttpClientServices.get("/disinfections");
        setDisinfection(res.data);
        console.log(res.data);
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
            headerName: "#",
            width: 80,
            align: "center",
            headerAlign: "center",
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
            field: "Disinfectant.Type",
            headerName: "ประเถทน้ำยาฆ่าเชื้อ",
            width: 180,
            align: "center",
            headerAlign: "center",
            renderCell: (params: GridRenderCellParams<any>) => {
                return <>{params.row.Disinfactant.Type}</>;
            },
        },
        {
          field: "AmountDisinfectant",
          headerName: "น้ำยาฆ่าเชื้อที่ใช้(ml)",
          width: 150,
          align: "center",
          headerAlign: "center",
          renderCell: (params: GridRenderCellParams<any>) => {
            return <>{params.row.AmountDisinfectant}</>;
          },
        },
        {
          field: "WorkTime",
          headerName: "วัน เวลา ที่ทำ",
          width: 220,
          align: "center",
          headerAlign: "center",
          renderCell: (params: GridRenderCellParams<any>) => {
            return (
              <>
                {`${moment(params.row.WorkTime).format(
                  "DD/MM/YYYY"
                )}    ${moment(params.row.WorkTime).format(
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
          renderCell: (params: GridRenderCellParams<any>) => {
            return <RecordTimeOutUpdate params={params.row} />;
          },
          sortable: false,
          description: "ดูเพิ่มเติม",
        },
        {
          field: "ลบ",
          align: "center",
          headerAlign: "center",
          width: 85,
          renderCell: (params: GridRenderCellParams<any>) => {
            return <DisinfectionDelete params={params.row.ID} />;
          },
          sortable: false,
          description: "ลบ",
        },
      ];

    React.useEffect(() => {
        getDisinfections();
    }, [])

    const convertDateFormat = (date: Date) => {
        const newDate = new Date(date)
        return `${newDate.getDate()} / ${newDate.getMonth() + 1} / ${newDate.getFullYear()} | ${newDate.getHours()} : ${newDate.getMinutes()}`
    }

    const handleDialogDeleteOpen = (ID: number) => {
        setDeleteID(ID)
        setOpenDelete(true)
    }

    const handleDialogDeleteclose = () => {
        setOpenDelete(false)
        setTimeout(() => {
            setDeleteID(0)
        }, 500)
    }

    const handleDelete = async () => {
        let res = await DeleteEmployee(deleteID)
        if (res) {
            console.log(res.data)
        } else {
            console.log(res.data)
        }
        getDisinfections();
        setOpenDelete(false)
    }

    const handleDialogUpdateclose = async () => {
        setOpenUpdate(false)
        setTimeout(() => {
            setEditID(0)
        }, 500)
    }

    const handleDialogUpdateOpen = async (ID: number) => {
        setEditID(ID)
        setOpenUpdate(true)
    }



    return (
        <div>
             <Container className="container" maxWidth="lg">

                <Box display="flex">
                    <Box flexGrow={1}>
                        <br></br>
                        <Typography component="h1" variant="h5" color="primary" gutterBottom>
                            ประวัติการบันทึกการฆ่าเชื้อรถพยาบาล
                        </Typography>
                    </Box>
                    <Box><br></br>
                        <Button
                        component={RouterLink}
                        to="/DisinfectionCreate"
                        variant="contained"
                        color="primary"
                        >
                        เพิ่มการบันทึก
                        </Button>
                    </Box>
                </Box>

                <div style={{ height: 400, maxWidth: "100%", marginTop: "20px" }}>
                    <DataGrid
                        rows={disinfection}
                        getRowId={(row) => row.ID}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                </div>

                
        </Container>

        </div>
    )
}

export default DisinfectionHistory