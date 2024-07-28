import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { Button } from "@mui/material";
import BookmarkRemoveOutlinedIcon from "@mui/icons-material/BookmarkRemoveOutlined";
import { Link } from "react-router-dom";
const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function SavedWorkOut({ data, removeWorkoutFromSave, id }) {
  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
      elevation={2}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <ButtonBase sx={{ width: "100%", height: "100%" }}>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${data?.yLink}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Grid
            component={Link}
            to={`/viewSingleWorkOut/${data?._id}`}
            sx={{ color: "black", textDecoration: "none" }}
            container
            direction="column"
            spacing={2}
          >
            <Grid item>
              <Typography gutterBottom variant="subtitle1">
                {data?.title}
              </Typography>
              <Typography variant="body2" gutterBottom color="text.secondary">
                Main muscle: {data?.mainMuscle}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Burn Estimate: {data?.burnEstimate} calories
              </Typography>
            </Grid>
          </Grid>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Button
                onClick={() => removeWorkoutFromSave(id)}
                sx={{
                  color: "#ef2055",
                  float: "right",
                  border: "1px solid rgb(239 32 85)",
                }}
                //   fullWidth
                size="small"
                color="secondary"
                variant="outlined"
                startIcon={<BookmarkRemoveOutlinedIcon />}
              >
                Remove
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
