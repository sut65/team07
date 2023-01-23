import { Box, Button, CssBaseline, FormControl, Grid, IconButton, Paper, Select, SelectChangeEvent, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Link as RouterLink } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'

import './RecordTimeInCreate.css';

import { RecordTimeInInterface } from '../../models/recordtimein_system_models/recordtimein';
import RecordTimeInEdit from "./RecordTimeInEdit"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RecordTimeInUpdate from './RecordTimeInUpdate';


function RecordTimeInHistory() {
    const [recordtimein, setRecordTimeIn] = React.useState<RecordTimeInInterface[]>(
      []
    );
  
    const getRecordTimeInHistory = async () => {
      const apiUrl = "http://localhost:8080/recordtimeins";
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      };
  
      fetch(apiUrl, requestOptions)
        .then((response) => response.json())
        .then((res) => {
          if (res.data) {
            setRecordTimeIn(res.data);
            console.log(res.data);
          } else {
            console.log("else");
          }
        });
    };
  
    useEffect(() => {
        getRecordTimeInHistory();
    }, []);
  
    const convertType = (d: Date) => {
      const date = new Date(d);
      const d1 = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}น.`;
      return d1;
    };
  
    <h1>Patient</h1>;
  
    return (
      <Container className="container" sx={{ minWidth: 1650}}>
        <Box display="flex">
          <Box flexGrow={1}>
              <br></br>
              <Typography component="h1" variant="h5" color="primary" gutterBottom>
                          ประวัติการบันทึกการใช้รถขาเข้าของพนักงานขับรถ
              </Typography>
          </Box>
          <Box><br></br>
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
                <br></br>
                <TableContainer component={Paper}>
                    <Table  size="small" aria-label="a dense table">
                        <TableHead style={{  color: "#F4F6F6" }}>
                            <TableRow>
                                <TableCell align="center" width={'5%'}>ID</TableCell>
                                <TableCell align="center" width={'30%'}>เหตุฉุกเฉิน</TableCell>
                                <TableCell align="center" width={'10%'}>รถพยาบาล</TableCell>
                                <TableCell align="center" width={'10%'}>เวลา</TableCell>
                                <TableCell align="center" width={'10%'}>ODO Meter</TableCell>
                                <TableCell align="center" width={'10%'}>พนักงานขับรถ</TableCell>
                                <TableCell align="center" width={'15%'}>หมายเหตุ</TableCell>
                                <TableCell align="center" width={'10%'}>จัดการข้อมูล</TableCell>
                            </TableRow>
                        </TableHead>

                <TableBody>
                  {recordtimein.map((recordtimeins: RecordTimeInInterface) => (
                      <TableRow key={recordtimeins.ID}>
                        <TableCell align="center">{recordtimeins.ID}</TableCell>
                        <TableCell align="center">{recordtimeins.ID}</TableCell>
                        <TableCell align="center">{recordtimeins.Ambulance?.CarBrand}</TableCell>
                        <TableCell align="center">{recordtimeins.Ambulance?.CarBrand}</TableCell>
                        <TableCell align="center">{recordtimeins.Odo}</TableCell>
                        <TableCell align="center">{recordtimeins.Odo}</TableCell>
                        <TableCell align="center">{recordtimeins.Ambulance?.CarBrand}</TableCell>
                        <TableCell align="center"> 
                          <Box display="inline-flex">
                            <Box>
                            <IconButton aria-label="edit" component={RouterLink}to="/RecordTimeInUpdate"><EditIcon /></IconButton>
                            </Box>
                            <Box>
                            <IconButton aria-label="delete">
                                <DeleteIcon />
                            </IconButton> 
                            </Box>
                          </Box>  
                        </TableCell>
                      </TableRow>
                    ))}

                    {/* {recordtimein.map((recordtimeins: RecordTimeInInterface) => (
                    <TableRow key={recordtimeins.ID}>
                        <TableCell component="th" scope="row" align="center">
                        {recordtimeins.ID}
                        </TableCell>
                        <TableCell align="center">
                        {recordtimeins.Ambulance.CarBrand}
                        </TableCell>
                        <TableCell align="center">
                        {recordtimeins.Ambulance.CarBrand}&nbsp;
                        {recordtimeins.Ambulance.CarBrand}
                        </TableCell>

                        <TableCell align="center">{recordtimeins.Odo}</TableCell>

                        <TableCell align="center">
                        {recordtimeins.Employee?.Name}
                        </TableCell>
                        <TableCell align="center">
                        {convertType(recordtimeins.TimeIn)}
                        </TableCell>
                    </TableRow>
                    ))} */}
                </TableBody>
          </Table>
        </TableContainer>
      </Container>
    );
  }
  
  export default RecordTimeInHistory;
// export const RecordTimeInHistory = () => {

//     count [recordtimein, setRecordTimeIn] = useState<RecordTimeInInterface[]>;

//     const apiUrl = "http://localhost:8080";
//     const requestOptions = {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//         "Content-Type": "application/json",
//       },
//     };
  
//     const getRecordTimeIn = async () => {
//       fetch(`${apiUrl}/recordtimein`, requestOptions)
//         .then((response) => response.json())
//         .then((res) => {
//           console.log(res.data);
//           if (res.data) {
//             setRecordTimeIn(res.data);
//           } else {
//             console.log("else");
//           }
//         });
//     };
  
//     useEffect(() => {
//         getRecordTimeIn();
//     }, []);
    
    
//     function convertType(Case_Time: any): React.ReactNode {
//         throw new Error('Function not implemented.');
//     }

//     return (
//         <div>
//              <Container className="container" maxWidth="lg">

//                 <Box display="flex">
//                     <Box flexGrow={1}>
//                         <br></br>
//                         <Typography component="h1" variant="h5" color="primary" gutterBottom>
//                                     ประวัติการบันทึกการใช้รถขาเข้าของพนักงานขับรถ
//                         </Typography>
//                     </Box>
//                     <Box><br></br>
//                         <Button
//                         component={RouterLink}
//                         to="/RecordTimeInCreate"
//                         variant="contained"
//                         color="primary"
//                         >
//                         เพิ่มการบันทึก
//                         </Button>
//                     </Box>
//                     <Box><br></br>
//                         <Button
//                         component={RouterLink}
//                         to="/RecordTimeInEdit"
//                         variant="contained"
//                         color="primary"
//                         >
//                         ข้อมูลเพิ่มเติม
//                         </Button>
//                     </Box>
//                 </Box>
//                 <br></br>
//                 <TableContainer component={Paper}>
//                     <Table sx={{ minWidth: 800}} size="small" aria-label="a dense table">
//                         <TableHead style={{  color: "#F4F6F6" }}>
//                             <TableRow>
//                                 <TableCell align="center">ID</TableCell>
//                                 <TableCell align="center">เหตุฉุกเฉิน</TableCell>
//                                 <TableCell align="center">รถพยาบาล</TableCell>
//                                 <TableCell align="center">เวลา</TableCell>
//                                 <TableCell align="center">ODO Meter</TableCell>
//                                 <TableCell align="center">พนักงานขับรถ</TableCell>
//                                 <TableCell align="center">หมายเหตุ</TableCell>
//                                 <TableCell align="center">จัดการข้อมูล</TableCell>
//                             </TableRow>
//                         </TableHead>

//                     <TableBody>
//                         {recordtimein.map((recordtimeins: RecordTimeInInterface) => (
//                         <TableRow key={recordtimeins.ID}>
//                             <TableCell component="th" scope="row" align="center">
//                             {recordtimeins.ID}
//                             </TableCell>
//                             <TableCell align="center">
//                             {recordtimeins.Ambulance.CarBrand}
//                             </TableCell>
//                             <TableCell align="center">
//                             {recordtimeins.Ambulance.CarBrand}&nbsp;
//                             {recordtimeins.Ambulance.CarBrand}
//                             </TableCell>

//                             <TableCell align="center">{recordtimeins.Odo}</TableCell>

//                             <TableCell align="center">
//                             {recordtimeins.Employee?.Name}
//                             </TableCell>
//                             <TableCell align="center">
//                             {convertType(recordtimeins.Note)}
//                             </TableCell>
//                         </TableRow>
//                         ))}
//                     </TableBody>
//                     </Table>
//                 </TableContainer>

//         </Container>

//         </div>
//     )
// }

// export default RecordTimeInHistory
