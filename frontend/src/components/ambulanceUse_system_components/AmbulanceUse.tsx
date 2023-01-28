import { Box, Button, Container, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react'
import { Link as RouterLink } from "react-router-dom";
import { GetAmbulanceUseByEmployee } from '../../services/ambulanceUse_system_services/HttpClientService';
import { AmbulanceUseInterface } from '../../models/ambulanceUse_system_models/ambulanceUse';
import moment from 'moment';

function AmbulanceUse() {

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
        { field: "Medicine", headerName: "ยาที่ใช้", width: 170, headerAlign: "center", align: "center", valueFormatter: (params) => params.value.MedicineName },
        { field: "Amount", headerName: "จำนวน", width: 120, headerAlign: "center", align: "center" },
        { field: "Ambulance", headerName: "เลขทะเบียนรถ", width: 240, headerAlign: "center", align: "center", valueFormatter: (params) => params.value.Clp },
        { field: "Date", headerName: "วันที่ใช้ยา", width: 240, headerAlign: "center", align: "center",valueFormatter: (params) => moment(params?.value).format("DD/MM/YYYY hh:mm A") },
        {
            field: " ",
            headerName: " ",
            sortable: true,
            width: 240,
            align: "center",
            headerAlign: "center",
            renderCell: ({ row }: Partial<GridRowParams>) =>
                <Button
                    component={RouterLink}
                    to="/AmbulanceUse/AmbulanceUseUpdate"
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={() => {
                        localStorage.setItem("au_id", row.ID);
                        localStorage.setItem("mid", row.MedicineID);
                    }}
                    sx={{ borderRadius: 20, '&:hover': { color: '#FC0000', backgroundColor: '#F9EBEB' } }}
                >
                    แก้ไข
                </Button>,
        },

    ];

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
                            sx={{ borderRadius: 20, '&:hover': { color: '#1543EE', backgroundColor: '#e3f2fd' } }}
                        >
                            สร้างรายการ
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

            </Container>
        </div>
    )
}

export default AmbulanceUse