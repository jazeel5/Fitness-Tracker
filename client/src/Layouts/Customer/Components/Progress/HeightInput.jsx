import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button, TextField } from "@mui/material";
import { useState, useContext } from "react";
import { CstContext } from "../../Context/CustomerContext";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function HeightInput() {
  const { uploadCustomerHeightRecord } = useContext(CstContext);
  const [customerHeight, setCustomerHeight] = useState({
    month: "",
    height: "",
  });
  const [errors, setErrors] = useState({ month: false, height: false });

  const handleChangeInHeight = (e) => {
    setCustomerHeight({ ...customerHeight, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const handleSubmit = () => {
    const newErrors = {
      month: !customerHeight.month,
      height: !customerHeight.height,
    };

    if (newErrors.month || newErrors.height) {
      setErrors(newErrors);
    } else {
      uploadCustomerHeightRecord(customerHeight);
      setTimeout(() => {
        setCustomerHeight({ month: "", height: "" });
      }, 1000);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            name="month"
            value={customerHeight.month}
            onChange={handleChangeInHeight}
            type="month"
            label="Select month"
            fullWidth
            InputLabelProps={{ shrink: true }}
            error={errors.month}
            helperText={errors.month ? "Month is required" : ""}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            name="height"
            value={customerHeight.height}
            onChange={handleChangeInHeight}
            type="number"
            label="Enter Height (cm)"
            fullWidth
            error={errors.height}
            helperText={errors.height ? "Height is required" : ""}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="secondary"
            fullWidth
            sx={{ backgroundColor: "#ff000036", p: { xs: 1, sm: 2 } }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
