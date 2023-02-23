import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


//แจ้งซ่อม
import CarCareCreate from "../components/carcare_system_components/Carcare";
import Carcare from "../components/carcare_system_components/Carcarehis";
//ตรวจเช็คสภาพรถ
import VehicleInspectionCreate from "../components/vehicleinspection_system_components/VehicleInspectionCreate";
import VehicleInspectionHistory from "../components/vehicleinspection_system_components/VehicleInspectionHistory";
import Navbar from "../components/Navbar";
import Home from "../components/Home"
function RouterCarManager() {
  return (
    <Router>
      <Navbar />
      <div className="container-router">
      <Routes>
      <Route path="/" element={<Home />} />
       

        <Route path="/CarCare" element={<Carcare />} />
        <Route path="/CarCareCreate" element={<CarCareCreate />} />

        <Route
          path="/VehicleInspectionCreate/:id?"
          element={<VehicleInspectionCreate />}
        />
        <Route
          path="/VehicleInspectionHistory"
          element={<VehicleInspectionHistory />}
        />
      </Routes>
      </div>
    </Router>
  );
}
export default RouterCarManager;
