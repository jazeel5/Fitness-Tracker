import React from "react";
import { Box, Typography, Grid, TextField, Button, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../Assets/Images/logo.png";
import { useContext } from "react";
import { CstContext } from "../../Context/CustomerContext";
export default function Footer() {
  const { customer } = useContext(CstContext);
  return (
    <Paper
      elevation={2}
      sx={{
        // backgroundColor: "#fffafb",
        padding: { xs: "2rem", md: "5rem" },
        color: "#000",
        borderTopRightRadius: { xs: "50px", sm: "100px" },
        borderTopLeftRadius: { xs: "50px", sm: "100px" },
        fontFamily: "Poppins",
      }}
    >
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            // backgroundColor: "red",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Box sx={{ width: { xs: "60px", sm: "150px" } }}>
            <img src={logo} alt="PaYoga" width={"100%"} />
          </Box>
          <Typography
            color={"textSecondary"}
            fontFamily={"Poppins"}
            variant="caption"
          >
            Sculpt Your Body Anytime, Anywhere.
          </Typography>
          <Typography
            color={"textSecondary"}
            fontFamily={"Poppins"}
            variant="subtitle1"
            sx={{ mb: 2 }}
          >
            Your space, your gym: Muscle-specific workouts tailored for you.
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          sm={4}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Typography
            variant="h6"
            color={"textSecondary"}
            fontFamily={"Poppins"}
            gutterBottom
          >
            Quick Links
          </Typography>
          <Link to={"/"} style={{ color: "#00000099", textDecoration: "none" }}>
            Home
          </Link>
          <Link
            to={"/About"}
            style={{ color: "#00000099", textDecoration: "none" }}
          >
            About Us
          </Link>
          <Link
            to={"/Contact"}
            style={{ color: "#00000099", textDecoration: "none" }}
          >
            Contact Us
          </Link>
        </Grid>
        {customer && (
          <Grid
            item
            xs={6}
            sm={4}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Typography
              variant="h6"
              color={"textSecondary"}
              fontFamily={"Poppins"}
              gutterBottom
            >
              More Links
            </Typography>
            <Link
              to={"/Profile"}
              style={{ color: "#00000099", textDecoration: "none" }}
            >
              Profile
            </Link>
            <Link
              to={"/WorkOuts"}
              style={{ color: "#00000099", textDecoration: "none" }}
            >
              Workouts
            </Link>
            <Link
              to={"/Meals"}
              style={{ color: "#00000099", textDecoration: "none" }}
            >
              Meals
            </Link>
            <Link
              to={"/Collection"}
              style={{ color: "#00000099", textDecoration: "none" }}
            >
              Saved Collection
            </Link>
          </Grid>
        )}
      </Grid>
      <Box
        sx={{
          mt: 3,
          textAlign: "center",
          borderTop: "1px solid #e5e5e5",
          pt: 3,
        }}
      >
        <Typography variant="body2" sx={{ color: "#00000099" }}>
          Copyright 2024 © All Rights Reserved.
        </Typography>
      </Box>
    </Paper>
  );
}
