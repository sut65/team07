import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { orange, green, indigo, grey } from "@mui/material/colors";
import { PaletteOptions } from "@mui/material/styles/createPalette";
//components
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AmbulanceCreate from "./components/ambulance_system_components/AmbulanceCreate";
import Ambulance from "./components/ambulance_system_components/Ambulance";
// import RecordTimeOutCreate from "./components/recordtimeout_system_components/RecordTimeOutCreate";
// import RecordTimeOutHistory from "./components/recordtimeout_system_components/RecordTimeOutHistory";
// import RecordTimeOutUpdate from "./components/recordtimeout_system_components/RecordTimeOutUpdate";
import Signin from "./components/Signin";
import EmployeeList from "./components/employeeSystemComponents/EmployeeList";

//import css
import "./App.css"

export default function App() {
  const palette: PaletteOptions = {
    primary: {
      main: "#3443EB",
    },
    secondary: {
      main: "#2461D4",
    },
    warning: {
      main: orange[500],
    },
    success: {
      main: green[500],
    },
  };
  const theme = createTheme({
    palette: palette,
    typography: {
      fontFamily: "Kanit",
      fontSize: 14,
    },
  });

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div>
          <Navbar />
          <div className="container-router">

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Ambulance/AmbulanceCreate" element={<AmbulanceCreate />} />
              <Route path="/Ambulance" element={<Ambulance />} />
              <Route path="/Signin" element={<Signin />} />
              {/* <Route path="/Employee" element={<EmployeeList />} />
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
