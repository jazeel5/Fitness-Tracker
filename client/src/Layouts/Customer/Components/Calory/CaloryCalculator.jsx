import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  MenuItem,
  Box,
  Paper,
  Card,
  CardContent,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CstContext } from "../../Context/CustomerContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

const CalorieCalculator = () => {
  const { customer } = useContext(CstContext);
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("1.2");
  const [results, setResults] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setGender(customer?.gender || "");
    setAge(customer?.age || "");
  }, [customer]);

  const calculateBMR = (weight, height, age, gender) => {
    if (gender === "Male") {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    }
  };

  const calculateTDEE = (bmr, activityLevel) => {
    return bmr * parseFloat(activityLevel);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};

    if (!gender) newErrors.gender = "Gender is required";
    if (!age) newErrors.age = "Age is required";
    if (!weight) newErrors.weight = "Weight is required";
    if (!height) newErrors.height = "Height is required";
    if (!activityLevel) newErrors.activityLevel = "Activity level is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const bmr = calculateBMR(weight, height, age, gender);
    const tdee = calculateTDEE(bmr, activityLevel);
    const mildWeightLoss = tdee * 0.9;
    const moderateWeightLoss = tdee * 0.8;
    const extremeWeightLoss = tdee * 0.7;
    const mildWeightGain = tdee * 1.1;
    const moderateWeightGain = tdee * 1.2;
    const extremeWeightGain = tdee * 1.3;

    setResults({
      tdee,
      mildWeightLoss,
      moderateWeightLoss,
      extremeWeightLoss,
      mildWeightGain,
      moderateWeightGain,
      extremeWeightGain,
    });
  };

  return (
    <Box sx={{ width: { xs: "100%", sm: "60%" } }}>
      <Paper elevation={3} sx={{ p: 2, width: "100%" }}>
        <Typography
          component="h1"
          variant="overline"
          align="center"
          color="text.secondary"
          sx={{ fontFamily: "Poppins", fontSize: "1rem" }}
          gutterBottom
        >
          Calorie Calculator
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                select
                fullWidth
                label="Gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                variant="outlined"
                error={Boolean(errors.gender)}
                helperText={errors.gender}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label="Age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                variant="outlined"
                required
                error={Boolean(errors.age)}
                helperText={errors.age}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label="Weight (kg)"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                variant="outlined"
                required
                error={Boolean(errors.weight)}
                helperText={errors.weight}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label="Height (cm)"
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                variant="outlined"
                required
                error={Boolean(errors.height)}
                helperText={errors.height}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                select
                fullWidth
                label="Activity Level"
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value)}
                variant="outlined"
                error={Boolean(errors.activityLevel)}
                helperText={errors.activityLevel}
              >
                <MenuItem value="1.2">
                  Sedentary (little or no exercise)
                </MenuItem>
                <MenuItem value="1.375">
                  Lightly active (light exercise/sports 1-3 days/week)
                </MenuItem>
                <MenuItem value="1.55">
                  Moderately active (moderate exercise/sports 3-5 days/week)
                </MenuItem>
                <MenuItem value="1.725">
                  Very active (hard exercise/sports 6-7 days a week)
                </MenuItem>
                <MenuItem value="1.9">
                  Super active (very hard exercise/physical job & exercise
                  2x/day)
                </MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <Button
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            color="secondary"
            sx={{
              mt: 3,
              backgroundColor: "#ffcacadb",
              p: 1,
              fontWeight: "bolder",
              color: "white",
            }}
          >
            Calculate
          </Button>
        </Box>
        {results && (
          <Box sx={{ mt: 4 }}>
            <Typography
              variant="overline"
              align="center"
              color="text.secondary"
              sx={{ fontFamily: "Poppins", fontSize: "1rem" }}
              gutterBottom
            >
              Results
            </Typography>
            <Grid container spacing={2}>
              {/* Extreme Weight Gain */}
              <Grid item xs={12} sm={12}>
                <Card>
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      bgcolor: "#a5d6a7",
                    }}
                  >
                    <Typography>Extreme Weight Gain</Typography>
                    <Typography>
                      {results.extremeWeightGain.toFixed(2)} Calories/day
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Moderate Weight Gain */}
              <Grid item xs={12} sm={12}>
                <Card>
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      bgcolor: "#c5e1a5",
                    }}
                  >
                    <Typography>Moderate Weight Gain</Typography>
                    <Typography>
                      {results.moderateWeightGain.toFixed(2)} Calories/day
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Card>
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      bgcolor: "#dcedc8",
                    }}
                  >
                    <Typography>Mild Weight Gain</Typography>
                    <Typography>
                      {results.mildWeightGain.toFixed(2)} Calories/day
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Card>
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      bgcolor: "#e0f7fa",
                    }}
                  >
                    <Typography>Maintain Weight</Typography>
                    <Typography>
                      {results.tdee.toFixed(2)} Calories/day
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Card>
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      bgcolor: "#ff00001f",
                    }}
                  >
                    <Typography>Mild Weight Loss</Typography>
                    <Typography>
                      {results.mildWeightLoss.toFixed(2)} Calories/day
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Card>
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      bgcolor: "#ff00005c",
                    }}
                  >
                    <Typography>Weight Loss</Typography>
                    <Typography>
                      {results.moderateWeightLoss.toFixed(2)} Calories/day
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Card>
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      bgcolor: "#a100008a",
                    }}
                  >
                    <Typography>Extreme Weight Loss</Typography>
                    <Typography>
                      {results.extremeWeightLoss.toFixed(2)} Calories/day
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default CalorieCalculator;
