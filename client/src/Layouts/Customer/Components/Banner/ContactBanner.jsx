import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import banner from "../../Assets/Images/cbnr.jpg";
import "./Banner.css";

function ContactBanner() {
  return (
    <Box
      sx={{
        position: "relative",
        background: `url(${banner})`,
        backgroundPosition: "center center",
        backgroundSize: "cover",
        padding: "2rem",
        textAlign: "center",
        height: "auto",
        minHeight: { sm: "80vh" },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Black overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#0000008f",
          zIndex: 1,
        }}
      />
      {/* Content */}
      <Container
        maxWidth="md"
        sx={{
          position: "relative",
          zIndex: 2,
          color: "#fff", // Ensuring text is readable against dark background
          padding: "2rem",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Book Your Class Today and Experience the Serenity Difference!
        </Typography>
        <Typography variant="body1" paragraph>
          Join us at Pickme Yoga Studio and unlock the limitless potential
          within yourself. Whether you’re seeking physical fitness, stress
          relief, or spiritual growth, we’re here to support you every step of
          the way.
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 3,
          }}
        >
          <Button
            variant="outline"
            color="secondary"
            // href="#"
            sx={{
              //   backgroundColor: "#",
              "&:hover": {
                backgroundColor: "#ff72ffa3",
              },
            }}
          >
            Contact Us
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default ContactBanner;
