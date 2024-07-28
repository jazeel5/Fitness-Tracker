import { Box } from "@mui/material";
import React from "react";
import AdminBreadcrumbs from "../Components/Breadcrumbs";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { AdminContext } from "../Context/Context";
import InsertForm from "../Components/WorkOuts/InsertForm";

export default function EditWorkOut() {
  const { id } = useParams();
  const { singleWorkOut, setSingleWorkOut, getSingleWorkOut } =
    useContext(AdminContext);
  useEffect(() => {
    getSingleWorkOut(id);
  }, [id]);
  console.log(singleWorkOut);
  return (
    <Box>
      <Box>
        <AdminBreadcrumbs
          title="Dashboard"
          second={true}
          secondTitle="Workouts"
          third={true}
          thirdTitle="Edit Workout"
        />
      </Box>
      <Box sx={{ p: 1 }}>
        <InsertForm data={singleWorkOut} />
      </Box>
    </Box>
  );
}
