import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function MoreOptions() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ cursor: "pointer" }}>
      <Typography sx={{ fontFamily: "Poppins" }} onMouseOver={handleClick}>
        More
      </Typography>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem component={Link} to={"/Profile"} onClick={handleClose}>
          Profile
        </MenuItem>
        <MenuItem component={Link} to={"/WorkOuts"} onClick={handleClose}>
          WorkOuts
        </MenuItem>
        <MenuItem component={Link} to={"/Meals"} onClick={handleClose}>
          Healthy Meals
        </MenuItem>
        <MenuItem component={Link} to={"/Collection"} onClick={handleClose}>
          Saved Collection
        </MenuItem>
      </Menu>
    </Box>
  );
}
