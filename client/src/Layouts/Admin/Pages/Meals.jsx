import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SearchIcon from "@mui/icons-material/Search";
import AdminBreadcrumbs from "../Components/Breadcrumbs";
import ViewMeals from "../Components/Meals/ViewMeals";
import { AdminContext } from "../Context/Context";
import NoResult from "../Components/Error/NoResult";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const mealTypes = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Snack",
  "Side Dish",
  "Salad",
  "Soup",
];

const dietaryTypes = [
  "Vegetarian",
  "Vegan",
  "Pescatarian",
  "Paleo",
  "Keto",
  "Gluten-Free",
  "Dairy-Free",
  "Low-Carb",
  "Low-Fat",
  "Mediterranean",
  "Whole30",
  "Diabetic-Friendly",
  "Heart-Healthy",
  "Plant-Based",
  "High-Protein",
  "Low-Sodium",
  "Raw Food",
  "Intermittent Fasting",
];

export default function Meals() {
  const { getAllMeals, allMeals } = useContext(AdminContext);
  const [search, setSearch] = useState("");
  const [dietaryType, setDietaryType] = useState("All");
  const [mealType, setMealType] = useState("All");
  const [filteredMeals, setFilteredMeals] = useState([]);

  useEffect(() => {
    getAllMeals();
  }, []);

  useEffect(() => {
    const filterMeals = () => {
      let meals = allMeals;
      if (search) {
        meals = meals.filter(
          (meal) =>
            meal?.title?.toLowerCase().includes(search?.toLowerCase()) ||
            meal?.subTitle?.toLowerCase().includes(search?.toLowerCase())
        );
      }
      if (dietaryType !== "All") {
        meals = meals.filter((meal) => meal.dietaryType === dietaryType);
      }
      if (mealType !== "All") {
        meals = meals.filter((meal) => meal.mealType === mealType);
      }
      setFilteredMeals(meals);
    };

    filterMeals();
  }, [search, dietaryType, mealType, allMeals]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <AdminBreadcrumbs
          title="Dashboard"
          second={true}
          secondTitle="Meals"
          third={false}
          thirdTitle=""
        />
      </Box>
      <Box sx={{ p: 1 }}>
        <Button
          sx={{ float: "right" }}
          component={Link}
          to={"/admin/postMeal"}
          variant="outlined"
          startIcon={<AddBoxIcon />}
        >
          Insert New
        </Button>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              label="Search meal here..."
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel id="dietary-type-label">
                Filter by Dietary Type
              </InputLabel>
              <Select
                labelId="dietary-type-label"
                label="Filter by Dietary Type"
                value={dietaryType}
                onChange={(e) => setDietaryType(e.target.value)}
              >
                <MenuItem value="All">All</MenuItem>
                {dietaryTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel id="meal-type-label">Filter by Meal Type</InputLabel>
              <Select
                labelId="meal-type-label"
                label="Filter by Meal Type"
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
              >
                <MenuItem value="All">All</MenuItem>
                {mealTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 4,
          }}
        >
          {filteredMeals?.length > 0 ? (
            filteredMeals?.map((item, index) => (
              <Grid
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                item
                key={index}
                xs={12}
                sm={4}
              >
                <ViewMeals meals={item} />
              </Grid>
            ))
          ) : (
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <NoResult />
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
}
