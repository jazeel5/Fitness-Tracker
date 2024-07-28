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

export default function WeightInput() {
  const { uploadCustomerWeightRecord } = useContext(CstContext);
  const [customerWeight, setCustomerWeight] = useState({
    date: "",
    weight: "",
  });
  const [errors, setErrors] = useState({ date: false, weight: false });

  const handleChangeInWeight = (e) => {
    setCustomerWeight({ ...customerWeight, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const handleSubmit = () => {
    const newErrors = {
      date: !customerWeight.date,
      weight: !customerWeight.weight,
    };

    if (newErrors.date || newErrors.weight) {
      setErrors(newErrors);
    } else {
      uploadCustomerWeightRecord(customerWeight);
      setTimeout(() => {
        setCustomerWeight({ date: "", weight: "" });
      }, 1000);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            name="date"
            value={customerWeight.date}
            onChange={handleChangeInWeight}
            type="date"
            label="Select date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            error={errors.date}
            helperText={errors.date ? "Date is required" : ""}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            name="weight"
            value={customerWeight.weight}
            onChange={handleChangeInWeight}
            type="number"
            label="Enter Weight (kg)"
            fullWidth
            error={errors.weight}
            helperText={
              errors.weight
                ? "Weight is required"
                : customerWeight.weight < 0
                ? "Enter positive value"
                : ""
            }
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
