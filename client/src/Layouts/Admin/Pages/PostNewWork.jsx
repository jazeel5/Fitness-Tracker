import { Box } from "@mui/material";
import React from "react";
import AdminBreadcrumbs from "../Components/Breadcrumbs";
import InsertForm from "../Components/WorkOuts/InsertForm";

export default function PostNewWork() {
  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <AdminBreadcrumbs
          title="Dashboard"
          second={true}
          secondTitle="Workouts"
          third={true}
          thirdTitle="Post New"
        />
      </Box>
      <Box sx={{ p: 1 }}>
        <InsertForm />
      </Box>
    </Box>
  );
}
