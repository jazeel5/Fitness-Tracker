import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Meal from "@mui/icons-material/RamenDining";
import WorkOutIcon from "@mui/icons-material/SportsGymnastics";
import { useContext } from "react";
import { AdminContext } from "../../Context/Context";
import { useEffect } from "react";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Counts() {
  const { getCounts, counts, state } = useContext(AdminContext);
  useEffect(() => {
    getCounts();
  }, [state]);
  let reports = [
    {
      title: "Clients",
      count: counts?.clientCount,
      icon: <PeopleAltIcon sx={{ fontSize: "60px", color: "#618ca6" }} />,
    },
    {
      title: "Workout Posted",
      count: counts?.workOutCount,
      icon: <WorkOutIcon sx={{ fontSize: "60px", color: "#618ca6" }} />,
    },
    {
      title: "Meals Posted",
      count: counts?.mealCount,
      icon: <Meal sx={{ fontSize: "60px", color: "#618ca6" }} />,
    },
  ];
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {reports?.map((report, index) => (
          <Grid key={index} item xs={12} sm={4}>
            <Paper sx={{ p: 1 }} elevation={1}>
              <Box
                sx={{
                  width: "100%",
                  height: { xs: "10vh", sm: "13vh" },
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    width: "100%",

                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ width: "100%", p: 0 }}>
                    <Typography
                      variant="overline"
                      sx={{
                        fontWeight: "bolder",
                        color: "#618ca6",
                        p: 2,
                        fontSize: { xs: "12px", sm: "10px" },
                      }}
                    >
                      {report?.title}
                    </Typography>
                  </Box>
                  <Box sx={{ width: "100%", p: 0 }}>
                    <Typography
                      variant="overline"
                      sx={{
                        fontWeight: "bolder",
                        color: "#618ca6",
                        p: 2,
                        fontSize: { xs: "21px", sm: "27px" },
                      }}
                    >
                      {report?.count}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: "50%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {report?.icon}
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
