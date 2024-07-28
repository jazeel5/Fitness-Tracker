// HomeBanner.js
import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import pic from "../../Assets/Images/6.jpg";
const HomeBanner = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${pic})`, // Replace with your background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        // py: 8,
        color: "white",
        textAlign: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Container maxWidth="md" sx={{ p: 5 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Harmonize Your Mind, Body, and Spirit
        </Typography>
        <Typography variant="h6" paragraph>
          Our classes are created to help you shift your energy and build
          internal strength that will last for a lifetime. They are inspired by
          the fundamentals of Pilates and the love of movement.
        </Typography>
        {/* <Button variant="contained" color="secondary" size="large">
          Discover More
        </Button> */}
      </Container>
    </Box>
  );
};

export default HomeBanner;
