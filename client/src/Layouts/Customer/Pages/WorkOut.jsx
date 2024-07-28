import React, { useEffect, useState, useContext } from "react";
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
import SearchIcon from "@mui/icons-material/Search";
import PageBanner from "../Components/Banner/PageBanner";
import ViewAllWorks from "../Components/WorkOuts/ViewAllWorks";
import NoResult from "../Components/Error/NoResult";
import { CstContext } from "../Context/CustomerContext";

export default function WorkOut() {
  const { viewAllWorkouts, allWorkOuts, customer, gender, setGender } =
    useContext(CstContext);
  const [search, setSearch] = useState("");

  const [mainMuscle, setMainMuscle] = useState("All");
  const [filteredWorkOuts, setFilteredWorkOuts] = useState([]);

  const genders = ["Male", "Female"];
  const mainMuscles = [
    "Biceps",
    "Triceps",
    "Shoulders",
    "Back",
    "Legs",
    "Abs",
    "Glutes",
    "Hamstrings",
    "Quadriceps",
    "Calves",
  ];

  useEffect(() => {
    viewAllWorkouts();
  }, []);

  useEffect(() => {
    const filterWorkOuts = () => {
      let workOuts = allWorkOuts;

      if (search) {
        workOuts = workOuts.filter((workOut) =>
          workOut?.title?.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (gender !== "Both") {
        workOuts = workOuts.filter((workOut) => workOut.gender == gender);
      }

      if (mainMuscle !== "All") {
        workOuts = workOuts.filter(
          (workOut) => workOut.mainMuscle === mainMuscle
        );
      }

      setFilteredWorkOuts(workOuts);
    };

    filterWorkOuts();
  }, [search, gender, mainMuscle, allWorkOuts]);

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <PageBanner title="Workouts" />
      <Box
        sx={{
          flexGrow: 1,
          width: "100%",
          p: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              type="search"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              label="Search workout here..."
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
              <InputLabel id="difficulty-label">Filter by gender</InputLabel>
              <Select
                labelId="difficulty-label"
                label="Filter by gender"
                value={gender || ""}
                onChange={(e) => setGender(e.target.value)}
              >
                <MenuItem value="Both">Both</MenuItem>
                {genders.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel id="muscle-label">Filter by target muscle</InputLabel>
              <Select
                labelId="muscle-label"
                label="Filter by target muscle"
                value={mainMuscle}
                onChange={(e) => setMainMuscle(e.target.value)}
              >
                <MenuItem value="All">All</MenuItem>
                {mainMuscles.map((type) => (
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
          {filteredWorkOuts?.length > 0 ? (
            filteredWorkOuts?.map((item, index) => (
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
                sm={filteredWorkOuts?.length > 1 ? 6 : 8}
              >
                <ViewAllWorks data={item} />
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
