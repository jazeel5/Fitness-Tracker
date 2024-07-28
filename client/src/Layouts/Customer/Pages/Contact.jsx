import { Box } from "@mui/material";
import React from "react";
import PageBanner from "../Components/Banner/PageBanner";
import ContactForm from "../Components/Contact/ContactForm";

export default function Contact() {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <PageBanner title="Contact Us" />
      <Box>
        <ContactForm />
      </Box>
    </Box>
  );
}
