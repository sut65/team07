import EmployeeCreate from "../components/employeeSystemComponents/EmployeeCreate";
import EmployeeUpdate from "../components/employeeSystemComponents/EmployeeUpdate";
import EmployeeList from "../components/employeeSystemComponents/EmployeeList";
import EmployeeCurrenct from "../components/employeeSystemComponents/EmployeeCurrenct";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../components/Home"
function RouterEmployee() {
  return (
    <Router>
      <Navbar />
      <div className="container-router">
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/Employee" element={<EmployeeList />} />
        <Route path="/employee/create" element={<EmployeeCreate />} />
        <Route path="/employee/update/:id" element={<EmployeeUpdate />} />
        <Route path="/employee-currenct" element={<EmployeeCurrenct />} />
      </Routes>
      </div>
    </Router>
  );
}
export default RouterEmployee;
