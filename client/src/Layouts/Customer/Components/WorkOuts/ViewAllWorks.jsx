import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";
import { Box, Rating } from "@mui/material";
import { Link } from "react-router-dom";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function ViewAllWorks({ data }) {
  const diff = parseInt(data?.difficulty);
  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <Box sx={{ width: { xs: "100%", sm: 150 }, height: 128 }}>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${data?.yLink}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </Box>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {data?.title}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {data?.trainingType}
              </Typography>
              <StyledRating
                readOnly
                name="customized-color"
                value={diff}
                icon={<WhatshotIcon fontSize="inherit" />}
                emptyIcon={<WhatshotOutlinedIcon fontSize="inherit" />}
              />
            </Grid>
            <Grid item>
              <Typography
                component={Link}
                to={`/viewSingleWorkOut/${data?._id}`}
                sx={{
                  cursor: "pointer",
                  color: "black",
                  textDecoration: "none",
                }}
                variant="body2"
              >
                View
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              {data?.mainMuscle}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
