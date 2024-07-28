import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useContext } from "react";
import PageBanner from "../Components/Banner/PageBanner";
import NoResult from "../Components/Error/NoResult";
import { CstContext } from "../Context/CustomerContext";
import ViewMeals from "../Components/Meals/ViewMeals";

export default function Meals() {
  const { viewAllMeals, allMeals } = useContext(CstContext);
  const [search, setSearch] = useState("");
  const [dietaryType, setDietaryType] = useState("All");
  const [mealType, setMealType] = useState("All");
  const [filteredMeals, setFilteredMeals] = useState([allMeals]);
  useEffect(() => {
    viewAllMeals();
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
    <Box sx={{ minHeight: "100vh" }}>
      <PageBanner title="Healthy Meals" />

      <Box
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box sx={{ flexGrow: 1, width: "100%" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                type="search"
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
                <InputLabel id="meal-type-label">
                  Filter by Meal Type
                </InputLabel>
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
              p: { xs: 0, sm: 2 },
              width: "100%",
            }}
          >
            {filteredMeals?.length > 0 ? (
              filteredMeals?.map((item, index) => (
                <Grid
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    p: { xs: 0, sm: 1 },
                  }}
                  item
                  key={index}
                  xs={12}
                  sm={filteredMeals?.length > 1 ? 3 : 8}
                >
                  <ViewMeals meals={item} show={true} />
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
    </Box>
  );
}
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
