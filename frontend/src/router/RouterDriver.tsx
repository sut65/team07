import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//ขาออก
import RecordTimeOutCreate from "../components/recordtimeout_system_components/RecordTimeOutCreate";
import RecordTimeOutHistory from "../components/recordtimeout_system_components/RecordTimeOutHistory";
//ขาเข้า
import RecordTimeInCreate from "../components/recordtimein_system_components/RecordTimeInCreate";
import RecordTimeInHistory from "../components/recordtimein_system_components/RecordTimeInHistory";
import RecordTimeInEdit from "../components/recordtimein_system_components/RecordTimeInEdit";
import RecordTimeInUpdate from "../components/recordtimein_system_components/RecordTimeInUpdate";
//จอดรถ
import CarDepot from "../components/carDepot_system_components/CarDepot";
import CarDepotUpdate from "../components/carDepot_system_components/CarDepotUpdate";
import CarDepotCreate from "../components/carDepot_system_components/CarDepotCreate";
//ล้างรถ
import CarWash from "../components/carWash_system_components/CarWash";
import CarWashUpdate from "../components/carWash_system_components/CarWashUpdate";
import CarWashCreate from "../components/carWash_system_components/CarWashCreate";
//พนักงานขับรถ
import Home from "../components/Home"
import Navbar from "../components/Navbar";
function RouterDriver() {
  return (
    <Router>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route
          path="/RecordTimeOutHistory"
          element={<RecordTimeOutHistory />}
        />
        <Route
          path="/RecordTimeOutCreate/:id?"
          element={<RecordTimeOutCreate />}
        />
        <Route path="/RecordTimeInCreate" element={<RecordTimeInCreate />} />
        <Route path="/RecordTimeInHistory" element={<RecordTimeInHistory />} />
        <Route path="/RecordTimeInEdit" element={<RecordTimeInEdit />} />
        <Route path="/RecordTimeInUpdate" element={<RecordTimeInUpdate />} />

        <Route path="/CarDepotCreate" element={<CarDepotCreate />} />
        <Route path="/CarDepot/CarDepotCreate" element={<CarDepotCreate />} />
        <Route path="/CarDepot/CarDepotUpdate" element={<CarDepotUpdate />} />
        <Route path="/CarDepot" element={<CarDepot />} />

        <Route path="/CarWashCreate" element={<CarWashCreate />} />
        <Route path="/CarWash" element={<CarWash />} />
        <Route path="/CarWash/CarWashCreate" element={<CarWashCreate />} />
        <Route path="/CarWash/CarWashUpdate" element={<CarWashUpdate />} />
      </Routes>
    </Router>
  );
}

export default RouterDriver;
