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

import { GetAmbulanceByEmployee, DeleteAmbulanceByID } from '../../services/ambulance_system_services/HttpClientService'
import { AmbulancesInterface } from '../../models/ambulance_system_models/ambulance';
import { convertType } from '../../services/utility';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Ambulance() {

    const getDeleteAmbulanceByID = async () => {
        let ad_id = convertType(localStorage.getItem("ad_id"))
        let res = await DeleteAmbulanceByID(ad_id);
        if (res) {
            console.log(res.data);
        } else {
            console.log(res.data);
        }
        getAmbulanceDataByEmployee();
    };

    const [ambulanceByEmployee, setAmbulanceByEmployee] = useState<AmbulancesInterface[]>([]);
    const getAmbulanceDataByEmployee = async () => {
        let res = await GetAmbulanceByEmployee();
        if (res) {
            setAmbulanceByEmployee(res);
        }
    };


    const columns: GridColDef[] = [
        { field: "Clp", headerName: "เลขทะเบียนรถ", width: 160, headerAlign: "center", align: "center" },
        { field: "CarBrand", headerName: "ยี่ห้อรถ", width: 130, headerAlign: "center", align: "center" },
        { field: "TypeAbl", headerName: "ประเภทรถ", width: 270, headerAlign: "center", align: "center", valueFormatter: (params) => params.value.Name, },
        { field: "Company", headerName: "ซื้อที่บริษัท", width: 150, headerAlign: "center", align: "center", valueFormatter: (params) => params.value.Name, },
        { field: "Date", headerName: "วันที่ซื้อ", width: 240, headerAlign: "center", align: "center", valueFormatter: (params) => moment(params?.value).format("DD/MM/YYYY hh:mm A") },
        {
            field: "Edit",
            headerName: "",
            sortable: true,
            width: 100,
            align: "center",
            headerAlign: "center",
            renderCell: ({ row }: Partial<GridRowParams>) =>
                <Button component={RouterLink}
                    to="/Ambulance/AmbulanceUpdate"
                    size="small"
                    variant="contained"
                    onClick={() => {
                        localStorage.setItem("aid", row.ID);
                        
                    }}
                    sx={{ backgroundColor: '#909497',borderRadius: 20, '&:hover': { color: '#909497', backgroundColor: '#E5E6EA' } }}
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
                        localStorage.setItem("ad_id", row.ID);
                        localStorage.setItem("clp", row.Clp);
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
        getDeleteAmbulanceByID();
        setOpen(false);

    }

    useEffect(() => {

        getAmbulanceDataByEmployee();

    }, []);

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
                            ข้อมูลรถพยาบาล
                        </Typography>
                    </Box>
                    <Box>
                        <Button
                            component={RouterLink}
                            to="/Ambulance/AmbulanceCreate"
                            variant="contained"
                            color="primary"
                            sx={{ borderRadius: 20, '&:hover': { color: '#065D95', backgroundColor: '#e3f2fd' } }}
                        >
                            เพิ่มรถพยาบาล
                        </Button>
                    </Box>
                </Box>
                <Box sx={{ borderRadius: 20 }}>
                    <DataGrid
                        rows={ambulanceByEmployee}
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
                    <DialogTitle>{`คุณต้องการลบข้อมูลรถพยาบาล เลขทะเบียน ${localStorage.getItem("clp")}  ใช่ไหม?`}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            หากคุณลบข้อมูลนี้แล้วนั้น คุณจะไม่สามารถกู้คืนได้อีก 
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button  color="error" sx={{ borderRadius: 20, '&:hover': { color: '#FC0000', backgroundColor: '#F9EBEB' } }} onClick={handleClose}>ยกเลิก</Button>
                        <Button sx={{ borderRadius: 20, '&:hover': { color: '#065D95', backgroundColor: '#e3f2fd' } }} onClick={handleDelete}>ยืนยัน</Button>
                    </DialogActions>
                </Dialog>

            </Container>


        </div>
    )
}

export default Ambulance

