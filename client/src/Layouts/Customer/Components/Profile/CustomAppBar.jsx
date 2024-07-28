import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { useContext } from "react";
import banner from "../../Assets/Images/banner.jpg";
import { CstContext } from "../../Context/CustomerContext";
export default function CustomAppBar() {
  const { customer } = useContext(CstContext);
  return (
    <Box>
      <Box
        sx={{
          background: `linear-gradient(310deg, rgba(33, 82, 255, 0.6), rgba(33, 212, 253, 0.6)) 50% center / cover, url(${banner}) transparent`,
          backgroundPosition: "50% center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          borderRadius: "1rem",
          alignItems: "center",
          position: "relative",
          height: { xs: "7.45rem", sm: "12.75rem" },
          opacity: 1,
          color: "rgb(52, 71, 103)",
          overflow: "hidden",
        }}
      ></Box>
      <Box
        sx={{
          color: "rgba(0, 0, 0, 0.87)",
          transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          overflow: "hidden",
          display: "flex",
          flexDirection: "row",
          minWidth: 0,
          overflowWrap: "break-word",
          backgroundClip: "border-box",
          border: "0px solid rgba(0, 0, 0, 0.125)",
          borderRadius: "1rem",
          backdropFilter: "saturate(200%) blur(30px)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          boxShadow:
            "rgba(255, 255, 255, 0.9) 0rem 0rem 0.0625rem 0.0625rem inset, rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem",
          position: "relative",
          marginTop: "-64px",
          marginLeft: "24px",
          marginRight: "24px",
          padding: "16px",
        }}
      >
        {/* Your content here */}
        <Avatar
          src={`http://localhost:7000/uploads/customer/${customer?.profile}`}
          sx={{
            width: { sm: "100px", xs: "40px" },
            height: { sm: "100px", xs: "40px" },
          }}
        />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            px: 2,
          }}
        >
          <Typography
            variant="overline"
            sx={{ fontWeight: "bolder", fontSize: "0.8em" }}
          >
            {customer?.name}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
