import { Box, Button, Container, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react'
import { Link as RouterLink } from "react-router-dom";
import { ListAmbulances, GetAmbulanceByEmployee } from '../../services/ambulance_system_services/HttpClientService'
import { AmbulancesInterface } from '../../models/ambulance_system_models/ambulance';

function Ambulance() {


    const [ambulances, setAmbulances] = useState<AmbulancesInterface[]>([]);
    const getAmbulanceData = async () => {
        let res = await ListAmbulances();
        if (res) {
            setAmbulances(res);
            console.log(res);
        }
    };

    const [ambulanceByEmployee, setAmbulanceByEmployee] = useState<AmbulancesInterface[]>([]);
    const getAmbulanceDataByEmployee = async () => {
        let res = await GetAmbulanceByEmployee();
        if (res) {
            setAmbulanceByEmployee(res);
            console.log(res)
        }
    };


    const columns: GridColDef[] = [
        { field: "ID", headerName: "ไอดีรถ", width: 70 },
        { field: "Clp", headerName: "เลขทะเบียนรถ", width: 120, },
        { field: "CarBrand", headerName: "ยี่ห้อรถ", width: 90, },
        { field: "TypeAbl", headerName: "ประเภทรถ", width: 250, valueFormatter: (params) => params.value.Name, },
        { field: "Company", headerName: "ซื้อที่บริษัท", width: 150, valueFormatter: (params) => params.value.Name, },
        { field: "Date", headerName: "วันที่ซื้อ", width: 260, },
        {
            field: " ",
            headerName: "แก้ไข ",
            sortable: true,
            renderCell: ({ row }: Partial<GridRowParams>) =>
                <Button component={RouterLink}
                    to="/Ambulance/AmbulanceUpdate"
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={() => {
                        console.log("Employee", row.EmployeeID)
                        localStorage.setItem("aid", row.ID);
                    }}>
                    แก้ไข
                </Button>,
        },

    ];

    useEffect(() => {

        getAmbulanceData();
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
                    bgcolor: '#E3E3E3'
                }}>
                <Box
                    display="flex"
                    sx={{
                        marginTop: 2,
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
                        >
                            สร้างรายการจัดซื้อรถพยาบาล
                        </Button>
                    </Box>
                </Box>
                <div style={{ height: 400, marginTop: "20px", backgroundColor: "rgb(255, 255, 255)" }}>
                    <DataGrid
                        rows={ambulanceByEmployee}
                        getRowId={(row) => row.ID}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                        sx={{ textAlign: "center" }}
                    />
                </div>

            </Container>


        </div>
    )
}

export default Ambulance

