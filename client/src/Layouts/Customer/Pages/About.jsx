import { Box } from "@mui/material";
import React from "react";
import AboutSection from "../Components/About/AboutSection";
import OurBenefits from "../Components/Benefits/OurBenefits";
import PageBanner from "../Components/Banner/PageBanner";

export default function About() {
  return (
    <Box>
      <PageBanner title="About Us" />
      <Box>
        <AboutSection />
      </Box>
      <Box sx={{ mt: 7 }}>
        <OurBenefits />
      </Box>
    </Box>
  );
}
