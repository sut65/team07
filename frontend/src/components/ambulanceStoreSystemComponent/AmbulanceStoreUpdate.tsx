import { Box, Button, Container, FormControl, Grid, Paper, Select, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AmbulanceStoreInterface } from '../../models/ambulanceStoreModels/IAmbulanceStore'
import { MedicineInterface } from '../../models/ambulanceUse_system_models/medicine'
import { GetAmbulanceStore, UpdateAmbulanceStore } from '../../services/ambulanceStoreSystemServices/AmbulanceStoreHttpClientServices'
import { ListMedicines } from '../../services/ambulanceUse_system_services/HttpClientService'
import { convertType } from '../../services/utility'

export default function AmbulanceStoreUpdate() {

    let { id } = useParams()

    /* 
     * I will Use A Data about Ambulance Store and Medicine Only
     * The other will Don't use in this Update
     */

    // For Edit A main Entity
    const [ambulanceStore, setAmbulanceStore] = React.useState<Partial<AmbulanceStoreInterface>>({})

    // For List Medicine 
    const [medicine, setMedicine] = React.useState<MedicineInterface[]>([])

    // For select Medicine
    const [selectMedicine, setSelectMedicine] = React.useState<MedicineInterface>()

    const getAmbulanceStores = async (ID: string | undefined) => {
        let res = await GetAmbulanceStore(ID)
        if (res) {
            setAmbulanceStore(res);
        }
    }

    const listMedicines = async () => {
        let res = await ListMedicines()
        if (res) {
            setMedicine(res);
        }
    }

    const useEffectFunction = () => {
        getAmbulanceStores(id)
        listMedicines()
    }

    useEffect(useEffectFunction, [])


  const navigator = useNavigate();

  
    const submit = async () => {
        let res = await UpdateAmbulanceStore(ambulanceStore)
      
          if (res.data) {
            // handleSnackbarSuccess()
            setTimeout(() => {
              navigator("/ambulance-store/" + ambulanceStore.AmbulanceID)
            }, 1000)
          } else {
            console.log(res.error)
            // handleSnackbarFailed(res.error)
          }
    }

    // Select Data From formcontrol
    const handleChange: any = (event: React.ChangeEvent<{ name: string, value: any }>) => {
        const name = event.target.name as keyof typeof ambulanceStore;
        if (name === "MedicineID") {
            if (event.target.value !== "") {
                setSelectMedicine(medicine.filter((medfind) => (medfind.ID === convertType(event.target.value))).at(0))
            } else {
                setSelectMedicine({
                    ID: 0,
                    MedicineWarning: "",
                    MedicineName: "",
                    MeasureUnit: "",
                    MedicineType: ""
                })
            }
        }
        setAmbulanceStore({
            ...ambulanceStore,
            [name]: event.target.value
        })
    }

    return (
        <Container maxWidth="lg">


            <Paper sx={{ p: 4, pb: 10 }}>
                <Box display="flex">
                    <Box flexGrow={1}>
                        <Typography
                            component="h2"
                            variant='h6'
                            gutterBottom
                            color="black"
                        >
                            แก้ไขข้อมูการเบิกยา <span style={{ color: "#3C70BD" }}>{ambulanceStore.Medicine?.MedicineName}</span> ของรถหมายเลขทะเบียน <span style={{ color: "#3C70BD" }}>{ambulanceStore.Ambulance?.Clp}</span>
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
                            label={(selectMedicine?.ID === undefined) ? (ambulanceStore.Medicine?.MedicineWarning) : (selectMedicine.MedicineWarning)} disabled
                        />
                    </Grid>
                    <Grid item xs={4}>

                    </Grid>
                    <Grid item xs={4}>
                        <p>ประเภท</p>
                        <TextField
                            fullWidth
                            label={(selectMedicine?.ID === undefined) ? (ambulanceStore.Medicine?.MedicineType) : (selectMedicine.MedicineType)} disabled
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <p>จำนวน</p>
                        <TextField
                            name='Amount'
                            type="number"
                            value={ambulanceStore.Amount || ""}
                            placeholder="200"
                            InputProps={{
                                inputProps: {
                                    min: 1
                                }
                            }}
                            onChange={handleChange}
                        />
                        <div className='set-text-in-form'>
                            {(selectMedicine?.ID === undefined) ? (ambulanceStore.Medicine?.MeasureUnit) : (selectMedicine.MeasureUnit)}
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            onClick={submit}
                            style={{ float: "right" }}
                            variant="contained"
                        >แก้ไขการเบิกยา</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}
