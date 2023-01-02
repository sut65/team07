import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { createTheme, ThemeProvider } from "@mui/material/styles";
export default function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#3443EB",
      },
      secondary: {
        main: "#2461D4",
      },
      
    },
  });
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/create" element={<UserCreate />} /> */}
        </Routes>
      </div>
    </Router>
    </ThemeProvider>
  );
}
