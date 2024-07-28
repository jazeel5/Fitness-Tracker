import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Typography from "@mui/material/Typography";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";
import EditIcon from "@mui/icons-material/EditNoteOutlined";
import ViewIcon from "@mui/icons-material/AspectRatioOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Tooltip } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useContext } from "react";
import { AdminContext } from "../../Context/Context";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});
export default function MediaControlCard({ data }) {
  const { deleteWorkOut } = useContext(AdminContext);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  const handleDeleteDialogOpen = () => {
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };
  const [selectedWorkOut, setSelectedWorkOut] = useState(null);
  const theme = useTheme();

  const handleSelect = (item) => {
    setSelectedWorkOut(item);
    handleDeleteDialogOpen();
  };
  const handleDelete = () => {
    handleDeleteDialogClose();
    deleteWorkOut(selectedWorkOut?._id);
  };
  //   console.log(data);
  // console.log(selectedWorkOut);
  return (
    <Card sx={{ display: "flex" }}>
      <Box
        sx={{
          p: 3,
          width: { xs: "40%", sm: "200px" },
          height: { xs: "10%", sm: "150px" },
          display: { xs: "none", sm: "flex" },
        }}
      >
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${data?.yLink}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography
            sx={{ fontSize: { xs: ".6rem", sm: ".8rem" } }}
            component="div"
            variant="overline"
          >
            {data?.title} - {data?.mainMuscle}
          </Typography>
          <Typography
            sx={{ fontSize: { xs: ".4rem", sm: ".6rem" } }}
            variant="overline"
            color="text.secondary"
            component="div"
          >
            Gender preferred : {data?.gender}
          </Typography>
          <Typography
            sx={{ fontSize: { xs: ".4rem", sm: ".6rem" } }}
            variant="overline"
            color="text.secondary"
            component="div"
          >
            Burn Estimate : {data?.burnEstimate} Calories
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              //   backgroundColor: "yellow",
              alignItems: "center",
            }}
          >
            <Box>
              <StyledRating
                readOnly
                name="customized-color"
                defaultValue={parseInt(data?.difficulty)}
                getLabelText={(value) =>
                  `${value} Heart${value !== 1 ? "s" : ""}`
                }
                // precision={0.5}
                icon={
                  <WhatshotIcon
                    sx={{ fontSize: { xs: ".8rem", sm: "1rem" } }}
                  />
                }
                emptyIcon={
                  <WhatshotOutlinedIcon
                    sx={{ fontSize: { xs: ".8rem", sm: "1rem" } }}
                  />
                }
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                width: { xs: "20%", sm: "10%" },
                justifyContent: "space-evenly",
              }}
            >
              <Box>
                <Tooltip title="View Full info" arrow>
                  <IconButton
                    component={Link}
                    to={`/admin/viewSingleWorkOut/${data?._id}`}
                  >
                    <ViewIcon
                      color="primary"
                      sx={{ fontSize: { xs: ".8rem", sm: "1.5rem" } }}
                    />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box>
                <Tooltip title="Edit" arrow>
                  <IconButton
                    component={Link}
                    to={`/admin/editWorkOut/${data?._id}`}
                  >
                    <EditIcon
                      color="secondary"
                      sx={{ fontSize: { xs: ".8rem", sm: "1.5rem" } }}
                    />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box>
                <Tooltip title="Delete" arrow>
                  <IconButton onClick={() => handleSelect(data)}>
                    <DeleteIcon
                      color="error"
                      sx={{ fontSize: { xs: ".8rem", sm: "1.5rem" } }}
                    />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Box>
      <Dialog
        TransitionComponent={Transition}
        keepMounted
        open={openDeleteDialog}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Attempt to delete the workout!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure, want to delete {selectedWorkOut?.title} for{" "}
            {selectedWorkOut?.gender}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>No, Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
