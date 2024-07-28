import { Box } from "@mui/material";
import React from "react";
import AdminBreadcrumbs from "../Components/Breadcrumbs";
import InsertForm from "../Components/Meals/InsertForm";

export default function PostNewMeal() {
  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <AdminBreadcrumbs
          title="Dashboard"
          second={true}
          secondTitle="Meals"
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
