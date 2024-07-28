import React from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Box,
} from "@mui/material";
import one from "../../Assets/Images/13.jpg";
import two from "../../Assets/Images/2.jpg";
const AboutSection = () => {
  return (
    <Container sx={{ width: "100%", p: 4 }}>
      <Grid container>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            backgroundImage: `url(${one})`,
            height: { xs: "40vh", sm: "80vh" },
            p: 2,
            backgroundPosition: "center center",
            backgroundSize: "cover",
            borderRadius: "35px 35px 35px 35px",
          }}
        ></Grid>
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            // backgroundColor: "green",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            px: 1,
          }}
        >
          <Box sx={{ p: 2 }}>
            <Typography
              fontFamily={"Times New Roman"}
              variant="h6"
              color="textSecondary"
              gutterBottom
            >
              Zen Haven
            </Typography>
            <Typography
              fontFamily={"Times New Roman"}
              variant="h4"
              component="h2"
              gutterBottom
            >
              Embrace Life's Journey Through Yoga
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              At Serenity Haven, we believe in the transformative power of yoga
              to nourish the mind, body, and soul. Nestled amidst serene
              surroundings, our studio offers a sanctuary for those seeking
              solace from the demands of modern life. Step into our tranquil
              space and embark on a journey of self-discovery, guided by
              experienced instructors dedicated to your well-being.
            </Typography>
            {/* <Button variant="contained" color="secondary">
              Read More
            </Button> */}
          </Box>
          <Box
            sx={{
              display: "flex",
              //   justifyContent: "space-between",
              //   backgroundColor: "pink",
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Box
              sx={{
                // backgroundColor: "aqua",
                width: { xs: "100%", sm: "60%" },
                height: { xs: "100%", sm: "60%" },
                display: "flex",
                justifyContent: "center",
                bottom: 0,
              }}
            >
              <Box
                sx={{
                  backgroundImage: `url(${two})`,
                  width: "100%",
                  height: "250px",
                  backgroundPosition: "center center",
                  backgroundSize: "cover",
                  borderRadius: "35px 35px 35px 35px",
                }}
              ></Box>
            </Box>
            <Box
              sx={{
                // backgroundColor: "yellow",
                width: { xs: "100%", sm: "40%" },
                height: "100%",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  p: 1,
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      backgroundColor: "#e2b8bc",
                      height: "100%",
                      borderRadius: "30px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "30px",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "white",
                        fontWeight: "bolder",
                        fontSize: "20px",
                      }}
                      variant="overline"
                    >
                      10+
                    </Typography>
                    <Typography
                      sx={{
                        color: "white",
                        // fontWeight: "bolder",
                        // fontSize: "30px",
                        mb: 2,
                      }}
                      variant="body1"
                    >
                      Years Experience
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  p: 1,
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      backgroundColor: "#e2b8bc",
                      height: "100%",
                      borderRadius: "30px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "30px",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "white",
                        fontWeight: "bolder",
                        fontSize: "20px",
                      }}
                      variant="overline"
                    >
                      20+
                    </Typography>
                    <Typography
                      sx={{
                        color: "white",
                        // fontWeight: "bolder",
                        // fontSize: "30px",
                        mb: 2,
                      }}
                      variant="body1"
                    >
                      Expert Trainers
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutSection;
{
  /* <Grid container spacing={4}>

        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: "none" }}>
            <CardMedia
              component="img"
              alt="Yoga Pose"
              height="auto"
              image={one}
              sx={{ borderRadius: 2 }}
            />
          </Card>
        </Grid>


        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Typography variant="h6" color="textSecondary" gutterBottom>
            Zen Haven
          </Typography>
          <Typography variant="h4" component="h2" gutterBottom>
            Embrace Life's Journey Through Yoga
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            At Serenity Haven, we believe in the transformative power of yoga to
            nourish the mind, body, and soul. Nestled amidst serene
            surroundings, our studio offers a sanctuary for those seeking solace
            from the demands of modern life. Step into our tranquil space and
            embark on a journey of self-discovery, guided by experienced
            instructors dedicated to your well-being.
          </Typography>
          <Button variant="contained" color="secondary">
            Read More
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={4} sx={{ mt: 4 }}>

        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: "none" }}>
            <CardMedia
              component="img"
              alt="Yoga Class"
              height="auto"
              image={two}
              sx={{ borderRadius: 2 }}
            />
          </Card>
        </Grid>


        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Box display="flex" justifyContent="space-around">
            <Card
              sx={{
                width: "45%",
                backgroundColor: "#F5F5F5",
                boxShadow: "none",
                textAlign: "center",
                padding: 2,
                borderRadius: 2,
              }}
            >
              <CardContent>
                <Typography variant="h4" color="primary" gutterBottom>
                  10+
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Years Experience
                </Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                width: "45%",
                backgroundColor: "#F5F5F5",
                boxShadow: "none",
                textAlign: "center",
                padding: 2,
                borderRadius: 2,
              }}
            >
              <CardContent>
                <Typography variant="h4" color="primary" gutterBottom>
                  20+
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Expert Trainers
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid> */
}
