import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import logo from "../../Assets/Images/logo.png";
import { Avatar, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/SpaceDashboard";
import GroupIcon from "@mui/icons-material/Group";
import FitnessIcon from "@mui/icons-material/FitnessCenter";
import DiningIcon from "@mui/icons-material/RamenDining";
import AccountIcon from "@mui/icons-material/AccountBox";
import { Link } from "react-router-dom";
import ForumIcon from "@mui/icons-material/Forum";
import LogoutIcon from "@mui/icons-material/Logout";
import { useContext } from "react";
import { AdminContext } from "../../Context/Context";

const drawerWidth = { xs: "18%", sm: 240 };

export default function NavBar() {
  const { confirmation, navigate, setState, state } = useContext(AdminContext);
  const [open, setOpen] = React.useState(false);

  const navBar = [
    { title: "Dashboard", icon: <DashboardIcon />, path: "/admin/Dashboard" },
    { title: "Clients", icon: <GroupIcon />, path: "/admin/Clients" },
    { title: "Workouts", icon: <FitnessIcon />, path: "/admin/Workouts" },
    { title: "Meals", icon: <DiningIcon />, path: "/admin/Meals" },
    { title: "Feedbacks", icon: <ForumIcon />, path: "/admin/Feedbacks" },
    { title: "Profile", icon: <AccountIcon />, path: "/admin/Profile" },
  ];

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const logout = () => {
    localStorage.removeItem("adminToken");
    setState(!state);
    navigate("/admin/");
  };
  const handleLogout = () => {
    confirmation(
      "You want to logout!",
      "Yes, Logout",
      "Your account is safe!",
      "Logged out!",
      "Logged out from the account!",
      logout
    );
  };
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <Toolbar />
      <List>
        {navBar.map((text, index) => (
          <ListItem
            key={index}
            component={Link}
            to={`${text.path}`}
            sx={{ color: "black", fontWeight: "bolder" }}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>{text.icon}</ListItemIcon>
              <ListItemText primary={text.title} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding onClick={handleLogout}>
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        elevation={0}
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#d6dded",
          boxShadow:
            "0px 2px 1px -1px rgb(0 0 0 / 11%), 0px 1px 20px 0px rgb(0 0 0 / 5%), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ maxWidth: { sm: "5%", xs: "20%" } }}>
            <img
              src={logo}
              alt="Logo"
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
          <Box sx={{ display: { xs: "contents", sm: "none" } }}>
            <IconButton onClick={() => setOpen(!open)}>
              <MenuIcon sx={{ color: "#344d5c" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          display: { xs: "none", sm: "flex" },
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "linear-gradient(to bottom, #e6e5f2, #a5d9f9, #618ca6)",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {navBar.map((text, index) => (
              <ListItem
                key={index}
                component={Link}
                to={`${text.path}`}
                sx={{ color: "black", fontWeight: "bolder" }}
                disablePadding
              >
                <ListItemButton>
                  <ListItemIcon
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {text.icon}
                  </ListItemIcon>
                  <ListItemText
                    sx={{ display: { xs: "none", sm: "contents" } }}
                    primary={text.title}
                  />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding onClick={handleLogout}>
              <ListItemButton>
                <ListItemIcon
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={"Logout"} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
