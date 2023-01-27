import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { orange, green, indigo, grey } from "@mui/material/colors";
import { PaletteOptions } from "@mui/material/styles/createPalette";
//components
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AmbulanceCreate from "./components/ambulance_system_components/AmbulanceCreate";
// import AmbulanceUpdate from "./components/ambulance_system_components/AmbulanceUpdate";
// import Ambulance from "./components/ambulance_system_components/Ambulance";
import RecordTimeOutCreate from "./components/recordtimeout_system_components/RecordTimeOutCreate";
import RecordTimeOutHistory from "./components/recordtimeout_system_components/RecordTimeOutHistory";
import Signin from "./components/Signin";
import EmployeeList from "./components/employeeSystemComponents/EmployeeList";
import RecordTimeInCreate from "./components/recordtimein_system_components/RecordTimeInCreate";
import RecordTimeInHistory from "./components/recordtimein_system_components/RecordTimeInHistory";
import RecordTimeInEdit from "./components/recordtimein_system_components/RecordTimeInEdit";
import RecordTimeInUpdate from "./components/recordtimein_system_components/RecordTimeInUpdate";
import DisinfectionCreate from "./components/disinfection_system_component/DisinfectionCreate";
import DisinfectionHistory from "./components/disinfection_system_component/DisinfectionHistory";
import DisinfectionDelete from "./components/disinfection_system_component/DisinfectionDelete";
import DisinfectionUpdate from "./components/disinfection_system_component/DisinfecttionUpdate";
import RecordTimeOutUpdate from "./components/recordtimeout_system_components/RecordTimeOutUpdate";

import "./App.css";
import EmployeeCreate from "./components/employeeSystemComponents/EmployeeCreate";
import EmployeeUpdate from "./components/employeeSystemComponents/EmployeeUpdate";
import Ambulance from "./components/ambulance_system_components/Ambulance";
import AmbulanceUpdate from "./components/ambulance_system_components/AmbulanceUpdate";
//import CaseCreate from "./components/emergency_system_components/emergency";


import AmblanceUseCreate from "./components/ambulanceUse_system_components/AmblanceUseCreate";
import AmbulanceStoreHome from "./components/ambulanceStoreSystemComponent/AmbulanceStoreHome";
import AmbulanceStoreManage from "./components/ambulanceStoreSystemComponent/AmbulanceStoreManage";
// import RecordTimeInDelete from "./components/recordtimein_system_components/RecordTimeInDelete";

import VehicleInspectionCreate from "./components/vehicleinspection_system_components/VehicleInspectionCreate";
import VehicleInspectionHistory from "./components/vehicleinspection_system_components/VehicleInspectionHistory";
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
    text: {
      primary: "#233333",
    },
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
    <div>
      <Router>
        <ThemeProvider theme={theme}>
          <Navbar />
          <div className="container-router">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/AmbulanceCreate" element={<AmbulanceCreate />} />
              <Route path="/" element={<Signin />} />

              {/* //Employee */}
              <Route path="/Employee" element={<EmployeeList />} />
              <Route path="/employee/create" element={<EmployeeCreate />} />
              <Route path="/employee/update/:id" element={<EmployeeUpdate />} />

              <Route path="/Ambulance" element={<Ambulance />} />
              <Route
                path="/Ambulance/AmbulanceCreate"
                element={<AmbulanceCreate />}
              />
              <Route
                path="/Ambulance/AmbulanceUpdate"
                element={<AmbulanceUpdate />}
              />

              <Route
                path="/RecordTimeOutHistory"
                element={<RecordTimeOutHistory />}
              />
              <Route
                path="/RecordTimeOutCreate/:id?"
                element={<RecordTimeOutCreate />}
              />

              <Route
                path="/RecordTimeInCreate"
                element={<RecordTimeInCreate />}
              />
              <Route
                path="/RecordTimeInHistory"
                element={<RecordTimeInHistory />}
              />
              <Route path="/RecordTimeInEdit" element={<RecordTimeInEdit />} />
              <Route path="/RecordTimeInUpdate" element={<RecordTimeInUpdate />} />

              <Route path="/RecordTimeInUpdate" element={<RecordTimeInUpdate/>} />
              <Route path="/DisinfectionCreate" element={<DisinfectionCreate />} />
              <Route path="/DisinfectionHistory" element={<DisinfectionHistory />} />
              <Route path="/DisinfectionDelete" element={<DisinfectionDelete />} />
              <Route path="/DisinfectionUpdate" element={<DisinfectionUpdate />} />
              {/* <Route path="/RecordTimeInDelete" element={<RecordTimeInDelete />} /> */}


              <Route path="/AmbulanceUse/AmbulanceUseCreate" element={<AmblanceUseCreate />} />



              <Route path="/ambulance-store" element={<AmbulanceStoreHome />} />
              <Route path="/ambulance-store/:id" element={<AmbulanceStoreManage />} />

              <Route path="/VehicleInspectionCreate" element={<VehicleInspectionCreate />} />

              <Route path="/VehicleInspectionHistory" element={<VehicleInspectionHistory />} />
              {/* <Route path="/CaseCreate" element={<CaseCreate />} /> */}

            </Routes>

          </div>
        </ThemeProvider>
      </Router>
    </div>
  );
}
