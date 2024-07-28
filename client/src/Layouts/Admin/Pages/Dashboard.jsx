import { Box, Typography } from "@mui/material";
import React from "react";
import AdminBreadcrumbs from "../Components/Breadcrumbs";
import Counts from "../Components/Dashboard/Counts";
import FeedbackTable from "../Components/Feedbacks/FeedbackTable";
import { AdminContext } from "../Context/Context";
import { useContext } from "react";
import { useEffect } from "react";

export default function Dashboard() {
  const { getFeedbacks, feedbacks } = useContext(AdminContext);
  useEffect(() => {
    getFeedbacks();
  }, []);
  const filtered = feedbacks.slice(0, 5).reverse();
  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <AdminBreadcrumbs
          title="Dashboard"
          second={false}
          secondTitle=""
          third={false}
          thirdTitle=""
        />
      </Box>
      <Box sx={{ p: 1 }}>
        <Counts />
      </Box>
      <Box>
        <Box sx={{ p: 1 }}>
          <Typography>Recent Feedbacks</Typography>
        </Box>
        <Box sx={{ p: 1 }}>
          <FeedbackTable data={filtered} />
        </Box>
      </Box>
    </Box>
  );
}
