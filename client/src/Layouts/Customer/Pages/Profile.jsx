import { Box } from "@mui/material";
import React from "react";
import PageBanner from "../Components/Banner/PageBanner";
import ProfileTab from "../Components/Profile/ProfileTab";

export default function Profile() {
  return (
    <Box>
      <Box>
        <PageBanner title="Profile" />
      </Box>
      <Box sx={{ minHeight: "100vh", p: 5 }}>
        <ProfileTab />
      </Box>
    </Box>
  );
}
