import { Box, Button, Container, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react'
import { Link as RouterLink } from "react-router-dom";
import { ListAmbulances } from '../../services/ambulance_system_services/HttpClientService'
import { AmbulancesInterface } from '../../models/ambulance_system_models/ambulance';

function Ambulance() {


    const [ambulances, setAmbulances] = useState<AmbulancesInterface[]>([])
    const getAmbulanceData = async () => {
        let res = await ListAmbulances();
        if (res) {
            setAmbulances(res);
            console.log(res)
        }
    };


    const columns: GridColDef[] = [
        { field: "ID", headerName: "ไอดีรถ", width: 50 },
        { field: "Clp", headerName: "เลขทะเบียนรถ", width: 120, },   
        { field: "CarBrand", headerName: "ยี่ห้อรถ", width: 100, },
        { field: "TypeAbl", headerName: "ประเภทรถ", width: 250,valueFormatter: (params) => params.value.Name,},
        { field: "Company", headerName: "ซื้อที่บริษัท", width: 120,valueFormatter: (params) => params.value.Name, },
        { field: "Date", headerName: "วันที่ซื้อ", width: 200, },
    ];

    useEffect(() => {

        getAmbulanceData();

    }, []);

    return (
        <div>

            <Container maxWidth="md"
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
                            gutterBottom
                        >
                            ข้อมูลรายการรถพยาบาล
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
                <div style={{ height: 400,  marginTop: "20px", backgroundColor: "rgb(255, 255, 255)" }}>
                    <DataGrid
                        rows={ambulances}
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

export default Ambulance