import React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { config } from "../../../Config/config";
import { Box, Chip } from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

export default function ViewMeals({ meals, show }) {
  const { host } = config;
  return (
    <Box sx={{ backgroundColor: "white", borderRadius: "25px" }}>
      <Card
        component={Link}
        to={`/singleMeal/${meals?._id}`}
        sx={{ textDecoration: "none" }}
      >
        <CardHeader
          title={<Typography>{meals?.title}</Typography>}
          subheader={meals?.subTitle}
        />
        <CardMedia
          component="img"
          height="260"
          image={`${host}/uploads/customer/getImage/${meals?.picture}`}
          alt={meals?.title}
        />
        <CardContent>
          {show && (
            <Grid container spacing={1}>
              <Grid item xs={6} sm={4}>
                <span style={{ fontWeight: "bold" }}>Calorie:</span>{" "}
                {meals?.calories}
              </Grid>
              <Grid item xs={6} sm={4}>
                <span style={{ fontWeight: "bold" }}>Protein:</span>{" "}
                {meals?.protein} g
              </Grid>
              <Grid item xs={6} sm={4}>
                <span style={{ fontWeight: "bold" }}>Carbs:</span>{" "}
                {meals?.carbohydrate} g
              </Grid>
              <Grid item xs={6} sm={6}>
                <span style={{ fontWeight: "bold" }}>Total Fat:</span>{" "}
                {meals?.fat} g
              </Grid>
              <Grid item xs={6} sm={6}>
                <span style={{ fontWeight: "bold" }}>Serving:</span>{" "}
                {meals?.servings}
              </Grid>
            </Grid>
          )}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 2 }}>
              {meals?.mealType?.split(",")?.map((item, index) => (
                <Chip label={item} key={index} size="small" />
              ))}
            </Box>
            <Box
              sx={{
                display: !show ? "flex" : "none",
                justifyContent: "center",
                alignItems: "center",
                mt: 2,
              }}
            >
              <Typography sx={{ float: "right" }} variant="overline">
                {meals?.dietaryType}
              </Typography>
            </Box>
          </Box>
        </CardContent>
        {show && (
          <CardActions disableSpacing>
            <Box sx={{ width: "100%" }}>
              <Typography sx={{ float: "right" }} variant="overline">
                {meals?.dietaryType}
              </Typography>
            </Box>
          </CardActions>
        )}
      </Card>
    </Box>
  );
}
