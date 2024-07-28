import { Box, Button } from "@mui/material";
import React from "react";
import AdminBreadcrumbs from "../Components/Breadcrumbs";
import { Link } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useContext } from "react";
import { AdminContext } from "../Context/Context";
import { useEffect } from "react";
import ViewAll from "../Components/WorkOuts/ViewAll";
export default function Workouts() {
  const { getAllWorkOuts, allWorkOuts } = useContext(AdminContext);
  useEffect(() => {
    getAllWorkOuts();
  }, []);
  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <AdminBreadcrumbs
          title="Dashboard"
          second={true}
          secondTitle="Workouts"
          third={false}
          thirdTitle=""
        />
      </Box>
      <Box sx={{ p: 1 }}>
        <Button
          sx={{ float: "right" }}
          component={Link}
          to={"/admin/postWorkOut"}
          variant="outlined"
          startIcon={<AddBoxIcon />}
        >
          Insert New
        </Button>
      </Box>
      <Box sx={{ p: 1, mt: 5 }}>
        {allWorkOuts?.length > 0 &&
          allWorkOuts?.map((work, index) => (
            <Box key={index} sx={{ mt: 1 }}>
              <ViewAll data={work} />
            </Box>
          ))}
      </Box>
    </Box>
  );
}
