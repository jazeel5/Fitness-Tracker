import { Box } from "@mui/material";
import React from "react";
import AdminBreadcrumbs from "../Components/Breadcrumbs";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { AdminContext } from "../Context/Context";
import SingleView from "../Components/WorkOuts/SingleView";

export default function ViewSingleWorkOut() {
  const { id } = useParams();
  const { singleWorkOut, setSingleWorkOut, getSingleWorkOut } =
    useContext(AdminContext);
  useEffect(() => {
    getSingleWorkOut(id);
  }, [id]);
  return (
    <Box>
      <Box>
        <AdminBreadcrumbs
          title="Dashboard"
          second={true}
          secondTitle="Workouts"
          third={true}
          thirdTitle="View Workout"
        />
      </Box>
      <Box sx={{ p: 1 }}>
        <SingleView data={singleWorkOut} />
      </Box>
    </Box>
  );
}
