import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Table, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import React from 'react'
import { useParams } from 'react-router-dom'
import { AmbulanceStoreInterface } from '../../models/ambulanceStoreModels/IAmbulanceStore'
import { AmbulancesInterface } from '../../models/ambulance_system_models/ambulance'
import { DeleteAmbulanceByID, GetAmbulanceWithID, ListAmbulanceStores } from '../../services/ambulanceStoreSystemServices/AmbulanceStoreHttpClientServices'
import { Link as RouterLink } from "react-router-dom";


// added styles
import "./styles.css"

export default function AmbulanceStoreManage() {

    let { id } = useParams()


    //For Delete state 
    const [deleteID, setDeleteID] = React.useState<number>(0)

    // For Set dialog open
    const [openDelete, setOpenDelete] = React.useState(false);

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

    // Get a Ambulance Store form database to state
    const [ambMed, setAmbMed] = React.useState<AmbulanceStoreInterface[]>([])

    // Get data to state
    const getAmbulanceStores = async () => {
        let res = await ListAmbulanceStores()
        if (res.data) {
            setAmbMed(res.data)
        }
    }
    const convertDateFormat = (date: Date) => {
        const newDate = new Date(date)
        return `${newDate.getDate()} / ${newDate.getMonth() + 1} / ${newDate.getFullYear()}   ${newDate.getHours()} : ${newDate.getMinutes()} น.`
    }


    // Get Ambulance form database and save to state
    const [ambulance, setAmbulance] = React.useState<AmbulancesInterface>()

    // Get data to state
    const getAmbulance = async () => {
        let res = await GetAmbulanceWithID(id)
        if (res) {

            setAmbulance(res)
        }
    }

    React.useEffect(() => {
        getAmbulanceStores()
        getAmbulance()
    }, [])

    const handleDelete = async () => {
        let res = await DeleteAmbulanceByID(deleteID)
        if(res){
            console.log(res.data)
        }else{
            console.log(res.error)
        }
        getAmbulanceStores()
        setOpenDelete(false)
    }


    const submit = () => {
        console.log(ambMed)
    }

    return (
        <Container maxWidth="lg">
            <Paper sx={{ p: 4 }}>
                <Grid container spacing={3} >
                    <Grid item xs={12}>
                        <Typography
                            component="h2"
                            variant='h5'
                            gutterBottom
                            color="#233333"
                        >ข้อมูลยาบนรถพยาบาลหมายเลขทะเบียน <span className='clp-color'>{ambulance?.Clp}</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ display: "flex" }}>
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
                                        <TableCell>ชื่อยา</TableCell>
                                        <TableCell>จำนวนที่เหลือ</TableCell>
                                        <TableCell>ผู้เพิ่มข้อมูล</TableCell>
                                        <TableCell>วันเพิ่มข้อมูล</TableCell>
                                        <TableCell>แก้ไขข้อมูล</TableCell>
                                        <TableCell>ลบข้อมูล</TableCell>
                                    </TableRow>
                                </TableHead>

                                {/* Body */}
                                <TableBody>
                                    {
                                        ambMed.filter((amb) => {
                                            return String(amb.AmbulanceID) === id
                                        }).map((item) => (
                                            <TableRow
                                                key={item.ID}>
                                                <TableCell>
                                                    {item.Medicine.MedicineName}
                                                </TableCell>
                                                <TableCell>
                                                    {item.Amount} {item.Medicine.MeasureUnit}
                                                </TableCell>
                                                <TableCell>
                                                    {item.Employee.Name} &nbsp;{item.Employee.Surname}
                                                </TableCell>
                                                <TableCell>
                                                    {convertDateFormat(item.Date)}
                                                </TableCell>
                                                <TableCell>
                                                    {/* ไว้ใส่ปุ่มแก้ไขข้อมูล */}
                                                    <Button
                                                        variant='outlined'
                                                        color="primary"
                                                        component={RouterLink}
                                                        to={"/ambulance-store/update/" + item.ID}
                                                    >
                                                        แก้ไขข้อมูล
                                                    </Button>
                                                </TableCell>

                                                <TableCell>
                                                    {/* ไว้ใส่ปุ่มลบข้อมูล */}
                                                    <Button variant='outlined' color='error' onClick={() => { handleDialogDeleteOpen(item.ID) }}>Delete</Button>

                                                </TableCell>

                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={12}>
                        <hr />
                    </Grid>
                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-around",  }}>
                    <Button
                            variant='outlined'
                            color='secondary'
                            component={RouterLink}
                            to={"/ambulance-store/"}
                        >
                            กลับเข้าสู่หน้าเลือกรถพยาบาล
                        </Button>
                        <Button
                            variant='contained'
                            color='primary'
                            component={RouterLink}
                            to={"/ambulance-store/create/" + id}
                        >
                            เบิกยาเข้าสู่รถพยาบาล
                        </Button>
                    </Grid>
                </Grid>
            </Paper>


            <Dialog
                open={openDelete}
                onClose={handleDialogDeleteclose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`คุณต้องการลบข้อมูลของการเบิกยา ${ambMed.filter((item) => (item.ID === deleteID)).at(0)?.Medicine.MedicineName} จริงหรือไม่`}
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
        </Container>
    )
}
