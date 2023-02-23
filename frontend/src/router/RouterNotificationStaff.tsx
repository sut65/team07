import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//แจ้งเหตุ
import CaseUpdate from "../components/emergency_system_components/EmergencyUpdate";
import CaseCreate from "../components/emergency_system_components/Emergency";
import Case from "../components/emergency_system_components/Emergencyhis";
import Navbar from "../components/Navbar";
import Home from "../components/Home"
function RouterNotificationStaff() {
  return (
    <Router>
      <Navbar />{" "}
      <div className="container-router">
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/Case" element={<Case />} />
        {/* <Route path="/CaseCreate" element={<CaseCreate />} /> */}
        <Route path="/CaseCreate" element={<CaseCreate />} />
        <Route path="/CaseUpdate" element={<CaseUpdate />} />
      </Routes>
      </div>
    </Router>
  );
}

export default RouterNotificationStaff;
