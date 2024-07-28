import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  Card,
  CardActionArea,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { CstContext } from "../../Context/CustomerContext";
import { Link } from "react-router-dom";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

export default function ViewSingle() {
  const {
    singleWorkOut,
    isWorkoutSaved,
    savedSingleWorkout,
    saveWorkout,
    removeWorkoutFromSave,
  } = useContext(CstContext);

  const diff = parseInt(singleWorkOut?.difficulty);

  return (
    <Box>
      <Box sx={{ width: "100%", minHeight: "100vh", p: 2 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Paper sx={{ p: 2 }} elevation={0}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Card sx={{ p: 2 }} elevation={0}>
                  <CardActionArea sx={{ height: { xs: "20vh", sm: "40vh" } }}>
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${singleWorkOut?.yLink}`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    ></iframe>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                component={Paper}
                sx={{ p: 2 }}
                elevation={0}
              >
                <Box
                  sx={{
                    pb: 3,
                    display: "flex",
                    justifyContent: { xs: "flex-end", sm: "flex-end" },
                  }}
                >
                  {isWorkoutSaved ? (
                    <Button
                      onClick={() =>
                        removeWorkoutFromSave(savedSingleWorkout?._id)
                      }
                      sx={{ backgroundColor: "#ef2055" }}
                      //   fullWidth
                      size="small"
                      color="secondary"
                      variant="contained"
                      startIcon={<BookmarkBorderIcon />}
                    >
                      Saved
                    </Button>
                  ) : (
                    <Button
                      onClick={() => saveWorkout(singleWorkOut?._id)}
                      sx={{
                        color: "#ef2055",
                        border: "1px solid rgb(239 32 85)",
                      }}
                      //   fullWidth
                      color="secondary"
                      variant="outlined"
                      startIcon={<BookmarkBorderIcon />}
                    >
                      Save
                    </Button>
                  )}
                </Box>
                <Box>
                  <Typography variant="h6">{singleWorkOut?.title}</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  <Box sx={{ width: "100%" }}>
                    <InfoRow label="Gender:" value={singleWorkOut?.gender} />
                    <InfoRow
                      label="Target Muscle:"
                      value={singleWorkOut?.mainMuscle}
                    />
                    <Box
                      sx={{
                        pt: 1,
                        display: "flex",
                        justifyContent: "flex-start",
                        gap: "2%",
                      }}
                    >
                      <Typography color={"text.secondary"} variant="body1">
                        Difficulty Level:
                      </Typography>
                      <StyledRating
                        readOnly
                        name="customized-color"
                        value={diff}
                        icon={<WhatshotIcon fontSize="inherit" />}
                        emptyIcon={<WhatshotOutlinedIcon fontSize="inherit" />}
                      />
                    </Box>
                    <InfoRow
                      label="Burn Estimate:"
                      value={`${singleWorkOut?.burnEstimate} Calories`}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                component={Paper}
                sx={{ p: 2, mt: 0 }}
                elevation={0}
              >
                <Box sx={{ p: { xs: 0, sm: 2 } }}>
                  <InfoRow
                    label="Training Type:"
                    value={singleWorkOut?.trainingType}
                  />
                  <InfoRow
                    label="Muscle Focus:"
                    value={singleWorkOut?.muscleFocus}
                  />
                  <InfoRow
                    label="Equipment:"
                    value={singleWorkOut?.equipment}
                  />
                  <InfoRow
                    label="Warmup exercises:"
                    value={singleWorkOut?.warmUps}
                  />
                </Box>
                <Box sx={{ p: { xs: 0, sm: 2 }, mt: { xs: 3, sm: 0 } }}>
                  {/* <Typography sx={{ fontWeight: "bolder" }} variant="subtitle1">
                    The Dish
                  </Typography> */}
                  <Typography variant="body1">
                    {singleWorkOut?.description1}
                  </Typography>
                </Box>
                <Box sx={{ p: { xs: 0, sm: 2 }, mt: { xs: 3, sm: 0 } }}>
                  {/* <Typography sx={{ fontWeight: "bolder" }} variant="subtitle1">
                    The Dish
                  </Typography> */}
                  <Typography variant="body1">
                    {singleWorkOut?.description2}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}

function InfoRow({ label, value }) {
  return (
    <Box
      sx={{ pt: 1, display: "flex", justifyContent: "flex-start", gap: "2%" }}
    >
      <Typography color={"text.secondary"} variant="body1">
        {label}
      </Typography>
      <Typography variant="body1">{value}</Typography>
    </Box>
  );
}
