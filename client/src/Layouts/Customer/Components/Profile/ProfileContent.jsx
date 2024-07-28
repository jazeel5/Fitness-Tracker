import { Box, Tooltip } from "@mui/material";
import React from "react";
import CustomAppBar from "./CustomAppBar";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import { IconButton, Typography } from "@mui/material";
import Staff from "@mui/icons-material/Person2";
import { useContext } from "react";
import Email from "@mui/icons-material/Mail";
import Phone from "@mui/icons-material/LocalPhone";
import Gender from "@mui/icons-material/Wc";
import ID from "@mui/icons-material/Badge";
import Address from "@mui/icons-material/Home";
import EditIcon from "@mui/icons-material/Edit";
import EditProfile from "./EditProfile";
import { useState } from "react";
import { CstContext } from "../../Context/CustomerContext";
export default function ProfileContent() {
  const { customer } = useContext(CstContext);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <CustomAppBar />
      </Box>
      <Box sx={{ mt: 3 }}>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader
              sx={{ backgroundColor: "#ffffff9c" }}
              component="div"
              id="nested-list-subheader"
            >
              <Typography
                variant="overline"
                sx={{
                  fontWeight: "bolder",
                  fontSize: { xs: "14px", sm: "20px" },
                }}
              >
                Profile Information
              </Typography>
              <IconButton
                onClick={handleClickOpen}
                sx={{
                  float: "right",
                  m: { sm: 1, xs: 0 },
                }}
              >
                <EditIcon />
              </IconButton>
            </ListSubheader>
          }
        >
          <ListItemButton>
            <ListItemIcon>
              <Staff />
            </ListItemIcon>
            <Tooltip title="Name" arrow placement="top">
              <ListItemText primary={customer?.name} />
            </Tooltip>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <Email />
            </ListItemIcon>
            <Tooltip title="Email" arrow placement="top">
              <ListItemText primary={customer?.email} />
            </Tooltip>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <Phone />
            </ListItemIcon>
            <Tooltip title="Phone" arrow placement="top">
              <ListItemText primary={customer?.phone} />
            </Tooltip>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <Gender />
            </ListItemIcon>
            <Tooltip title="Gender" arrow placement="top">
              <ListItemText
                sx={{ textTransform: "capitalize" }}
                primary={customer?.gender}
              />
            </Tooltip>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <ID />
            </ListItemIcon>
            <Tooltip title="Age" arrow placement="top">
              <ListItemText
                sx={{ textTransform: "capitalize" }}
                primary={`${customer?.age} year`}
              />
            </Tooltip>
          </ListItemButton>
          {customer?.address && (
            <ListItemButton>
              <ListItemIcon>
                <Address />
              </ListItemIcon>
              <Tooltip title="Address" arrow placement="top">
                <ListItemText
                  sx={{ textTransform: "capitalize" }}
                  primary={customer?.address}
                />
              </Tooltip>
            </ListItemButton>
          )}
          <EditProfile
            handleClickOpen={handleClickOpen}
            open={open}
            setOpen={setOpen}
          />
        </List>
      </Box>
    </Box>
  );
}
