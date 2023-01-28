import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Container, Box, Button, Paper } from "@mui/material";
import moment from "moment";
import { RecordTimeOutInterface } from "../../models/recordtimeout_system_models/recordtimeout";
import RecordTimeOut from "./RecordTimeOut";
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
    let res = await HttpClientServices.get("/recordtimeouts");
    if (!res.error) {
      setRecordtimeout(res.results);
      // console.log(res);
    } else {
      console.log(res.error);
    }
  };
  const columns: GridColDef[] = [
    {
      field: "ID",
      headerName: "#",
      width: 65,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams<any>) => {
        return <>{params.row.ID}</>;
      },
    },
    {
      field: "Case.Emergency",
      headerName: "Case",
      width: 115,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams<any>) => {
        return <>{params.row.Case.ID}</>;
      },
    },
    {
      field: "Ambulance.CarBrand",
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
      field: "RecordTimeOutDatetime",
      headerName: "วัน/เวลา",
      width: 220,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams<any>) => {
        return (
          <>
            {`วันที่: ${moment(params.row.RecordTimeOutDatetime).format(
              "DD/MM/YYYY"
            )} เวลา: ${moment(params.row.RecordTimeOutDatetime).format(
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
        return <RecordTimeOut params={params.row} />;
      },
      sortable: false,
      description: "ดูเพิ่มเติม",
    },
    {
      field: "ลบ",
      align: "center",
      headerAlign: "center",
      width: 65,
      renderCell: (params: GridRenderCellParams<any>) => {
        return <RecordTimeOutDelete params={params.row.ID} />;
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
        </Paper>
      </Container>
    </div>
  );
}

export default RecordTimeOutHistory;
