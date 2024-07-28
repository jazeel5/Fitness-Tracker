import { Box, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import PageBanner from "../Components/Banner/PageBanner";
import ViewSingle from "../Components/WorkOuts/ViewSingle";
import { useContext } from "react";
import { CstContext } from "../Context/CustomerContext";
import { useEffect } from "react";
import { styled } from "@mui/material/styles";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ViewAllWorks from "../Components/WorkOuts/ViewAllWorks";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export default function SingleWorkOut() {
  const { id } = useParams();
  const {
    viewSingleWorkOut,
    state,
    isWorkoutSaved,
    allWorkOuts,
    gender,
    viewAllWorkouts,
  } = useContext(CstContext);
  useEffect(() => {
    viewAllWorkouts();
    viewSingleWorkOut(id);
    window.scrollTo({
      top: 0,
      behavior: "smooth", // for smooth scrolling
    });
  }, [id, state, isWorkoutSaved]);
  //   console.log(allWorkOuts);
  const filtered = allWorkOuts
    .filter((item) => item?._id != id && item.gender == gender)
    .slice()
    .reverse()
    .slice(0, 4);
  //   console.log(filtered);
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Box>
        <PageBanner title="Workouts" />
      </Box>
      <Box>
        <ViewSingle />
      </Box>
      <Box sx={{ p: 3 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="overline">Other Workouts</Typography>
          <Grid container spacing={2}>
            {filtered?.map((item, index) => (
              <Grid key={index} item xs={12} sm={6}>
                <ViewAllWorks data={item} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
