import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//พนง ฆ่าเชื้อ
import DisinfectionCreate from "../components/disinfection_system_component/DisinfectionCreate";
import DisinfectionHistory from "../components/disinfection_system_component/DisinfectionHistory";
import DisinfectionDelete from "../components/disinfection_system_component/DisinfectionDelete";
import DisinfectionUpdate from "../components/disinfection_system_component/DisinfecttionUpdate";
import Navbar from "../components/Navbar";
import Home from "../components/Home"
import EmployeeCurrenct from "../components/employeeSystemComponents/EmployeeCurrenct";
function RouterDisinfection() {
  return (
    <Router>
      <Navbar />
      <div className="container-router">
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/DisinfectionCreate" element={<DisinfectionCreate />} />
        <Route path="/DisinfectionHistory" element={<DisinfectionHistory />} />
        <Route path="/DisinfectionDelete" element={<DisinfectionDelete />} />
        <Route path="/DisinfectionUpdate" element={<DisinfectionUpdate />} />
        <Route path="/employee-currenct" element={<EmployeeCurrenct />} />

      </Routes>
      </div>
    </Router>
  );
}

export default RouterDisinfection;
