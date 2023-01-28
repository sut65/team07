import * as React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react'
import { Link as RouterLink } from "react-router-dom";
import moment from 'moment';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

import { GetAmbulanceUseByEmployee, DeleteAmbulanceUseByID } from '../../services/ambulanceUse_system_services/HttpClientService';
import { AmbulanceUseInterface } from '../../models/ambulanceUse_system_models/ambulanceUse';
import { convertType } from '../../services/utility';


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function AmbulanceUse() {

    const getDeleteAmbulanceUseByID = async () => {
        let ad_id = convertType(localStorage.getItem("au_id"))
        let res = await DeleteAmbulanceUseByID(ad_id);
        if (res) {
            console.log(res.data);
        } else {
            console.log(res.data);
        }
        getAmbulanceUseByEmployee();
    };

    const [ambulanceUseByEmployee, setAmbulanceUseByEmployee] = useState<AmbulanceUseInterface[]>([]);
    const getAmbulanceUseByEmployee = async () => {
        let res = await GetAmbulanceUseByEmployee();
        if (res) {
            console.log(res)
            setAmbulanceUseByEmployee(res);
        }
    };

    useEffect(() => {

        getAmbulanceUseByEmployee();

    }, []);

    const columns: GridColDef[] = [
        { field: "ID", headerName: "ไอดียา", width: 150, headerAlign: "center", align: "center" },
        { field: "Medicine", headerName: "ยาที่ใช้", width: 240, headerAlign: "center", align: "center", valueFormatter: (params) => params.value.MedicineName },
        { field: "Amount", headerName: "จำนวน", width: 120, headerAlign: "center", align: "center" },
        { field: "Ambulance", headerName: "เลขทะเบียนรถ", width: 200, headerAlign: "center", align: "center", valueFormatter: (params) => params.value.Clp },
        { field: "Date", headerName: "วันที่ใช้ยา", width: 240, headerAlign: "center", align: "center", valueFormatter: (params) => moment(params?.value).format("DD/MM/YYYY hh:mm A") },
        {
            field: "Edit",
            headerName: " ",
            sortable: true,
            width: 100,
            align: "center",
            headerAlign: "center",
            renderCell: ({ row }: Partial<GridRowParams>) =>
                <Button
                    component={RouterLink}
                    to="/AmbulanceUse/AmbulanceUseUpdate"
                    size="small"
                    variant="contained"
                    onClick={() => {
                        localStorage.setItem("au_id", row.ID);
                        localStorage.setItem("mid", row.MedicineID);
                    }}
                    sx={{ backgroundColor: '#909497', borderRadius: 20, '&:hover': { color: '#909497', backgroundColor: '#E5E6EA' } }}
                >
                    แก้ไข
                </Button>,
        },
        {
            field: "Delete", headerName: "", width: 100, align: "center", headerAlign: "center",
            renderCell: ({ row }: Partial<GridRowParams>) =>
                <Button
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={() => {
                        localStorage.setItem("au_id", row.ID);
                        handleClickOpen();

                    }}
                    sx={{ borderRadius: 20, '&:hover': { color: '#FC0000', backgroundColor: '#F9EBEB' } }}
                >
                    ลบ
                </Button>,
        }

    ];

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        getDeleteAmbulanceUseByID();
        setOpen(false);

    }

    return (
        <div>
            <Container maxWidth="lg"
                sx={{
                    mt: 5,
                    mb: 2,
                    p: 2,
                    boxShadow: 3,
                    bgcolor: '#F1F6F5',
                    borderRadius: 3
                }}
                disableGutters={true}
            >
                <Box
                    display="flex"
                    sx={{
                        marginTop: 0.5,
                    }}
                >
                    <Box flexGrow={1}>
                        <Typography
                            component="h2"
                            variant="h5"
                            color="primary"
                            sx={{ fontWeight: 'bold' }}
                            gutterBottom
                        >
                            ข้อมูลรายการใช้ยาบนรถพยาบาล
                        </Typography>
                    </Box>
                    <Box>
                        <Button
                            component={RouterLink}
                            to="/AmbulanceUSe/AmbulanceUseCreate"
                            variant="contained"
                            color="primary"
                            sx={{ borderRadius: 20, '&:hover': { color: '#065D95', backgroundColor: '#e3f2fd' } }}
                        >
                            เพิ่มข้อมูล
                        </Button>
                    </Box>
                </Box>
                <Box sx={{ borderRadius: 20 }}>
                    <DataGrid
                        rows={ambulanceUseByEmployee}
                        getRowId={(row) => row.ID}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        autoHeight={true}
                        density={'comfortable'}
                        sx={{ mt: 2, backgroundColor: '#fff' }}
                    />
                </Box>

                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{`คุณต้องการลบข้อมูลยาที่ใช้ ID ${localStorage.getItem("mid")}  ใช่ไหม?`}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            หากคุณลบข้อมูลนี้แล้วนั้น คุณจะไม่สามารถกู้คืนได้อีก
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color="error" sx={{ borderRadius: 20, '&:hover': { color: '#FC0000', backgroundColor: '#F9EBEB' } }} onClick={handleClose}>ยกเลิก</Button>
                        <Button sx={{ borderRadius: 20, '&:hover': { color: '#065D95', backgroundColor: '#e3f2fd' } }} onClick={handleDelete}>ยืนยัน</Button>
                    </DialogActions>
                </Dialog>

            </Container>
        </div>
    )
}

export default AmbulanceUse