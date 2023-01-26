import { Box, Button, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import React from 'react'
import { Link as RouterLink } from "react-router-dom";
import { AmbulancesInterface } from '../../models/ambulance_system_models/ambulance';
import { ListAmbulances } from '../../services/ambulance_system_services/HttpClientService';
// import styles
import "./styles.css"





export default function AmbulanceStoreHome() {

  // Ambulance Selection State
  const [ambulance, setAmbulance] = React.useState<AmbulancesInterface[]>([]);


  const getAmbulance = async () => {
    let res = await ListAmbulances();
    if (res) {
      console.log(res)
      setAmbulance(res)
    }
  }

  React.useEffect(() => {
    getAmbulance();
  }, [])



  return (
    <div className='container-background'>
      <Container maxWidth="lg">
        <Paper sx={{ p: 4 }}>
          <Grid container spacing={3} sx={{ alignItems: "center", }}>
            <Grid item xs={12}>
              <Typography
                component="h2"
                variant='h5'
                gutterBottom
                color="#233333"
              >ข้อมูลยาบนรถพยาบาล</Typography>
            </Grid>

            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
              <Typography
                component="h2"
                variant='subtitle1'
                gutterBottom
                color="#233333">
                เลือกรถพยาบาลที่ต้องการจัดการ
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <hr />
            </Grid>

            <Grid item xs={12}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>เลขทะเบียน</TableCell>
                      <TableCell>รุ่น</TableCell>
                      <TableCell>ประเภทของรถพยาบาล</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>

                  {/* Body */}
                  <TableBody>
                    {
                      ambulance.map((item) => (
                        <TableRow
                          key={item.ID}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell>
                            <Typography
                              component="h2"
                              gutterBottom
                              color="#233333"
                            >{item.Clp}
                            </Typography>
                          </TableCell>
                          <TableCell>{item.CarBrand}</TableCell>
                          <TableCell>{item.TypeAbl?.Name}</TableCell>
                          <TableCell>
                            <Button
                              color='primary'
                              component={RouterLink}
                              to={"/ambulance-store/" + item.ID}
                            >
                              จัดการยา
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

          </Grid>


        </Paper>
      </Container>
    </div >
  )
}
