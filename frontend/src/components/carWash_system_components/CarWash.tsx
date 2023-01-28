import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import { CarWashsInterface } from '../../models/carWash_system_models/carWash'
import { Role } from '../../models/role'
import { DeleteCarWash, ListCarWashs } from '../../services/carWash_system_services/HttpClientService'
import { Link as RouterLink } from "react-router-dom";



import CarWashUpdate from './CarWashUpdate'
import { GetAmbulanceByID } from '../../services/ambulance_system_services/HttpClientService'

export default function CarWashList() {

    //CarWash State
    const [carWash, setCarWash] = React.useState<CarWashsInterface[]>([])
    const GetCarWashByEmployee = async () => {
        let res = await ListCarWashs();
        if (res) {
            setCarWash(res)
            //debug
            console.log(res)
        }
    }



    //For Delete state 
    const [deleteID, setDeleteID] = React.useState<number>(0)

    // For Set dialog open
    const [openDelete, setOpenDelete] = React.useState(false);

    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [editID, setEditID] = React.useState(0);



    React.useEffect(() => {
        GetCarWashByEmployee();
        GetAmbulanceByID();

    }, [])


    const convertDateFormat = (date: Date | null | any) => {
        const newDate = new Date(date)
        return `${newDate.getDate()} / ${newDate.getMonth() + 1} / ${newDate.getFullYear()} | ${newDate.getHours()} : ${newDate.getMinutes()}`
    }



    const handleDialogDeleteOpen = (ID: number | any) => {
        localStorage.setItem("cid", ID)
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
        let res = await DeleteCarWash(deleteID)
        if (res) {
            console.log(res.data)
        } else {
            console.log(res.data)
        }
        GetCarWashByEmployee();
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

    // const debughandle = () => {
    //     console.log(deleteID)
    // }

    return (
        <Container maxWidth="lg">
            <Grid container spacing={3} >
                <Grid item xs={10} >
                    <Typography
                        component="h3"
                        variant="h5"
                        color="text"
                        gutterBottom
                    >
                        ข้อมูลการล้างรถ
                    </Typography>
                </Grid>
                <Grid item xs={2} >
                    <Button
                        variant='contained'
                        color='primary'
                        component={RouterLink}
                        to="/CarWash/CarWashCreate"
                    >
                        เพิ่มข้อมูลการล้างรถ
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>เลขทะเบียนรถ</TableCell>
                                    <TableCell>สถานะ</TableCell>
                                    <TableCell>ชื่อบริษัท</TableCell> {/* Role Get From Searching*/}
                                    <TableCell>เบอร์โทรบริษัท</TableCell>
                                    <TableCell>เลขใบเสร็จ</TableCell>
                                    <TableCell>ค่าบริการ</TableCell>
                                    <TableCell>เวลา</TableCell>
                                    <TableCell>แก้ไข</TableCell>
                                    <TableCell>ลบ</TableCell>
                                </TableRow>
                            </TableHead>

                            {/* Body */}
                            <TableBody>
                                {
                                    carWash.map((item) => (
                                        <TableRow
                                            key={item.ID}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        ><TableCell>{item.Ambulance?.Clp}</TableCell>
                                            <TableCell>{item.StatusAm?.Status}</TableCell>
                                            <TableCell>{item.ComName}</TableCell>
                                            <TableCell>{item.ComTel}</TableCell>
                                            <TableCell>{item.ReceiptNum}</TableCell>
                                            <TableCell>{item.SerFees}</TableCell>
                                            <TableCell>{convertDateFormat(item.Date)}</TableCell>
                                            <TableCell>
                                                {
                                                    <Button
                                                        variant='outlined'
                                                        color='warning'
                                                        component={RouterLink}
                                                        to={"/CarWash/CarWashUpdate"}
                                                        onClick={() => { handleDialogDeleteOpen(item.ID) }}
                                            
                                                    >
                                                        Update
                                                    </Button>

                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    <Button variant='outlined' color='error' onClick={() => { handleDialogDeleteOpen(item.ID) }}>Delete</Button>
                                                }
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                {/* <Grid item xs={6}>
                    Test
                </Grid> */}
            </Grid>
            <Dialog
                open={openDelete}
                onClose={handleDialogDeleteclose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`คุณต้องการลบข้อมูลของที่จอดรถ ${carWash.filter((c) => (c.ID === deleteID)).at(0)?.StatusAm?.Status} จริงหรือไม่`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        หากคุณลบข้อมูลนี้แล้วนั้น คุณจะไม่สามารถกู้คืนได้อีก คุณต้องการลบข้อมูลนี้ใช่หรือไม่
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogDeleteclose}>ยกเลิก</Button>
                    <Button onClick={handleDelete} className="bg-red" autoFocus>
                        ยืนยัน
                    </Button>
                </DialogActions>

            </Dialog>

            {/* <CarWashUpdate openUpdate={openUpdate} handleDialogUpdateclose={handleDialogUpdateclose} id={editID}/> */}

            {/* <Button onClick={debughandle}>Test</Button> */}
        </Container>


    )
}
