import { Box } from "@mui/material";
import React from "react";
import CustomPageCrumbs from "../BreadCrumbs/CustomPageCrumbs";
import nine from "../../Assets/Images/6.jpg";
export default function PageBanner({ title, secondLink, secondPath }) {
  return (
    <Box
      sx={{
        height: { xs: "30vh", sm: "40vh" },
        // backgroundColor: "red",
        backgroundImage: `url(${nine})`,
        display: "flex",
        justifyContent: "center",
        // alignItems: { xs: "center", sm: "start" },
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Box
        sx={{
          width: "91%",
          height: { xs: "30vh", sm: "30vh" },
          //   backgroundColor: "yellow",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: { xs: "center", sm: "end" },
          textAlign: { xs: "center", sm: "start" },
        }}
      >
        <CustomPageCrumbs
          title={title}
          secondLink={secondLink}
          secondPath={secondPath}
        />
      </Box>
    </Box>
  );
}
