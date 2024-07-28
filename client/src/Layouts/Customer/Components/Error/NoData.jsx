import { Box, Typography } from "@mui/material";
import React from "react";
import noData from "../../Assets/Images/noData.png";
export default function NoData({ message }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box sx={{ width: { xs: "80%", sm: "25%" } }}>
        <img src={noData} style={{ width: "100%" }} />
      </Box>
      <Typography
        variant="overline"
        color="text.secondary"
        sx={{ fontWeight: "bolder" }}
      >
        {message}
      </Typography>
    </Box>
  );
}
