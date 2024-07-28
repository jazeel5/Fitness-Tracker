import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
  Button,
  CircularProgress,
  FormHelperText,
  TextField,
} from "@mui/material";
import { useState } from "react";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useContext } from "react";
import { AdminContext } from "../../Context/Context";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export default function InsertForm({ data }) {
  const { loading, setLoading, insertNewWorkOut, updateWorkOut } =
    useContext(AdminContext);
  const [disabled, setDisabled] = useState(false);
  const MAX = 5;
  const MIN = 1;
  const marks = [
    {
      value: MIN,
      label: "",
    },
    {
      value: MAX,
      label: "",
    },
  ];
  const [val, setVal] = React.useState(MIN);

  const [workoutInfo, setWorkoutInfo] = useState({
    title: "",
    difficulty: val,
    trainingType: "",
    equipment: "",
    burnEstimate: "",
    gender: "",
    description1: "",
    description2: "",
    warmUps: "",
    muscleFocus: "",
    mainMuscle: "",
    yLink: "",
  });
  const [errors, setErrors] = useState({});
  useEffect(() => {
    setWorkoutInfo(data);
    setVal(data?.difficulty);
  }, [data]);
  const handleChange = (e) => {
    setWorkoutInfo({ ...workoutInfo, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleChangeInDifficulty = (_, newValue) => {
    setVal(newValue);
    setWorkoutInfo({ ...workoutInfo, difficulty: newValue });
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    // Check for required fields
    const requiredFields = [
      "title",
      "difficulty",
      "trainingType",
      "equipment",
      "burnEstimate",
      "gender",
      "description1",
      "description2",
      "warmUps",
      "muscleFocus",
      "mainMuscle",
      "yLink",
    ];

    requiredFields.forEach((field) => {
      if (!workoutInfo[field]) {
        formErrors[field] = "This field is required";
        isValid = false;
      }
    });

    setErrors(formErrors);
    return isValid;
  };
  const handleSubmit = () => {
    if (validateForm()) {
      setLoading(true);
      setDisabled(true);
      if (data) {
        updateWorkOut(data?._id, workoutInfo);
      } else {
        insertNewWorkOut(workoutInfo);
      }
      setTimeout(() => {
        setLoading(false);
        setDisabled(false);
      }, 1000);
    }
  };
  return (
    <Box>
      <Paper elevation={2} sx={{ flexGrow: 1, p: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={handleChange}
              error={!!errors?.title}
              helperText={errors?.title}
              name="title"
              value={workoutInfo?.title}
              InputLabelProps={{ shrink: true }}
              label="Enter title of the Workout"
              fullWidth
              variant="standard"
              autoFocus
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{ justifyContent: "center", display: "flex" }}
          >
            <Box
              sx={{
                width: {
                  xs: "100%",
                  // sm: 250
                },
              }}
            >
              <Typography id="input-slider" gutterBottom>
                Rate difficulty level
              </Typography>
              <Slider
                marks={marks}
                step={1}
                value={val}
                valueLabelDisplay="auto"
                aria-labelledby="input-slider"
                min={MIN}
                max={MAX}
                onChange={handleChangeInDifficulty}
              />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  variant="body2"
                  onClick={() => setVal(MIN)}
                  sx={{ cursor: "pointer" }}
                >
                  {MIN} min
                </Typography>
                <Typography
                  variant="body2"
                  onClick={() => setVal(MAX)}
                  sx={{ cursor: "pointer" }}
                >
                  {MAX} max
                </Typography>
              </Box>
            </Box>
            {/* <TextField
              onChange={handleChange}
              error={!!errors?.difficulty}
              helperText={errors?.difficulty}
              name="difficulty"
              value={workoutInfo?.difficulty}
              InputLabelProps={{shrink:true}}
              label="Rate the difficulty between 1 to 5"
              fullWidth
              variant="standard"
              type="range"
              max={5}
              min={1}
            /> */}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={handleChange}
              error={!!errors?.trainingType}
              helperText={errors?.trainingType}
              name="trainingType"
              value={workoutInfo?.trainingType}
              InputLabelProps={{ shrink: true }}
              label="Enter training type"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={handleChange}
              error={!!errors?.equipment}
              helperText={
                errors?.equipment
                  ? errors?.equipment
                  : "use (,) to separate the equipments"
              }
              name="equipment"
              value={workoutInfo?.equipment}
              InputLabelProps={{ shrink: true }}
              label="Type the equipments needed for the workout"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={handleChange}
              error={!!errors?.yLink}
              helperText={errors?.yLink}
              name="yLink"
              value={workoutInfo?.yLink}
              InputLabelProps={{ shrink: true }}
              label="Enter the video link"
              type="url"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={handleChange}
              error={!!errors?.burnEstimate}
              helperText={errors?.burnEstimate}
              name="burnEstimate"
              value={workoutInfo?.burnEstimate}
              InputLabelProps={{ shrink: true }}
              label="Enter the estimated calorie burn"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-error-label">
                Select the gender
              </InputLabel>
              <Select
                variant="standard"
                labelId="demo-simple-select-error-label"
                id="demo-simple-select-error"
                label="Select the gender"
                onChange={handleChange}
                name="gender"
                InputLabelProps={{ shrink: true }}
                error={!!errors?.gender}
                value={workoutInfo?.gender || ""}
              >
                <MenuItem selected value={"Male"}>
                  Male
                </MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
                <MenuItem value={"Both"}>Both</MenuItem>
              </Select>
              {errors?.gender ? (
                <FormHelperText sx={{ color: "red" }}>
                  {errors?.gender}
                </FormHelperText>
              ) : (
                <FormHelperText>
                  Select the target gender for the workout
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="main-muscle-select-label">
                Select Main Muscle
              </InputLabel>
              <Select
                variant="standard"
                labelId="main-muscle-select-label"
                id="main-muscle-select"
                label="Select Main Muscle"
                onChange={handleChange}
                name="mainMuscle"
                InputLabelProps={{ shrink: true }}
                error={!!errors?.mainMuscle}
                value={workoutInfo?.mainMuscle || ""}
              >
                <MenuItem selected value="Chest">
                  Chest
                </MenuItem>
                <MenuItem value="Biceps">Biceps</MenuItem>
                <MenuItem value="Triceps">Triceps</MenuItem>
                <MenuItem value="Shoulders">Shoulders</MenuItem>
                <MenuItem value="Back">Back</MenuItem>
                <MenuItem value="Legs">Legs</MenuItem>
                <MenuItem value="Abs">Abs</MenuItem>
                <MenuItem value="Glutes">Glutes</MenuItem>
                <MenuItem value="Hamstrings">Hamstrings</MenuItem>
                <MenuItem value="Quadriceps">Quadriceps</MenuItem>
                <MenuItem value="Calves">Calves</MenuItem>
              </Select>

              {errors?.mainMuscle ? (
                <FormHelperText sx={{ color: "red" }}>
                  {errors?.mainMuscle}
                </FormHelperText>
              ) : (
                <FormHelperText>
                  Select the target muscle for the workout
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              onChange={handleChange}
              error={!!errors?.description1}
              helperText={errors?.description1}
              name="description1"
              value={workoutInfo?.description1}
              InputLabelProps={{ shrink: true }}
              label="Type the first description"
              placeholder="type the first description here"
              fullWidth
              multiline
              rows={2}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={handleChange}
              error={!!errors?.description2}
              helperText={errors?.description2}
              name="description2"
              value={workoutInfo?.description2}
              InputLabelProps={{ shrink: true }}
              label="Type the second description"
              placeholder="type the second description here"
              fullWidth
              multiline
              rows={2}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={handleChange}
              error={!!errors?.warmUps}
              helperText={errors?.warmUps}
              name="warmUps"
              value={workoutInfo?.warmUps}
              InputLabelProps={{ shrink: true }}
              label="Type the warm up exercises"
              placeholder="type the warm up exercises here"
              fullWidth
              multiline
              rows={2}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={handleChange}
              error={!!errors?.muscleFocus}
              helperText={errors?.muscleFocus}
              name="muscleFocus"
              value={workoutInfo?.muscleFocus}
              InputLabelProps={{ shrink: true }}
              label="Type the muscles to which workout focuses"
              placeholder="type the muscles to which workout focuses"
              fullWidth
              multiline
              rows={2}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button
              sx={{ mt: 2, backgroundColor: "#6691ab" }}
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              disabled={disabled}
            >
              {loading ? <CircularProgress size={30} /> : "Submit"}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
