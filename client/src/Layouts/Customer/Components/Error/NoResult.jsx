import React from "react";
import pic from "../../Assets/Images/noresult.jpg";
import { Box, Paper, Typography } from "@mui/material";
export default function NoResult() {
  return (
    <Paper
      elevation={0}
      sx={{
        width: "80%",
        height: { xs: "30vh", sm: "50vh" },
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
          width: { xs: "90%", sm: "30%" },
        }}
      >
        <img style={{ width: "100%" }} src={pic} />
      </Box>
      <Box>
        <Typography
          variant="overline"
          sx={{ fontWeight: "bolder" }}
          color="text.secondary"
        >
          No result found!
        </Typography>
      </Box>
    </Paper>
  );
}
