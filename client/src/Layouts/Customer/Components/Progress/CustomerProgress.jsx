import * as React from "react";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { Paper, Typography } from "@mui/material";
import { useState } from "react";
import HeightInput from "./HeightInput";
import WeightInput from "./WeightInput";
import LineChart from "./LineChart";
import { useEffect } from "react";
import { useContext } from "react";
import { CstContext } from "../../Context/CustomerContext";
import TableView from "./TableView";

export default function CustomerProgress() {
  const {
    getCustomerHeightRecord,
    heightData,
    weightData,
    state,
    getCustomerWeightRecord,
  } = useContext(CstContext);
  const [option, setOption] = useState("Height");
  useEffect(() => {
    getCustomerHeightRecord();
    getCustomerWeightRecord();
  }, [state]);
  //   console.log(weightData);
  return (
    <Paper elevation={3} sx={{ p: 3, width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          bgcolor: "background.paper",
          color: "text.secondary",
          "& svg": {
            m: 1,
          },
        }}
      >
        <Box
          onClick={() => setOption("Height")}
          sx={{
            p: 1,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "0.5s ease-in",
            "&:hover": {
              bgcolor: "#ff000036",
              color: "background.paper",
            },
            cursor: "pointer",
            backgroundColor: option == "Height" ? "#ffc9c957" : "white",
          }}
        >
          <Typography variant="overline" sx={{ fontWeight: "bold" }}>
            Height
          </Typography>
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Box
          onClick={() => setOption("Weight")}
          sx={{
            p: 1,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "0.5s ease-in",
            "&:hover": {
              bgcolor: "#ff000036",
              color: "background.paper",
            },
            backgroundColor: option == "Weight" ? "#ffc9c957" : "white",
            cursor: "pointer",
          }}
        >
          <Typography variant="overline" sx={{ fontWeight: "bold" }}>
            Weight
          </Typography>
        </Box>
      </Box>
      <Box>
        {option == "Height" ? (
          <Box>
            <Box>
              <HeightInput />
            </Box>
            {heightData?.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <Box sx={{ mb: 2, width: "100%" }}>
                  <LineChart
                    label={"Height Over Time"}
                    hData={heightData}
                    option={option}
                  />
                </Box>
                <Divider />
                <Box sx={{ mt: 2, width: "100%" }}>
                  <TableView hData={heightData} option={option} />
                </Box>
              </Box>
            )}
          </Box>
        ) : (
          <Box>
            <Box>
              <WeightInput />
            </Box>
            {weightData?.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <Box sx={{ mb: 2, width: "100%" }}>
                  <LineChart
                    label={"Weight Over Time"}
                    hData={weightData}
                    option={option}
                  />
                </Box>
                <Divider />
                <Box sx={{ mt: 2, width: "100%" }}>
                  <TableView hData={weightData} option={option} />
                </Box>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Paper>
  );
}
