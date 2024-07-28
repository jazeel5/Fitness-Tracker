import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import signUpBg from "../Assets/Images/register.jpg";
import { styled } from "@mui/material/styles";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useContext } from "react";
import { CstContext } from "../Context/CustomerContext";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to="/">
        VFitness
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Register() {
  const { RegisterCustomer } = useContext(CstContext);
  const [userInfo, setUserInfo] = React.useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    password: "",
    profile: null,
  });

  const [errors, setErrors] = React.useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };
  const handleFileChange = (event) => {
    setUserInfo({
      ...userInfo,
      profile: event.target.files[0],
    });
  };

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    if (!userInfo.name) {
      tempErrors.name = "Please enter your name";
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(userInfo.name)) {
      tempErrors.name = "Name should contain only letters and spaces";
      isValid = false;
    }

    if (!userInfo.age) {
      tempErrors.age = "Please enter your age";
      isValid = false;
    } else if (userInfo.age <= 0) {
      tempErrors.age = "Age must be a positive number";
      isValid = false;
    }

    if (!userInfo.gender) {
      tempErrors.gender = "Please select your gender";
      isValid = false;
    }

    if (!userInfo.phone) {
      tempErrors.phone = "Please enter your phone number";
      isValid = false;
    } else if (!/^[6-9]\d{9}$/.test(userInfo.phone)) {
      tempErrors.phone =
        "Phone number should start with 6, 7, 8, or 9 and be exactly 10 digits long";
      isValid = false;
    }

    if (!userInfo.email) {
      tempErrors.email = "Please enter your email";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInfo.email)) {
      tempErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!userInfo.password) {
      tempErrors.password = "Please enter your password";
      isValid = false;
    } else if (userInfo.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    if (!userInfo.profile) {
      tempErrors.profile = "Please upload a profile picture";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      RegisterCustomer(userInfo);
      // Proceed with form submission
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "110vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={3}
          md={5}
          sx={{
            backgroundImage: `url(${signUpBg})`,
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "left",
          }}
        />
        <Grid item xs={12} sm={9} md={7} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box sx={{ flexGrow: 1, width: "100%", p: 1 }}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={handleChange}
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name "
                    name="name"
                    value={userInfo.name}
                    autoFocus
                    error={!!errors.name}
                    helperText={errors.name}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={handleChange}
                    margin="normal"
                    required
                    fullWidth
                    type="number"
                    label="Age "
                    name="age"
                    value={userInfo.age}
                    error={!!errors.age}
                    helperText={errors.age}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth sx={{ mt: 2 }} error={!!errors.gender}>
                    <InputLabel id="demo-simple-select-label">
                      Gender
                    </InputLabel>
                    <Select
                      name="gender"
                      value={userInfo.gender}
                      label="Gender"
                      onChange={handleChange}
                    >
                      <MenuItem value={"Male"}>Male</MenuItem>
                      <MenuItem value={"Female"}>Female</MenuItem>
                      <MenuItem value={"Other"}>Other</MenuItem>
                    </Select>
                    <Typography variant="caption" color="error">
                      {errors.gender}
                    </Typography>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={handleChange}
                    margin="normal"
                    required
                    fullWidth
                    type="number"
                    id="phone"
                    label="Phone Number "
                    name="phone"
                    value={userInfo.phone}
                    error={!!errors.phone}
                    helperText={errors.phone}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={handleChange}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={userInfo.email}
                    autoComplete="email"
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={handleChange}
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    value={userInfo.password}
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    error={!!errors.password}
                    helperText={errors.password}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    onChange={handleFileChange}
                    margin="normal"
                    required
                    fullWidth
                    name="profile"
                    label="Upload profile picture"
                    type="file"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.profile}
                    helperText={errors.profile}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Button
                    onClick={handleSubmit}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign Up
                  </Button>
                </Grid>
                <Grid item>
                  <Link to={"/Login"} variant="body2">
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
                <Copyright sx={{ mt: 10 }} />
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
