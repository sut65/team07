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
import "./App.css";
import EmployeeCreate from "./components/employeeSystemComponents/EmployeeCreate";
import EmployeeUpdate from "./components/employeeSystemComponents/EmployeeUpdate";
import Ambulance from "./components/ambulance_system_components/Ambulance";
import AmbulanceUpdate from "./components/ambulance_system_components/AmbulanceUpdate";
import CaseCreate from "./components/emergency_system_components/emergency";

import AmbulanceUse from "./components/ambulanceUse_system_components/AmbulanceUse";
import AmblanceUseCreate from "./components/ambulanceUse_system_components/AmblanceUseCreate";
import AmbulanceStoreHome from "./components/ambulanceStoreSystemComponent/AmbulanceStoreHome";
import AmbulanceStoreManage from "./components/ambulanceStoreSystemComponent/AmbulanceStoreManage";
// import RecordTimeInDelete from "./components/recordtimein_system_components/RecordTimeInDelete";

import VehicleInspectionCreate from "./components/vehicleinspection_system_components/VehicleInspectionCreate";
import VehicleInspectionHistory from "./components/vehicleinspection_system_components/VehicleInspectionHistory";
import AmbulanceStoreCreate from "./components/ambulanceStoreSystemComponent/AmbulanceStoreCreate";
import CarDepot from "./components/carDepot_system_components/CarDepot";
import CarDepotUpdate from "./components/carDepot_system_components/CarDepotUpdate";
import CarDepotCreate from "./components/carDepot_system_components/CarDepotCreate";
import CarWash from "./components/carWash_system_components/CarWash";
import CarWashUpdate from "./components/carWash_system_components/CarWashUpdate";
import CarWashCreate from "./components/carWash_system_components/CarWashCreate";
import AmbulanceStoreUpdate from "./components/ambulanceStoreSystemComponent/AmbulanceStoreUpdate";
import AmbulanceUseUpdate from "./components/ambulanceUse_system_components/AmbulanceUseUpdate";
import Case from "./components/emergency_system_components/emergencyhis";
import CarCareCreate from "./components/carcare_system_components/carcare";
import Carcare from "./components/carcare_system_components/carcarehis";
import EmployeeCurrenct from "./components/employeeSystemComponents/EmployeeCurrenct";

export default function App() {
  const [token, setToken] = React.useState<string>("");
  const palette: PaletteOptions = {
    primary: {
      main: "#3D84A7",
    },
    secondary: {
      main: "#3282B8",
    },
    warning: {
      main: orange[500],
    },
    success: {
      main: "#86C8BC",
    },
    error: {
      main: "#F65A50",
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
          {token && (
            <>
              <Navbar />
              <div className="container-router">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/AmbulanceCreate"
                    element={<AmbulanceCreate />}
                  />
                  <Route path="/CarDepotCreate" element={<CarDepotCreate />} />
                  <Route path="/" element={<Signin />} />

                  <Route path="/CarWashCreate" element={<CarWashCreate />} />
                  <Route path="/" element={<Signin />} />
                  {/* //Employee */}
                  <Route path="/Employee" element={<EmployeeList />} />
                  <Route path="/employee/create" element={<EmployeeCreate />} />
                  <Route
                    path="/employee/update/:id"
                    element={<EmployeeUpdate />}
                  />
                  <Route 
                    path="/employee-currenct"
                    element={<EmployeeCurrenct />}
                  />
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
                  <Route path="/Ambulance" element={<Ambulance />} />
                  <Route path="/CarDepot" element={<CarDepot />} />
                  <Route path="/CarWash" element={<CarWash />} />
                  <Route
                    path="/Ambulance/AmbulanceCreate"
                    element={<AmbulanceCreate />}
                  />
                  <Route
                    path="/Ambulance/AmbulanceUpdate"
                    element={<AmbulanceUpdate />}
                  />
                  <Route
                    path="/CarDepot/CarDepotCreate"
                    element={<CarDepotCreate />}
                  />
                  <Route
                    path="/CarDepot/CarDepotUpdate"
                    element={<CarDepotUpdate />}
                  />
                  <Route
                    path="/RecordTimeInCreate"
                    element={<RecordTimeInCreate />}
                  />
                  <Route
                    path="/RecordTimeInHistory"
                    element={<RecordTimeInHistory />}
                  />
                  <Route
                    path="/RecordTimeInEdit"
                    element={<RecordTimeInEdit />}
                  />
                  <Route
                    path="/RecordTimeInUpdate"
                    element={<RecordTimeInUpdate />}
                  />
                  <Route
                    path="/RecordTimeInUpdate"
                    element={<RecordTimeInUpdate />}
                  />
                  <Route
                    path="/DisinfectionCreate"
                    element={<DisinfectionCreate />}
                  />
                  <Route
                    path="/DisinfectionHistory"
                    element={<DisinfectionHistory />}
                  />
                  <Route
                    path="/DisinfectionDelete"
                    element={<DisinfectionDelete />}
                  />
                  <Route
                    path="/DisinfectionUpdate"
                    element={<DisinfectionUpdate />}
                  />
                  {/* <Route path="/RecordTimeInDelete" element={<RecordTimeInDelete />} /> */}
                  <Route path="/AmbulanceUse" element={<AmbulanceUse />} />
                  <Route path="/AmbulanceUse/AmbulanceUseUpdate" element={<AmbulanceUseUpdate />} />                  <Route
                    path="/AmbulanceUse/AmbulanceUseCreate"
                    element={<AmblanceUseCreate />}
                  />
                  <Route
                    path="/ambulance-store"
                    element={<AmbulanceStoreHome />}
                  />
                  <Route
                    path="/ambulance-store/:id"
                    element={<AmbulanceStoreManage />}
                  />
                  <Route
                    path="/ambulance-store/create/:id"
                    element={<AmbulanceStoreCreate />}
                  />
                  <Route
                    path="/ambulance-store/update/:id"
                    element={<AmbulanceStoreUpdate />}
                  />
                  <Route
                    path="/VehicleInspectionCreate/:id?"
                    element={<VehicleInspectionCreate />}
                  />
                  <Route
                    path="/VehicleInspectionHistory"
                    element={<VehicleInspectionHistory />}
                  />
                  {/* <Route path="/CaseCreate" element={<CaseCreate />} /> */}

                  <Route
                    path="/Case"
                    element={<Case />}
                  />
                  <Route
                    path="/CaseCreate"
                    element={<CaseCreate />}
                  />
                  <Route
                    path="/CarCare"
                    element={<Carcare />}
                  />
                  <Route
                    path="/CarCareCreate"
                    element={<CarCareCreate />}
                  />
                  <Route
                    path="/CarWash/CarWashCreate"
                    element={<CarWashCreate />}
                  />
                  <Route
                    path="/CarWash/CarWashUpdate"
                    element={<CarWashUpdate />}
                  />
                  <Route
                    path="/CarWash/CarWashCreate"
                    element={<CarWashCreate />}
                  />
                  <Route
                    path="/CarWash/CarWashUpdate"
                    element={<CarWashUpdate />}
                  />
                </Routes>
              </div>
            </>
          )}
        </ThemeProvider>
      </Router>
    </div>
  );
}
