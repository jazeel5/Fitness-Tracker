import { Box } from "@mui/material";
import React, { useEffect } from "react";
import AdminBreadcrumbs from "../Components/Breadcrumbs";
import FeedbackTable from "../Components/Feedbacks/FeedbackTable";
import { useContext } from "react";
import { AdminContext } from "../Context/Context";

export default function Feedbacks() {
  const { getFeedbacks, feedbacks } = useContext(AdminContext);
  useEffect(() => {
    getFeedbacks();
  }, []);
  return (
    <Box sx={{ width: "100%", maxHeight: "100vh" }}>
      <Box>
        <AdminBreadcrumbs
          title="Dashboard"
          second={true}
          secondTitle="Feedbacks"
          third={false}
          thirdTitle=""
        />
      </Box>
      <Box>
        <FeedbackTable data={feedbacks} />
      </Box>
    </Box>
  );
}
