import { Autocomplete, Box, Button, Container, Typography } from '@mui/material';
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
        { field: "ID", headerName: "ไอดีรถ", width: 100, headerAlign: "center", align:"center" },
        { field: "Clp", headerName: "เลขทะเบียนรถ", width: 160, headerAlign: "center", align:"center" },
        { field: "CarBrand", headerName: "ยี่ห้อรถ", width: 120, headerAlign: "center", align:"center" },
        { field: "TypeAbl", headerName: "ประเภทรถ", width: 270, headerAlign: "center", align:"center", valueFormatter: (params) => params.value.Name, },
        { field: "Company", headerName: "ซื้อที่บริษัท", width: 150, headerAlign: "center", align:"center", valueFormatter: (params) => params.value.Name, },
        { field: "Date", headerName: "วันที่ซื้อ", width: 240, headerAlign: "center", align:"center" },
        {
            field: " ",
            headerName: " ",
            sortable: true,
            width: 100,
            align:"center",
            headerAlign: "center",
            renderCell: ({ row }: Partial<GridRowParams>) =>
                <Button component={RouterLink}
                    to="/Ambulance/AmbulanceUpdate"
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={() => {
                        console.log("Employee", row.EmployeeID)
                        localStorage.setItem("aid", row.ID);
                    }}
                    sx={{borderRadius: 2.5,'&:hover': {color: '#d32f2f', backgroundColor: '#fbbdbd'}}}
                >
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
                            sx = {{borderRadius: 2,'&:hover': {color: '#42a5f5', backgroundColor: '#e3f2fd'}}}
                        >
                            สร้างรายการ
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
                        sx={{mt: 2, backgroundColor: '#fff'}}                                                   
                    />
                </Box>

            </Container>


        </div>
    )
}

export default Ambulance

