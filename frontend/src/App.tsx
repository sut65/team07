import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { orange, green, indigo, grey } from "@mui/material/colors";
import { PaletteOptions } from "@mui/material/styles/createPalette";
//components
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AmbulanceCreate from "./components/ambulance_system_components/AmbulanceCreate";
import AmbulanceUpdate from "./components/ambulance_system_components/AmbulanceUpdate";
import Ambulance from "./components/ambulance_system_components/Ambulance";
// import RecordTimeOutCreate from "./components/recordtimeout_system_components/RecordTimeOutCreate";
// import RecordTimeOutHistory from "./components/recordtimeout_system_components/RecordTimeOutHistory";
// import RecordTimeOutUpdate from "./components/recordtimeout_system_components/RecordTimeOutUpdate";
import Signin from "./components/Signin";
import EmployeeList from "./components/employeeSystemComponents/EmployeeList";

//import css
import "./App.css";
import EmployeeCreate from "./components/employeeSystemComponents/EmployeeCreate";
import EmployeeUpdate from "./components/employeeSystemComponents/EmployeeUpdate";

export default function App() {
  const [token, setToken] = React.useState<string>("");
  const palette: PaletteOptions = {
    primary: {
      main: "#3F70EB",
    },
    secondary: {
      main: "#2AA6F6",
    },
    warning: {
      main: orange[500],
    },
    success: {
      main: green[500],
    },
    error: {
      main: "#F65A5A",
    },
    text:{
      primary: "#233333"
    }
  };
  const theme = createTheme({
    palette: palette,
    typography: {
      fontFamily: "Kanit",
      fontSize: 14,
    },
  });

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  if (!token) {
    return <Signin />;
  }

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div>
          <Navbar />
          <div className="container-router">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/Ambulance/AmbulanceCreate"
                element={<AmbulanceCreate />}
              />
              <Route
                path="/Ambulance/AmbulanceUpdate"
                element={<AmbulanceUpdate />}
              />
              <Route path="/Ambulance" element={<Ambulance />} />
              
              <Route path="/employee" element={<EmployeeList />} />
              <Route path="/employee/create" element={<EmployeeCreate />} />
              <Route path="/employee/update/:id" element={<EmployeeUpdate />}/>
              {/* <Route
              path="/RecordTimeOutHistory"
              element={<RecordTimeOutHistory />}
            />
            <Route
              path="/RecordTimeOutCreate"
              element={<RecordTimeOutCreate />}
            />
            <Route
              path="/RecordTimeOutUpdate"
              element={<RecordTimeOutUpdate />}
            /> */}
            </Routes>
          </div>
        </div>
      </ThemeProvider>
    </Router>
  );
}
