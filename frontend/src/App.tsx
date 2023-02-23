import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { orange, green, indigo, grey } from "@mui/material/colors";
import { PaletteOptions } from "@mui/material/styles/createPalette";
//components
import Signin from "./components/Signin";
//route
import RouterDriver from "./router/RouterDriver";
import RouterCarManager from "./router/RouterCarManager";
import RouterDisinfection from "./router/RouterDisinfection";
import RouterEmployee from "./router/RouterEmployee";
import RouterNotificationStaff from "./router/RouterNotificationStaff";
import RouterNurse from "./router/RouterNurse";
import "./App.css";
import { RouterCarBuyer } from "./router/RouterCarBuyer";

export default function App() {
  const [role, setRole] = React.useState<string>("");
  const [token, setToken] = React.useState<string>("");
  const palette: PaletteOptions = {
    primary: {
      main: "#3D84A7",
    },
    secondary: {
      main: "#3282B8",
    },
    warning: {
      main: orange[500],
    },
    success: {
      main: "#86C8BC",
    },
    error: {
      main: "#F65A50",
    },
    text: {
      primary: "#233333",
    },
  };
  const theme = createTheme({
    palette: palette,
    typography: {
      fontFamily: "Kanit",
      fontSize: 14,
    },
  });

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token) {
      setToken(token);
      setRole(role as string);
    }
  }, []);

  // if (!token) {
  //   return <Signin />;
  // }

  return (
    <ThemeProvider theme={theme}>
      <>
        {token && role === "Admin" ? (
          <RouterEmployee />
        ) : token && role === "Driver" ? (
          <RouterDriver />
        ) : token && role === "CarManager" ? (
          <RouterCarManager />
        ) : token && role === "Nurse" ? (
          <RouterNurse />
        ) : token && role === "DisinfectionStaff" ? (
          <RouterDisinfection />
        ) : token && role === "DisinfectionStaff" ? (
          <RouterNotificationStaff />
        ) : token && role === "CarBuyer" ? (
          <RouterCarBuyer />
        ) : (
          <Signin />
        )}
      </>
    </ThemeProvider>
  );
}
