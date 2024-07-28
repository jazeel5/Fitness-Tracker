import React from "react";
import HomeBanner from "../Components/Banner/HomeBanner";
import AboutSection from "../Components/About/AboutSection";
import OurBenefits from "../Components/Benefits/OurBenefits";
import { Box } from "@mui/material";
import ContactBanner from "../Components/Banner/ContactBanner";

export default function Home() {
  return (
    <div>
      <Box>
        <HomeBanner />
      </Box>
      <Box sx={{ mt: 7 }}>
        <AboutSection />
      </Box>
      <Box sx={{ mt: 7 }}>
        <ContactBanner />
      </Box>
      <Box sx={{ mt: 7 }}>
        <OurBenefits />
      </Box>
    </div>
  );
}
