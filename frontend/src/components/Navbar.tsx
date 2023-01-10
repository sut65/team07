import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";


//icon
import HomeIcon from '@mui/icons-material/Home';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import { Link } from "react-router-dom";

function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [state, setState] = React.useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState(open);
    };

  var menu: any[] = [];
  menu = [
    { name: "หน้าแรก", icon: <HomeIcon />, path: "/" },

    {
      name: "รายการข้อมูลจัดซื้อรถพยาบาล",
      icon: <AirportShuttleIcon />,
      path: "/AmbulanceCreate",
    },
    
    {
      name: "รายการบันทึกข้อมูลใช้รถ",
      icon: <TimeToLeaveIcon />,
      path: "/RecordTimeOutHistory",
    },

    {
      name: "รายการตรวจเช็คสภาพรถ",
      icon: <LibraryBooksIcon />,
      path: "/VehicleInspectionHistory",
    },

    
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {
              setState(true);
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AMBULANCE
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex" }}>
            {/* <IconButton size="large" color="inherit"> */}

            <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
              <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
            </IconButton>
          </Box>

          <SwipeableDrawer
            anchor={"left"}
            open={state}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            <Box
              sx={{ width: 300 }}
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <List>
                {menu.map((text, index) => (
                  <Link
                  to={text.path}
                  key={text.name}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItem  disablePadding>
                    <ListItemButton>
                      <ListItemIcon> {text.icon} </ListItemIcon>
                      <ListItemText primary={text.name} />
                    </ListItemButton>
                  </ListItem>
                  </Link>
                ))}
              </List>
            </Box>
          </SwipeableDrawer>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
