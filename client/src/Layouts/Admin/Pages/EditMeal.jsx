import { Box } from "@mui/material";
import React from "react";
import AdminBreadcrumbs from "../Components/Breadcrumbs";
import InsertForm from "../Components/Meals/InsertForm";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { AdminContext } from "../Context/Context";

export default function EditMeal() {
  const { id } = useParams();
  const { getSingleMeal, singleMeal } = useContext(AdminContext);
  useEffect(() => {
    getSingleMeal(id);
  }, [id]);
  //   console.log(singleMeal);
  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <AdminBreadcrumbs
          title="Dashboard"
          second={true}
          secondTitle="Meals"
          third={true}
          thirdTitle="Edit Meal"
        />
      </Box>
      <Box sx={{ p: 1 }}>
        <InsertForm data={singleMeal} />
      </Box>
    </Box>
  );
}
