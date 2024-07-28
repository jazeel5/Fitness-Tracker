import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
export default function CustomPageCrumbs({ title, secondLink, secondPath }) {
  return (
    <Box sx={{ p: 3, width: "100%" }}>
      <Box>
        <Typography
          sx={{
            fontFamily: "Poppins",
            color: "white",
            fontWeight: "bolder",
            fontSize: "35px",
          }}
        >
          {title}
        </Typography>
      </Box>
      <Box
        sx={{
          //   backgroundColor: "red",
          display: "flex",
          justifyContent: { xs: "center", sm: "flex-start" },
        }}
      >
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            style={{
              textDecoration: "none",
              color: "black",
              fontFamily: "Poppins",
              color: "white",
              fontWeight: "bolder",
              fontSize: "20px",
            }}
            to="/"
          >
            Home
          </Link>
          {secondLink && (
            <Link
              style={{
                textDecoration: "none",
                color: "black",
                fontFamily: "Poppins",
                color: "white",
                fontWeight: "bolder",
                fontSize: "20px",
              }}
              to={secondPath}
            >
              {secondLink}
            </Link>
          )}
          <Typography
            sx={{
              fontFamily: "Poppins",
              color: "white",
              fontWeight: "bolder",
              fontSize: "20px",
            }}
          >
            {title}
          </Typography>
        </Breadcrumbs>
      </Box>
    </Box>
  );
}
