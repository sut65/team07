import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { orange, green, indigo, grey } from "@mui/material/colors";
import { PaletteOptions } from "@mui/material/styles/createPalette";
//components
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AmbulanceCreate from "./components/ambulance_system_components/AmbulanceCreate";
// import Signin from "./components/Signin/Signin";
// import RecordTimeOutHistory from "./components/RecordTimeOutHistory";
export default function App() {
  const palette: PaletteOptions = {
    primary: {
      main: "#3443EB",
    },
    secondary: {
      main: "#2461D4",
    },
    warning: {
      main: orange[500],
    },
    success: {
      main: green[500],
    },
  };
  const theme = createTheme({
    palette: palette,
    typography: {
      fontFamily: "Kanit",
      fontSize: 14,
    },
  });

  return (
    <Router>
    <ThemeProvider theme={theme}>
      
        <div>
          <Navbar />
   
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/AmbulanceCreate" element={<AmbulanceCreate />} />
            {/* <Route path="/" element={<Signin />} />
            <Route path="/recordTimeOutHistory" element={<RecordTimeOutHistory />} /> */}
          </Routes>
        </div>
      
    </ThemeProvider>
    </Router>
  );
}
