import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../Assets/Images/logo.png";
import { useEffect } from "react";
import { useContext } from "react";
import { CstContext } from "../../Context/CustomerContext";
import MoreOptions from "./MoreOptions";
const Header = () => {
  const { customer, directAlert, state, setState } = useContext(CstContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.pageYOffset;
      setScrollPosition(currentScrollPosition);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("customerToken");
    directAlert("success", "Logged out successfully", 3000);
    setState(!state);
  };
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem component={Link} sx={{ color: "#000" }} to={"/"}>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem component={Link} sx={{ color: "#000" }} to={"/About"}>
          <ListItemText primary="About Us" />
        </ListItem>
        {customer && (
          <>
            <ListItem component={Link} sx={{ color: "#000" }} to={"/Profile"}>
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem component={Link} sx={{ color: "#000" }} to={"/WorkOuts"}>
              <ListItemText primary="WorkOuts" />
            </ListItem>
            <ListItem component={Link} sx={{ color: "#000" }} to={"/Meals"}>
              <ListItemText primary="Healthy Meals" />
            </ListItem>
            <ListItem
              component={Link}
              sx={{ color: "#000" }}
              to={"/Collection"}
            >
              <ListItemText primary="Saved Collection" />
            </ListItem>
          </>
        )}
        <ListItem component={Link} sx={{ color: "#000" }} to={"/Contact"}>
          <ListItemText primary="Contact Us" />
        </ListItem>
        {customer ? (
          <ListItem
            onClick={handleLogout}
            sx={{ color: "#000", cursor: "pointer" }}
          >
            <ListItemText primary="Logout" />
          </ListItem>
        ) : (
          <ListItem component={Link} sx={{ color: "#000" }} to={"/Login"}>
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    // <Box
    //   sx={{
    //     p: 1,
    //     backgroundColor: "#f5f5f5",

    //     borderRadius: "50px",
    //   }}
    // >
    <Box
      sx={{
        width: "100%",
        // backgroundColor: "green",
        pt: scrollPosition > 20 ? 0 : 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "all 0.5s ease-in-out",
        zIndex: 2,
        position: "fixed",
      }}
      // position={scrollPosition > 50 ? "fixed" : "static"}
    >
      <AppBar
        elevation={scrollPosition > 20 ? 5 : 0}
        position="static"
        color="default"
        sx={{
          borderRadius: scrollPosition > 20 ? "0px" : "50px",
          // borderBottomRightRadius: scrollPosition > 20 ? "0px" : "50px",
          transition: "all 0.5s ease-in-out",
          // borderRadius: "50px",
          width: scrollPosition > 20 ? "100%" : "85%",
          backgroundColor: scrollPosition > 20 ? "#ffff" : "#ffffff94",
          p: { xs: 0, sm: 1 },
        }}
      >
        <Container>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Box sx={{ width: { xs: "60px", sm: "120px" } }}>
                <img src={logo} alt="vFitNess" width={"100%"} />
              </Box>
            </Typography>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                // backgroundColor: "red",
                width: "100%",
                justifyContent: "space-evenly",
                fontFamily: "Poppins",
              }}
            >
              <Link
                to={"/"}
                underline="none"
                style={{ mx: 2, textDecoration: "none", color: "#000" }}
              >
                Home
              </Link>
              <Link
                to={"/About"}
                underline="none"
                style={{ mx: 2, textDecoration: "none", color: "#000" }}
              >
                About Us
              </Link>
              <Link
                to={"/Contact"}
                underline="none"
                style={{ mx: 2, textDecoration: "none", color: "#000" }}
              >
                Contact US
              </Link>
              {customer && (
                <>
                  <MoreOptions />
                </>
              )}
              {customer ? (
                <Typography
                  onClick={handleLogout}
                  sx={{
                    mx: 2,
                    fontFamily: "Poppins",
                    color: "#000",
                    cursor: "pointer",
                  }}
                >
                  Logout
                </Typography>
              ) : (
                <Link
                  to={"/Login"}
                  underline="none"
                  style={{ mx: 2, textDecoration: "none", color: "#000" }}
                >
                  Login
                </Link>
              )}
            </Box>
          </Toolbar>
        </Container>
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          {drawerList}
        </Drawer>
      </AppBar>
    </Box>
  );
};

export default Header;
