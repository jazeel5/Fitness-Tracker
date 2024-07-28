import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { config } from "../../../Config/config";
import { Box, Chip } from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { AdminContext } from "../../Context/Context";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function ViewMeals({ meals }) {
  const { deleteMeal } = useContext(AdminContext);
  const { host } = config;
  const [selectMeal, setSelectMeal] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };
  const handleDelete = (meal) => {
    setOpenDeleteModal(true);
    setSelectMeal(meal);
  };
  const confirmDelete = () => {
    setTimeout(() => {
      deleteMeal(selectMeal?._id);
    }, 1000);
    setOpenDeleteModal(false);
    setSelectMeal(null);
  };
  return (
    <Card>
      <CardHeader
        title={<Typography>{meals?.title}</Typography>}
        subheader={meals?.subTitle}
      ></CardHeader>
      <CardMedia
        component="img"
        height="260"
        image={`${host}/uploads/admin/${meals?.picture}`}
        alt="Paella dish"
      />
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={6} sm={4}>
            Calorie : {meals?.calories}
          </Grid>
          <Grid item xs={6} sm={4}>
            Protein : {meals?.protein} g
          </Grid>
          <Grid item xs={6} sm={4}>
            Total Fat : {meals?.fat} g
          </Grid>
          <Grid item xs={6} sm={6}>
            Carbohydrates : {meals?.carbohydrate} g
          </Grid>
          <Grid item xs={6} sm={4}>
            Serving : {meals?.servings}
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 2 }}>
          {meals?.mealType.split(",")?.map((item, index) => (
            <Chip label={item} key={index} size="small" />
          ))}
        </Box>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          color="secondary"
          component={Link}
          to={`/admin/editMeals/${meals?._id}`}
          aria-label="add to favorites"
        >
          <EditIcon color="secondary" />
        </IconButton>
        <IconButton
          onClick={() => handleDelete(meals)}
          color="error"
          aria-label="share"
        >
          <DeleteIcon color="error" />
        </IconButton>
        <Box sx={{ width: "100%" }}>
          <Typography sx={{ float: "right" }} variant="overline">
            {meals?.dietaryType}
          </Typography>
        </Box>
      </CardActions>
      <Dialog
        open={openDeleteModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDeleteModal}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Attempt to delete meal!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure, want to delete the {selectMeal?.title}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal} color="error">
            No, Cancel
          </Button>
          <Button onClick={confirmDelete} color="primary">
            Yes, delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
