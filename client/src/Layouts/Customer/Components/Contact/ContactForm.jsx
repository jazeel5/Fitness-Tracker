import React, { useContext } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { CstContext } from "../../Context/CustomerContext";

export default function ContactForm() {
  const { sendFeedback } = useContext(CstContext);
  const [feedbackData, setFeedbackData] = useState({
    name: "",
    phone: "",
    email: "",
    feedback: "",
  });

  const [feedbackError, setFeedbackError] = useState({
    name: null,
    phone: null,
    email: null,
    feedback: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const Validate = () => {
    let valid = true;
    let errors = {};

    // Name validation
    const namePattern = /^[a-zA-Z\s]+$/;
    if (!feedbackData.name) {
      errors.name = "Please enter your name";
      valid = false;
    } else if (!namePattern.test(feedbackData.name)) {
      errors.name = "Name should contain only letters and spaces";
      valid = false;
    }

    // Phone number validation
    const phonePattern = /^[6-9]\d{9}$/;
    if (!feedbackData.phone) {
      errors.phone = "Please enter your phone number";
      valid = false;
    } else if (!phonePattern.test(feedbackData.phone)) {
      errors.phone =
        "Phone number should start with 6, 7, 8, or 9 and be exactly 10 digits long";
      valid = false;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!feedbackData.email) {
      errors.email = "Please enter your email";
      valid = false;
    } else if (!emailPattern.test(feedbackData.email)) {
      errors.email = "Please enter a valid email address";
      valid = false;
    }

    // Feedback validation
    if (!feedbackData.feedback) {
      errors.feedback = "Please enter your feedback";
      valid = false;
    }

    setFeedbackError(errors);
    return valid;
  };

  const handleSubmit = () => {
    if (Validate()) {
      setFeedbackError({
        name: null,
        phone: null,
        email: null,
        feedback: null,
      });
      setFeedbackData({
        name: "",
        phone: "",
        email: "",
        feedback: "",
      });
      sendFeedback(feedbackData);
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          width: { xs: "100%", sm: "80%" },
          minHeight: "80vh",
          borderRadius: "60px",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Box
          sx={{
            backgroundColor: "#ffe2e5",
            width: "100%",
            height: { xs: "25vh", sm: "80vh" },
            borderTopLeftRadius: { xs: "50px", sm: "50px" },
            borderBottomLeftRadius: { xs: "0px", sm: "50px" },
            borderTopRightRadius: { xs: "50px", sm: "0px" },
            borderBottomRightRadius: { xs: "0px", sm: "0px" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            mb: { xs: 2, sm: 0 },
          }}
        >
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{
              fontWeight: "bolder",
              fontFamily: "Poppins",
              textAlign: "center",
              fontSize: { xs: "30px", sm: "45px", md: "38px" },
            }}
          >
            Contact Us
          </Typography>
          <Typography
            color="text.secondary"
            variant="overline"
            sx={{
              fontFamily: "Poppins",
            }}
          >
            Feel free to contact us
          </Typography>
        </Box>
        <Box
          sx={{
            maxWidth: "100%",
            height: { xs: "50vh", sm: "auto" },
            borderTopRightRadius: { xs: "0px", sm: "50px" },
            borderBottomRightRadius: { xs: "50px", sm: "50px" },
            borderTopLeftRadius: { xs: "50px", sm: "0px" },
            borderBottomLeftRadius: { xs: "50px", sm: "0px" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            p: 4,
          }}
        >
          <Box sx={{ mb: 3, width: "100%" }}>
            <TextField
              onChange={handleChange}
              label="Enter your name"
              name="name"
              value={feedbackData.name}
              helperText={feedbackError.name}
              error={!!feedbackError.name}
              autoFocus
              color="secondary"
              fullWidth
            />
            <TextField
              onChange={handleChange}
              label="Enter your email id"
              name="email"
              value={feedbackData.email}
              helperText={feedbackError.email}
              error={!!feedbackError.email}
              sx={{ mt: 2 }}
              fullWidth
              color="secondary"
            />
            <TextField
              onChange={handleChange}
              label="Enter your contact number"
              name="phone"
              type="number"
              value={feedbackData.phone}
              helperText={feedbackError.phone}
              error={!!feedbackError.phone}
              sx={{ mt: 2 }}
              fullWidth
              color="secondary"
            />
            <TextField
              onChange={handleChange}
              placeholder="Type your feedback here"
              label="Feedback"
              name="feedback"
              value={feedbackData.feedback}
              helperText={feedbackError.feedback}
              error={!!feedbackError.feedback}
              sx={{ mt: 2 }}
              multiline
              rows={2}
              fullWidth
              color="secondary"
            />
            <Button
              onClick={handleSubmit}
              variant="contained"
              fullWidth
              color="secondary"
              sx={{ mt: 3, backgroundColor: "#e2b8bc" }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
