import { Alert, Button, FormControl, Grid, Paper, Select, Snackbar, TextField, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React from 'react'
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom'
import { AmbulanceStoreInterface } from '../../models/ambulanceStoreModels/IAmbulanceStore'
import { MedicineInterface } from '../../models/ambulanceUse_system_models/medicine'
import { AmbulancesInterface } from '../../models/ambulance_system_models/ambulance'
import { EmployeeInterface } from '../../models/employeeSystemModel/IEmployee'
import { CreateAmbulanceStore, GetAmbulanceWithID } from '../../services/ambulanceStoreSystemServices/AmbulanceStoreHttpClientServices'
import { ListMedicines } from '../../services/ambulanceUse_system_services/HttpClientService'
import { GetAmbulanceByID, ListAmbulances } from '../../services/ambulance_system_services/HttpClientService'
import { GetEmployee } from '../../services/employeeSystemServices/EmployeeHttpClient'
import { convertType } from '../../services/utility'

export default function AmbulanceStoreCreate() {

  const [snackBar, setSnackBar] = React.useState({
    open: false,
    error: false,
    errorMsg: ""
  })

  // Main State For Create Data to Database
  const [ambulanceStore, setAmbulanceStore] = React.useState<Partial<AmbulanceStoreInterface>>({})
  // For Set medicine Relation In Database and Display In ComboBox
  const [medicine, setMedicine] = React.useState<MedicineInterface[]>([])
  // For Set Abulance Relation In Database and Display In ComboBox

  const [ambulance, setAmbulance] = React.useState<AmbulancesInterface>()
  // Set a one because Employee will Login only one don't set a Other Employee
  const [employee, setEmployee] = React.useState<EmployeeInterface>()

  let { id } = useParams()

  // To get A medicine to Desplay in comboBox
  const getMedicine = async () => {
    let res = await ListMedicines()
    if (res) {
      setMedicine(res);
    }
  }


  // To get A ambulance to display in comboBox
  const getAmbulance = async () => {
    let res = await GetAmbulanceWithID(id)
    if (res) {
      setAmbulance(res)
    }
  }

  // To get a Employee By ID
  const getEmployeeWithLocalID = async (ID: string | null) => {
    let res = await GetEmployee(ID)
    if (res) {
      setEmployee(res)
    }
  }


  // For select Medicine
  const [selectMedicine, setSelectMedicine] = React.useState<MedicineInterface>()

  // For clear Medicine 
  const [clearMedicine, _] = React.useState<MedicineInterface>()

  React.useEffect(() => {
    getMedicine()
    getAmbulance()
    getEmployeeWithLocalID(localStorage.getItem("id"))


  }, [])

  const navigator = useNavigate();

  // Check Data 
  const submit = async () => {
    // console.log(medicine)
    // console.log(ambulance)
    // console.log(employee)
    console.log(ambulanceStore)
    let res = await CreateAmbulanceStore({
      ...ambulanceStore,
      AmbulanceID: ambulance?.ID,
      EmployeeID: employee?.ID
    })

    if (res.data) {
      handleSnackbarSuccess()
      setTimeout(() => {
        navigator("/ambulance-store/" + id)
      }, 5000)
    } else {
      handleSnackbarFailed(res.error)
    }



  }

  // Select Data From formcontrol
  const handleChange: any = (event: React.ChangeEvent<{ name: string, value: any }>) => {
    const name = event.target.name as keyof typeof ambulanceStore;

    if (name === "MedicineID") {
      if (event.target.value !== "") {
        setSelectMedicine(medicine.filter((medfind) => (medfind.ID === convertType(event.target.value))).at(0))
      } else {
        setSelectMedicine(clearMedicine)
      }
    }

    setAmbulanceStore({
      ...ambulanceStore,
      [name]: event.target.value
    })
  }

  const [open, setOpen] = React.useState(false)
  const [error, setError] = React.useState(false)

  const handleSnackeBarClose = () => {
    setOpen(false)
    setError(false)
  }

  const handleSnackbarSuccess = () => {
    setSnackBar({
      ...snackBar,
      open: true
    })
  }

  const handleSnackbarFailed = (errorCode: any) => {
    setSnackBar({
      ...snackBar,
      error: true,
      errorMsg: errorCode
    })
  }
  return (
    <Container maxWidth="lg">
      {/* Snackbar success Part */}
      <Snackbar open={snackBar.open} autoHideDuration={5000} onClose={handleSnackeBarClose}>
        <Alert onClose={handleSnackeBarClose} severity="success" >
          บันทึกการเบิกยาเรียบร้อย
        </Alert>
      </Snackbar>

      {/* Snackbar Failed Part */}
      <Snackbar open={snackBar.error} autoHideDuration={5000} onClose={handleSnackeBarClose}>
        <Alert onClose={handleSnackeBarClose} severity="error" >
          บันทึกไม่สำเร็จ กรุณาลองใหม่ {snackBar.errorMsg}
        </Alert>
      </Snackbar>


      <Paper sx={{ p: 4, pb: 10 }}>
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant='h6'
              gutterBottom
              color="black"
            >
              เบิกยาเข้าสู่รถพยาบาลหมายเลขทะเบียน <span style={{ color: "#46CDCF" }}>{ambulance?.Clp}</span>
            </Typography>
          </Box>
        </Box>
        <hr />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth variant='outlined'>
              <p>เลือกยาที่ต้องการเบิก</p>
              <Select
                native
                value={ambulanceStore.MedicineID}
                onChange={handleChange}
                inputProps={{
                  name: "MedicineID"
                }}>
                <option aria-label="None" value="">
                  กรุณาเลือกยาที่ต้องการจัด
                </option>
                {
                  medicine.map((item: MedicineInterface) => (
                    <option value={item.ID} key={item.ID}>
                      {item.MedicineName}
                    </option>
                  ))
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <p>คำเตือน</p>
            <TextField
              fullWidth
              label={selectMedicine?.MedicineWarning} disabled
            />
          </Grid>
          <Grid item xs={4}>

          </Grid>
          <Grid item xs={4}>
            <p>ประเภท</p>
            <TextField
              fullWidth
              label={selectMedicine?.MedicineType} disabled
            />
          </Grid>

          <Grid item xs={12}>
            <p>จำนวน</p>
            <TextField
              name='Amount'
              type="number"
              value={ambulanceStore.Amount || ""}
              placeholder="200"
              // InputProps={{
              //   inputProps: {
              //     min: 1
              //   }
              // }}
              onChange={handleChange}
              disabled={(selectMedicine === undefined || selectMedicine.ID === 0) ? true : false}
            />
            <div className='set-text-in-form'>
              {selectMedicine?.MeasureUnit}
            </div>
          </Grid>
          <Grid item xs={12}>
            <Button component={RouterLink} to={`/ambulance-store/${id}`} variant='outlined'>
              ย้อนกลับ
            </Button>
            <Button
              onClick={submit}
              style={{ float: "right" }}
              variant="contained"
            >ทำการเบิกยา</Button>
          </Grid>

        </Grid>


      </Paper>
    </Container>
  )
}
