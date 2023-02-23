import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//จัดซื้อรถ
import AmbulanceCreate from "../components/ambulance_system_components/AmbulanceCreate";
import Ambulance from "../components/ambulance_system_components/Ambulance";
import AmbulanceUpdate from "../components/ambulance_system_components/AmbulanceUpdate";

import Navbar from "../components/Navbar";
import Home from "../components/Home"
import EmployeeCurrenct from "../components/employeeSystemComponents/EmployeeCurrenct";
const RouterCarBuyer = () => {
  return (
    <Router>
      <Navbar />
      <div className="container-router">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Ambulance" element={<Ambulance />} />
          <Route
            path="/Ambulance/AmbulanceCreate"
            element={<AmbulanceCreate />}
          />
          <Route
            path="/Ambulance/AmbulanceUpdate"
            element={<AmbulanceUpdate />}
          />
        <Route path="/employee-currenct" element={<EmployeeCurrenct />} />

        </Routes>
      </div>
    </Router>
  );
};

export default RouterCarBuyer;
