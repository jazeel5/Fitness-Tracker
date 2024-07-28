import React, { useRef } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Avatar,
  Typography,
  Stack,
  IconButton,
  Box,
  Badge,
  TextField,
  Tooltip,
} from "@mui/material";
import { Favorite, ChatBubble, Loop } from "@mui/icons-material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CancelIcon from "@mui/icons-material/Cancel";
import { useEffect } from "react";
import { useContext } from "react";
import { AdminContext } from "../../Context/Context";
const ProfileCard = ({ admin, updateProfilePicture, host }) => {
  const { updateProfile } = useContext(AdminContext);
  const [disabled, setDisabled] = useState(true);
  const [updatedAdmin, setUpdatedAdmin] = useState({ nPass: "", cPass: "" });
  const [errors, setErrors] = React.useState({});

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (admin) {
      setUpdatedAdmin({ ...updatedAdmin, ...admin });
    }
  }, [admin]);
  const handleProfileChange = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle file upload logic here
      updateProfilePicture(file);
    }
  };
  const validate = () => {
    let tempErrors = {};
    let isValid = true;
    if (!updatedAdmin.username) {
      tempErrors.username = "Please enter your name";
      isValid = false;
    }
    if (!updatedAdmin.email) {
      tempErrors.email = "Please enter your email";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updatedAdmin.email)) {
      tempErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (updatedAdmin.nPass !== updatedAdmin.cPass) {
      tempErrors.password = "Password does not match!";
      isValid = false;
    }
    setErrors(tempErrors);
    return isValid;
  };
  const handleChange = (e) => {
    setUpdatedAdmin({ ...updatedAdmin, [e.target.name]: e.target.value });
  };
  const handleUpdate = () => {
    if (validate()) {
      if (updatedAdmin.nPass) {
        updatedAdmin.password = updatedAdmin.nPass;
      }
      updateProfile(updatedAdmin);
      setDisabled(true);
      // Proceed with form submission
    }
  };
  return (
    <Card
      sx={{
        maxWidth: 745,
        margin: "auto",
        textAlign: "center",
        padding: 2,
        borderRadius: 3,
      }}
    >
      <Badge
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        overlap="circular"
        color="disabled"
        badgeContent={
          <>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <Tooltip arrow title="update Profile picture">
              <IconButton onClick={handleProfileChange}>
                <CloudUploadIcon color="primary" />
              </IconButton>
            </Tooltip>
          </>
        }
      >
        <Avatar
          alt="CodingLab"
          src={`${host}/uploads/admin/${admin?.profile}`}
          sx={{
            width: 200,
            height: 200,
            margin: "auto",
            // border: "1px dashed black",
            boxShadow: "1px 2px 10px 2px #00000040",
          }}
        />
      </Badge>
      <CardContent>
        <Typography variant="h5" component="div">
          {admin?.username}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {admin?.email}
        </Typography>
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 1,
            }}
          >
            <Tooltip arrow title={disabled ? "Edit Profile" : "Cancel"}>
              <IconButton onClick={() => setDisabled(!disabled)}>
                {disabled ? (
                  <EditNoteIcon color="primary" />
                ) : (
                  <CancelIcon color="error" />
                )}
              </IconButton>
            </Tooltip>
          </Box>
          <Box>
            <TextField
              onChange={handleChange}
              name="username"
              variant="standard"
              label="User name"
              disabled={disabled}
              fullWidth
              value={updatedAdmin?.username}
              InputLabelProps={{ shrink: true }}
              error={!!errors.username}
              helperText={errors.username}
            />
            <TextField
              onChange={handleChange}
              name="email"
              sx={{ mt: 2 }}
              variant="standard"
              label="User email"
              disabled={disabled}
              fullWidth
              value={updatedAdmin?.email}
              InputLabelProps={{ shrink: true }}
              error={!!errors.email}
              helperText={errors.email}
            />
            {!disabled && (
              <>
                <TextField
                  onChange={handleChange}
                  name="nPass"
                  sx={{ mt: 2 }}
                  variant="standard"
                  label="New Password"
                  disabled={disabled}
                  fullWidth
                />
                <TextField
                  onChange={handleChange}
                  name="cPass"
                  sx={{ mt: 2 }}
                  variant="standard"
                  label="Confirm Password"
                  disabled={disabled}
                  fullWidth
                  type="password"
                  error={!!errors.password}
                  helperText={errors.password}
                />
                <Button
                  sx={{ mt: 3 }}
                  variant="contained"
                  color="success"
                  fullWidth
                  onClick={handleUpdate}
                >
                  Update
                </Button>
              </>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
