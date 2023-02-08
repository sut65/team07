import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { EmployeeInterface } from "../../models/employeeSystemModel/IEmployee";
import { EmpStatusInterface } from "../../models/employeeSystemModel/IStatus";
import {
  GetEmployee,
  ListStatus,
  PostEmployee,
} from "../../services/employeeSystemServices/EmployeeHttpClient";
import { convertType } from "../../services/utility";

export default function EmployeeCurrenct() {
  const [employee, setEmployee] = React.useState<Partial<EmployeeInterface>>(
    {}
  );

  const [status, setStatus] = React.useState<EmpStatusInterface[]>([]);

  //error status
  const [error, setError] = React.useState({
    status: "",
    user: "",
    workingArea: "",
    education: "",
  });

  const getStatus = async () => {
    let res = await ListStatus();
    if (res) {
      setStatus(res);
    } else {
      setError({
        ...error,
        status: "cannot load status from this api",
      });
    }
  };

  const getCurenctEmployee = async () => {
    let res = await GetEmployee(localStorage.getItem("id") as string);
    if (res) {
      setEmployee(res);
    } else {
      setError({
        ...error,
        status: "cannot load Currenct Employee from database",
      });
    }
  };

  const handleChange: any = (
    event: React.ChangeEvent<{ name: string; value: any }>
  ) => {
    const name = event.target.name as keyof typeof employee;
    setEmployee({
      ...employee,
      [name]: event.target.value,
    });
  };

  React.useEffect(() => {
    getStatus();
    getCurenctEmployee();
  }, []);

  return (
    <Container maxWidth="lg">
      <Paper sx={{ p: 4, pb: 10 }}>
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography component="h2" variant="h6" gutterBottom color="black">
              ข้อมูลพนักงานของคุณ
            </Typography>
          </Box>
        </Box>
        <hr />
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <p>ชื่อ</p>
            <TextField label={employee.Name} disabled />
          </Grid>
          <Grid item xs={6}>
            <p>นามสกุล</p>
            <TextField label={employee.Surname} disabled />
          </Grid>
          <Grid item xs={4}>
            <p>อายุ</p>
            <TextField label={employee.Age} disabled />
          </Grid>
          <Grid item xs={4}>
            <p>สายวิชา</p>
            <TextField label={employee.Education?.Path} disabled />
          </Grid>
          <Grid item xs={4}>
            <p>การศึกษา</p>
            <TextField label={employee.Education?.Level} disabled />
          </Grid>
          <Grid item xs={4}>
            <p>ความพร้อม</p>
            <TextField label={employee.Status?.Status} disabled />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
