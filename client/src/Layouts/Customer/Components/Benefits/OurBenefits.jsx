import React from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import pic from "../../Assets/Images/7.jpg";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
const BenefitsSection = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        p: { xs: 1, sm: 0 },
      }}
    >
      <Box sx={{ textAlign: "center", p: 3 }}>
        <Typography
          fontFamily={"Alice"}
          variant="h2"
          component="h2"
          gutterBottom
        >
          Our Benefit
        </Typography>
        <Typography
          fontFamily={"Alice"}
          variant="h4"
          component="h3"
          gutterBottom
        >
          Lift Your Spirit and Build Your Body
        </Typography>
        <Typography
          fontFamily={"Alice"}
          variant="body1"
          color="textSecondary"
          paragraph
        >
          We believe in the transformative power of yoga to nurture not just the
          body, but also the mind and soul. Our holistic approach to yoga
          emphasizes not only physical strength and flexibility but also mental
          clarity and emotional balance.
        </Typography>
        <Box
          sx={{
            // backgroundColor: "pink",
            //   p: 3,
            //   height: { xs: "40vh", sm: "100vh" },
            width: { xs: "100%", sm: "100%" },
            display: { xs: "block", sm: "none" },
          }}
        >
          <Box
            sx={{
              backgroundImage: `url(${pic})`,
              height: { xs: "25vh", sm: "100vh" },
              // width: { xs: "100%", sm: "50%" },
              borderRadius: { xs: "50px", sm: "0px" },
              borderBottomLeftRadius: { xs: "50px", sm: "50px" },
              borderTopLeftRadius: { xs: "50px", sm: "50px" },
              backgroundPosition: { xs: "center center", sm: "center" },
              backgroundSize: "cover",
            }}
          ></Box>
        </Box>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ boxShadow: "none", textAlign: "center" }}>
              <SelfImprovementIcon sx={{ fontSize: "100px" }} />{" "}
              <CardContent>
                <Typography fontFamily={"Alice"} variant="h4" component="h4">
                  Expert Guidance
                </Typography>
                <Typography
                  fontFamily={"Alice"}
                  variant="body1"
                  color="textSecondary"
                >
                  Our experienced instructors are dedicated to supporting you
                  every step of the way, offering personalized guidance and
                  encouragement to help you.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ boxShadow: "none", textAlign: "center" }}>
              <SelfImprovementIcon sx={{ fontSize: "100px" }} />{" "}
              <CardContent>
                <Typography fontFamily={"Alice"} variant="h4" component="h4">
                  Expert Guidance
                </Typography>
                <Typography
                  fontFamily={"Alice"}
                  variant="body1"
                  color="textSecondary"
                >
                  Our experienced instructors are dedicated to supporting you
                  every step of the way, offering personalized guidance and
                  encouragement to help you.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ boxShadow: "none", textAlign: "center" }}>
              <SelfImprovementIcon sx={{ fontSize: "100px" }} />{" "}
              <CardContent>
                <Typography fontFamily={"Alice"} variant="h4" component="h4">
                  Expert Guidance
                </Typography>
                <Typography
                  fontFamily={"Alice"}
                  variant="body1"
                  color="textSecondary"
                >
                  Our experienced instructors are dedicated to supporting you
                  every step of the way, offering personalized guidance and
                  encouragement to help you.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          //   backgroundColor: "pink",
          //   p: 3,
          //   height: { xs: "40vh", sm: "100vh" },
          width: { xs: "100%", sm: "100%" },
          display: { xs: "none", sm: "block" },
        }}
      >
        <Box
          sx={{
            backgroundImage: `url(${pic})`,
            height: { xs: "25vh", sm: "100vh" },
            // width: { xs: "100%", sm: "50%" },
            borderRadius: { xs: "50px", sm: "0px" },
            borderBottomLeftRadius: { xs: "50px", sm: "50px" },
            borderTopLeftRadius: { xs: "50px", sm: "50px" },
            backgroundPosition: { xs: "center center", sm: "center" },
            backgroundSize: "cover",
          }}
        ></Box>
      </Box>
    </Box>
  );
};

export default BenefitsSection;
