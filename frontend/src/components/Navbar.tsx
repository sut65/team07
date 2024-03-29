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
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";
//icon
import HomeIcon from "@mui/icons-material/Home";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import PersonOutlineTwoToneIcon from "@mui/icons-material/PersonOutlineTwoTone";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";
import PeopleIcon from "@mui/icons-material/People";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import HealingIcon from "@mui/icons-material/Healing";
import SanitizerIcon from "@mui/icons-material/Sanitizer";
import LocalCarWashIcon from "@mui/icons-material/LocalCarWash";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DirectionsCarTwoToneIcon from "@mui/icons-material/DirectionsCarTwoTone";
import CarRepairIcon from "@mui/icons-material/CarRepair";
import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const [state, setState] = React.useState(false);

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
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

  if (localStorage.getItem("role") === "Admin") {
    menu = [
      { name: "หน้าแรก", icon: <HomeIcon  color="primary"/>, path: "/" },
      {
        name: "ข้อมูลพนักงาน",
        icon: <PeopleIcon  color="primary"/>,
        path: "/Employee",
      },
    ];
  } else if (localStorage.getItem("role") === "Nurse") {
    menu = [
      { name: "หน้าแรก", icon: <HomeIcon  color="primary"/>, path: "/" },
      {
        name: "ข้อมูลการใช้ยา",
        icon: <MedicalServicesIcon  color="primary"/>,
        path: "/AmbulanceUse",
      },
      {
        name: "เบิกยาเข้ารถพยาบาล",
        icon: <LocalHospitalIcon  color="primary"/>,
        path: "/ambulance-store",
      },
    ];
  } else if (localStorage.getItem("role") === "Driver") {
    menu = [
      { name: "หน้าแรก", icon: <HomeIcon  color="primary"/>, path: "/" },
      {
        name: "รายการบันทึกข้อมูลใช้รถ",
        icon: <TimeToLeaveIcon  color="primary"/>,
        path: "/RecordTimeOutHistory",
      },
      {
        name: "รายการใช้รถขาเข้าของพนักงานขับรถ",
        icon: <DirectionsCarTwoToneIcon  color="primary"/>,
        path: "/RecordTimeInHistory",
      },
      {
        name: "ที่จอดรถพยาบาล",
        icon: <LocalParkingIcon  color="primary"/>,
        path: "/carDepot",
      },
      {
        name: "การล้างรถพยาบาล",
        icon: <LocalCarWashIcon  color="primary"/>,
        path: "/carWash",
      },
    ];
  } else if (localStorage.getItem("role") === "CarBuyer") {
    menu = [
      { name: "หน้าแรก", icon: <HomeIcon  color="primary"/>, path: "/" },

      {
        name: "รายการข้อมูลจัดซื้อรถพยาบาล",
        icon: <AirportShuttleIcon  color="primary"/>,
        path: "/Ambulance",
      },
    ];
  } else if (localStorage.getItem("role") === "DisinfectionStaff") {
    menu = [
      { name: "หน้าแรก", icon: <HomeIcon  color="primary"/>, path: "/" },
      {
        name: "รายการฆ่าเชื้อรถพยาบาล",
        icon: <SanitizerIcon  color="primary"/>,
        path: "/DisinfectionHistory",
      },
    ];
  } else if (localStorage.getItem("role") === "NotificationStaff") {
    menu = [
      { name: "หน้าแรก", icon: <HomeIcon  color="primary"/>, path: "/" },
      {
        name: "รายการเหตุฉุกเฉิน",
        icon: <HealingIcon  color="primary"/>,
        path: "/Case",
      },
    ];
  } else if (localStorage.getItem("role") === "CarManager") {
    menu = [
      { name: "หน้าแรก", icon: <HomeIcon  color="primary"/>, path: "/" },

      {
        name: "รายการตรวจเช็คสภาพรถ",
        icon: <LibraryBooksIcon  color="primary"/>,
        path: "/VehicleInspectionHistory",
      },
      {
        name: "รายการเเจ้งซ่อม",
        icon: <CarRepairIcon  color="primary"/>,
        path: "/Carcare",
      },
    ];
  }else {
    menu = [
      { name: "หน้าแรก", icon: <HomeIcon  color="primary"/>, path: "/" },
    ]
  }

  const list = [
    {
      name: "Profile",
      icon: <PersonOutlineTwoToneIcon  color="primary"/>,
      click: () => profile(),
    },
    {
      name: "Logout",
      icon: <LogoutTwoToneIcon  color="primary"/>,
      click: () => signout(),
    },
  ];

  const profile = () => {
    // setSuccess(true);
    window.location.href = "/employee-currenct";
  };

  const signout = () => {
    // setSuccess(true);
    localStorage.clear();
    setTimeout(() => {
      window.location.reload();
      window.location.href = "/";
    }, 500);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
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
            <IconButton
              onClick={() => setOpen((open) => !open)}
              size="small"
              sx={{ ml: 2 }}
              color="info"
              ref={anchorRef}
              id="composition-button"
              aria-controls={open ? "composition-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
            >
              <Avatar sx={{ width: 32, height: 32 }}>
                {/* test */}
                {localStorage?.getItem("role")?.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="bottom-start"
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom-start" ? "right top" : "right top",
                  }}
                >
                  <Paper
                    sx={{
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    }}
                  >
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                        disablePadding
                      >
                        <List>
                          {list.map((item, index) => (
                            <ListItem
                              disablePadding
                              onClick={item.click}
                              key={index}
                            >
                              <ListItemButton>
                                <ListItemIcon> {item.icon} </ListItemIcon>
                                <ListItemText primary={item.name} />
                              </ListItemButton>
                            </ListItem>
                          ))}
                        </List>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
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
                    <ListItem disablePadding>
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
