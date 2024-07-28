import React from "react";
import pic from "../../Assets/Images/noresult.jpg";
import { Box, Paper, Typography } from "@mui/material";
export default function NoResult() {
  return (
    <Paper
      elevation={2}
      sx={{
        width: "80%",
        height: "50vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        // backgroundColor: "white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: { xs: "80%", sm: "30%" },
        }}
      >
        <img style={{ width: "100%" }} src={pic} />
      </Box>
      <Box>
        <Typography variant="overline" sx={{ fontSize: "16px" }}>
          No result found!
        </Typography>
      </Box>
    </Paper>
  );
}
