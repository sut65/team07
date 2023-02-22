import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//ใช้ยาบนรถ
import AmbulanceUse from "../components/ambulanceUse_system_components/AmbulanceUse";
import AmblanceUseCreate from "../components/ambulanceUse_system_components/AmblanceUseCreate";
import AmbulanceUseUpdate from "../components/ambulanceUse_system_components/AmbulanceUseUpdate";

//เบิกยา
import AmbulanceStoreCreate from "../components/ambulanceStoreSystemComponent/AmbulanceStoreCreate";
import AmbulanceStoreUpdate from "../components/ambulanceStoreSystemComponent/AmbulanceStoreUpdate";
import AmbulanceStoreHome from "../components/ambulanceStoreSystemComponent/AmbulanceStoreHome";
import AmbulanceStoreManage from "../components/ambulanceStoreSystemComponent/AmbulanceStoreManage";
import Navbar from "../components/Navbar";
import Home from "../components/Home"
function RouterNurse() {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/ambulance-store" element={<AmbulanceStoreHome />} />
        <Route path="/ambulance-store/:id" element={<AmbulanceStoreManage />} />
        <Route
          path="/ambulance-store/create/:id"
          element={<AmbulanceStoreCreate />}
        />
        <Route
          path="/ambulance-store/update/:id"
          element={<AmbulanceStoreUpdate />}
        />
        <Route path="/AmbulanceUse" element={<AmbulanceUse />} />
        <Route
          path="/AmbulanceUse/AmbulanceUseUpdate"
          element={<AmbulanceUseUpdate />}
        />{" "}
        <Route
          path="/AmbulanceUse/AmbulanceUseCreate"
          element={<AmblanceUseCreate />}
        />
      </Routes>
    </Router>
  );
}

export default RouterNurse;
