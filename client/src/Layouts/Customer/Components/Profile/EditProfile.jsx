import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { CstContext } from "../../Context/CustomerContext";

export default function EditProfile({ open, setOpen }) {
  const { customer, updateProfile } = useContext(CstContext);
  const [updatedCustomer, setUpdatedCustomer] = useState();
  useEffect(() => {
    setUpdatedCustomer(customer);
  }, [open]);
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profile" && files && files[0]) {
      setUpdatedCustomer((prevStaff) => ({
        ...prevStaff,
        [name]: files[0],
      }));
    } else {
      setUpdatedCustomer((prevStaff) => ({
        ...prevStaff,
        [name]: value,
      }));
    }
  };

  const handleUpdate = async () => {
    // console.log(staff);
    const Data = new FormData();
    Data.append("name", updatedCustomer?.name);
    Data.append("age", updatedCustomer?.age);
    Data.append("phone", updatedCustomer?.phone);
    Data.append("address", updatedCustomer?.address);
    Data.append("profile", updatedCustomer?.profile);
    updateProfile(Data);
    await handleClose();
  };

  return (
    <React.Fragment>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Update Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit your profile information</DialogContentText>
          <TextField
            onChange={handleChange}
            autoFocus
            required
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="filled"
            value={updatedCustomer?.name || ""}
          />
          <TextField
            onChange={handleChange}
            required
            margin="dense"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            disabled
            variant="filled"
            value={updatedCustomer?.email || ""}
          />
          <TextField
            onChange={handleChange}
            required
            margin="dense"
            name="age"
            label="Age"
            type="number"
            fullWidth
            variant="filled"
            value={updatedCustomer?.age || ""}
          />
          <TextField
            onChange={handleChange}
            required
            margin="dense"
            name="phone"
            label="Contact Number"
            type="number"
            fullWidth
            variant="filled"
            value={updatedCustomer?.phone || ""}
          />
          <TextField
            onChange={handleChange}
            required
            margin="dense"
            name="address"
            label="Address"
            type="text"
            multiline
            fullWidth
            variant="filled"
            value={updatedCustomer?.address || ""}
          />
          <TextField
            onChange={handleChange}
            required
            margin="dense"
            name="profile"
            label="Profile Picture"
            InputLabelProps={{ shrink: true }}
            type="file"
            fullWidth
            variant="filled"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
