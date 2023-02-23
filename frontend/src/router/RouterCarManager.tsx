import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


//แจ้งซ่อม
import CarCareCreate from "../components/carcare_system_components/Carcare";
import Carcare from "../components/carcare_system_components/Carcarehis";
import CarCareUpdate from "../components/carcare_system_components/CarcareUpdate";
//ตรวจเช็คสภาพรถ
import VehicleInspectionCreate from "../components/vehicleinspection_system_components/VehicleInspectionCreate";
import VehicleInspectionHistory from "../components/vehicleinspection_system_components/VehicleInspectionHistory";
import Navbar from "../components/Navbar";
import Home from "../components/Home"
import EmployeeCurrenct from "../components/employeeSystemComponents/EmployeeCurrenct";
function RouterCarManager() {
  return (
    <Router>
      <Navbar />
      <div className="container-router">
      <Routes>
      <Route path="/" element={<Home />} />
       

        <Route path="/CarCare" element={<Carcare />} />
        <Route path="/CarCareCreate" element={<CarCareCreate />} />
        <Route path="/CarCareUpdate" element={<CarCareUpdate />} />

        <Route
          path="/VehicleInspectionCreate/:id?"
          element={<VehicleInspectionCreate />}
        />
        <Route
          path="/VehicleInspectionHistory"
          element={<VehicleInspectionHistory />}
        />
        <Route path="/employee-currenct" element={<EmployeeCurrenct />} />

      </Routes>
      </div>
    </Router>
  );
}
export default RouterCarManager;
