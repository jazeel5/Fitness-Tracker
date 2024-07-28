import { Box } from "@mui/material";
import React, { useEffect } from "react";
import AdminBreadcrumbs from "../Components/Breadcrumbs";
import ProfileContents from "../Components/Profile/ProfileContents";
import { useContext } from "react";
import { AdminContext } from "../Context/Context";

export default function Profile() {
  const { getProfile, admin, updateProfilePicture, host } =
    useContext(AdminContext);
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <AdminBreadcrumbs
          title="Dashboard"
          second={true}
          secondTitle="Profile"
          third={false}
          thirdTitle=""
        />
      </Box>
      <Box sx={{ p: 1 }}>
        <ProfileContents
          admin={admin}
          updateProfilePicture={updateProfilePicture}
          host={host}
        />
      </Box>
    </Box>
  );
}
