import React from "react";
import PageBanner from "../Components/Banner/PageBanner";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { CstContext } from "../Context/CustomerContext";
import { useEffect } from "react";
import ViewSingle from "../Components/Meals/ViewSingle";

export default function SingleMeal() {
  const { id } = useParams();
  const {
    singleMeal,
    viewSingleMeal,
    host,
    viewAllMeals,
    allMeals,
    isSaved,
    state,
  } = useContext(CstContext);
  useEffect(() => {
    viewAllMeals();
    viewSingleMeal(id);
    window.scrollTo({
      top: 0,
      behavior: "smooth", // for smooth scrolling
    });
  }, [id, state, isSaved]);

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Box>
        <PageBanner title={"Healthy Meals"} />
      </Box>
      <Box>
        <ViewSingle
          isSaved={isSaved}
          meal={singleMeal}
          host={host}
          allMeals={allMeals}
        />
      </Box>
    </Box>
  );
}
