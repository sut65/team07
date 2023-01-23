import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import {
  Container,
  Box,
  Button,
} from "@mui/material";
import moment from "moment";
import { RecordTimeOutInterface } from "../../models/recordtimeout_system_models/recordtimeout";
import RecordTimeOutUpdate from "./RecordTimeOutUpdate";
import RecordTimeOutDelete from "./RecordTimeOutDelete";
import { HttpClientServices } from "../../services/recordtimeout_system_services/HttpClientServices";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

function RecordTimeOutHistory() {
  const [recordtimeout, setRecordtimeout] = React.useState<
    RecordTimeOutInterface[]
  >([]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getRecordTimeOut = async () => {
    try {
      let res = await HttpClientServices.get("/recordtimeouts");
      setRecordtimeout(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
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
      field: "Case.Emergency",
      headerName: "Case",
      width: 120,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams<any>) => {
        return <>{params.row.Case.ID}</>;
      },
    },
    {
      field: "Ambulance.TypeAbl",
      headerName: "รถพยาบาล",
      width: 120,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams<any>) => {
        return <>{params.row.Ambulance.CarBrand}</>;
      },
    },
    {
      field: "Ambulance.Clp",
      headerName: "เลขทะเบียนรถ",
      width: 130,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams<any>) => {
        return <>{params.row.Ambulance.Clp}</>;
      },
    },
    {
      field: "record_time_out_datetime",
      headerName: "วัน/เวลา",
      width: 220,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams<any>) => {
        return (
          <>
            {`วันที่: ${moment(params.row.record_time_out_datetime).format(
              "DD/MM/YYYY"
            )} เวลา: ${moment(params.row.record_time_out_datetime).format(
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
      width: 85,
      renderCell: (params: GridRenderCellParams<any>) => {
        return <RecordTimeOutUpdate params={params.row} />;
      },
      sortable: false,
      description: "ดูเพิ่มเติม",
    },
    {
      field: "ลบ",
      align: "center",
      headerAlign: "center",
      width: 85,
      renderCell: (params: GridRenderCellParams<any>) => {
        return <RecordTimeOutDelete />;
      },
      sortable: false,
      description: "ลบ",
    },
  ];

  useEffect(() => {
    getRecordTimeOut();
  }, []);

  return (
    <div>
      <Container maxWidth="md" sx={{ marginTop: 2 }}>
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              sx={{ fontWeight: "bold" }}
              variant="h5"
              color="primary"
            >
              ประวัติการใช้รถพยาบาล
            </Typography>
          </Box>

          <Box>
            <Button
              component={RouterLink}
              to="/RecordTimeOutCreate"
              variant="contained"
              color="primary"
            >
              บันทึกเวลาใช้รถ
            </Button>
          </Box>
        </Box>

        <div style={{ height: 400, maxWidth: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={recordtimeout}
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
      </Container>
    </div>
  );
}

export default RecordTimeOutHistory;
