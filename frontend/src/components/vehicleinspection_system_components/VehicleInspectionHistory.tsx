import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Container, Box, Button,Paper } from "@mui/material";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import { VehicleInspectionInterface } from "../../models/vehicleinspection_system_models/vehicleinspection";
import VehicleInspection from "./VehicleInspection";
import VehicleInspectionDelete from "./VehicleInspectionDelete";
import { HttpClientServices } from "../../services/recordtimeout_system_services/HttpClientServices";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

function VehicleInspectionHistory() {
  const [vehicleinspection, setVehicleInspection] = React.useState<
    VehicleInspectionInterface[]
  >([]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getVehicleInspection = async () => {
    let res = await HttpClientServices.get("/vehicleinspections");
    if (!res.error) {
      setVehicleInspection(res.results);
    } else {
      console.log(res.error);
    }
  };
  const columns: GridColDef[] = [
    {
      field: "ID",
      headerName: "#",
      width: 80,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Ambulance.ID",
      headerName: "รถพยาบาล",
      width: 170,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams<any>) => {
        return <>{params.row.Ambulance.CarBrand} {`(${params.row.Ambulance.Clp})`}</>;
      },
    },
    // {
    //   field: "Ambulance.Clp",
    //   headerName: "เลขทะเบียนรถ",
    //   width: 130,
    //   align: "center",
    //   headerAlign: "center",
    //   renderCell: (params: GridRenderCellParams<any>) => {
    //     return <>{params.row.Ambulance.Clp}</>;
    //   },
    // },
    {
      field: "Fail",
      headerName: "ปัญหา",
      width: 120,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams<any>) => {
        return <>{params.row.Fail}</>;
      },
    },

    {
      field: "AmbulancePart.PartName",
      headerName: "ชิ้นส่วนรถที่มีปัญหา",
      width: 220,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams<any>) => {
        return <>{params.row.AmbulancePart.PartName}</>;
      },
    },
    {
      field: "StatusCheck.StatusName",
      headerName: "สถานะ",
      width: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams<any>) => {
        return <>{params.row.StatusCheck.StatusName}</>;
      },
    },

    {
      field: "VehicleInspectionDatetime",
      headerName: "วัน/เวลา",
      width: 220,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams<any>) => {
        return (
          <>
            {`วันที่: ${moment(params.row.VehicleInspectionDatetime).format(
              "DD/MM/YYYY"
            )} เวลา: ${moment(params.row.VehicleInspectionDatetime).format(
              "HH:mm"
            )} น.`}
          </>
        );
      },
    },
    {
      field: "ดูเพิ่มเติม",
      align: "center",
      headerAlign: "center",
      width: 100,
      renderCell: (params: GridRenderCellParams<any>) => {
        return <VehicleInspection params={params.row} />;
      },
      sortable: false,
      description: "ดูเพิ่มเติม",
    },
    {
      field: "ลบ",
      align: "center",
      headerAlign: "center",
      width: 100,
      renderCell: (params: GridRenderCellParams<any>) => {
        return <VehicleInspectionDelete params={params.row.ID} />;
      },
      sortable: false,
      description: "ลบ",
    },
  ];

  useEffect(() => {
    getVehicleInspection();
  }, []);

  return (
    <div>
      <Container maxWidth="lg" sx={{ marginTop: 2 }}>
      <Paper
          className="paper"
          elevation={6}
          sx={{
            padding: 2.5,
            borderRadius: 3,
          }}
        >
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              sx={{ fontWeight: "bold" }}
              variant="h5"
              color="primary"
            >
              ประวัติการตรวจเช็คสภาพรถ
            </Typography>
          </Box>

          <Box>
            <Button
              component={RouterLink}
              to="/VehicleInspectionCreate"
              variant="contained"
              color="primary"
            >
              บันทึกใบตรวจเช็คสภาพรถ
            </Button>
          </Box>
        </Box>

        <div style={{ height: 400, maxWidth: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={vehicleinspection}
            getRowId={(row) => row.ID}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>

        {/* <RecordTimeOutUpdate></RecordTimeOutUpdate>
        <Button
          component={RouterLink}
          to="/RecordTimeOutDelete"
          color="error"
          variant="outlined"
        >
          <DeleteIcon></DeleteIcon>
        </Button>

        {moment(recordtimeout.Record_Time_Out_Datetime).format("DD/MM/YYYY")} */}
      </Paper>
      </Container>
    </div>
  );
}

export default VehicleInspectionHistory;
