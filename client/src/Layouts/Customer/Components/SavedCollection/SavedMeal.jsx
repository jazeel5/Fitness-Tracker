import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import BookmarkRemoveOutlinedIcon from "@mui/icons-material/BookmarkRemoveOutlined";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function savedMeal({ data, removeMealFromSave, id, host }) {
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
        <Grid item xs={12} sm={4}>
          <ButtonBase sx={{ width: "100%", height: { xs: 150, sm: 128 } }}>
            <Img
              sx={{ width: "100%" }}
              alt="complex"
              src={`${host}/uploads/customer/getImage/${data?.picture}`}
            />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid
              item
              xs
              component={Link}
              to={`/singleMeal/${data?._id}`}
              sx={{ color: "black", textDecoration: "none" }}
            >
              <Typography gutterBottom variant="subtitle1" component="div">
                {data?.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {data?.subTitle}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Cooking Time: {data?.cookTime}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                onClick={() => removeMealFromSave(id)}
                sx={{
                  color: "#ef2055",
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
          <Grid item>
            <Typography variant="subtitle1" component="div">
              {data?.dietaryType}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
