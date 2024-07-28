import React from "react";
import { Box, Container, Typography, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";
import pic from "../../Assets/Images/error.png";
function ErrorPage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        // backgroundColor: "#22244E",
        textAlign: "center",
      }}
    >
      <Container
        maxWidth="md"
        // sx={{
        //   background: ` url(${pic}) no-repeat center`,
        //   backgroundSize: "contain",
        // }}
      >
        <Typography
          variant="h4"
          sx={{
            textTransform: "uppercase",
            marginTop: "2rem",
            fontFamily: "Poppins",
          }}
        >
          Error
        </Typography>
        <Grid container spacing={3} sx={{ marginTop: "2rem" }}>
          <Grid item xs={12} sm={4}>
            <Box className="astronaut-__container">
              <Box className="element-1" />
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <img src={pic} width="100%" alt="404 Error" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box className="astronaut-m__container">
              <Box className="element-2" />
            </Box>
          </Grid>
        </Grid>
        <Typography variant="h6" component="h4" sx={{ marginTop: "2rem" }}>
          This page is outside of the universe
        </Typography>
        <Typography variant="body1" sx={{ marginTop: "1rem", color: "#555" }}>
          The page you are trying to access doesn’t exist.
          <br />
          Try going back to our homepage.
        </Typography>
        <Button component={Link} to={"/"} sx={{ marginTop: "2rem" }}>
          Go to homepage
        </Button>
      </Container>
    </Box>
  );
}

export default ErrorPage;
