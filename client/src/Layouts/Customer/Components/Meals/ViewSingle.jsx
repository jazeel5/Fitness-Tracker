import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Container,
  Switch,
  Typography,
} from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ViewMeals from "./ViewMeals";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useContext } from "react";
import { CstContext } from "../../Context/CustomerContext";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#fff7f7",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#fff7f7",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
export default function ViewSingle({ meal, host, allMeals, isSaved }) {
  const { saveMeal, savedSingleMeal, removeMealFromSave } =
    useContext(CstContext);
  const filtered = allMeals
    ?.slice()
    .reverse()
    ?.slice(0, 5)
    ?.filter((ite) => ite?._id != meal?._id);
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        p: 2,
        // backgroundColor: "red",
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        {/* <Grid item xs={12} component={Paper} sx={{ p: 2 }}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  sx={{ height: { xs: "600", sm: "" } }}
                  image={`${host}/uploads/customer/getImage/${meal?.picture}`}
                />
              </CardActionArea>
            </Card>

            <Grid item xs={12}>
              <Box>
                <Box>
                  <Typography variant="h6">{meal?.title}</Typography>
                  <Typography variant="h6" gutterBottom>
                    {meal?.subTitle}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container>
                <Grid item sm={6} xs={12}>
                  <Item>xs=4</Item>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <Item>xs=4</Item>
                </Grid>
                <Grid item sm={12} xs={12}>
                  <Item>xs=8</Item>
                </Grid>
              </Grid>
            </Box>
          </Grid> */}
        <Paper sx={{ p: 2 }} elevation={0}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={`${host}/uploads/customer/getImage/${meal?.picture}`}
                  />
                </CardActionArea>
              </Card>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              component={Paper}
              sx={{ p: 2 }}
              elevation={0}
            >
              <Box>
                <Typography variant="h6">{meal?.title}</Typography>
                <Typography variant="subTitle1">{meal?.subTitle}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <Box sx={{ width: "100%" }}>
                  <Box
                    sx={{
                      pt: 1,
                      display: "flex",
                      justifyContent: "flex-start",
                      gap: "2%",
                    }}
                  >
                    <Box>
                      <Typography color={"text.secondary"} variant="body1">
                        Meal Type:
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body1">{meal?.mealType}</Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      pt: 1,
                      display: "flex",
                      justifyContent: "flex-start",
                      gap: "2%",
                    }}
                  >
                    <Box>
                      <Typography color={"text.secondary"} variant="body1">
                        Dietary Type:
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body1">
                        {meal?.dietaryType}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      pt: 1,
                      display: "flex",
                      justifyContent: "flex-start",
                      gap: "2%",
                    }}
                  >
                    <Box>
                      <Typography color={"text.secondary"} variant="body1">
                        Prep Time:
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body1">{meal?.prepTime}</Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      pt: 1,
                      display: "flex",
                      justifyContent: "flex-start",
                      gap: "2%",
                    }}
                  >
                    <Box>
                      <Typography color={"text.secondary"} variant="body1">
                        Cook Time:
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body1">{meal?.cookTime}</Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      pt: 1,
                      display: "flex",
                      justifyContent: "flex-start",
                      gap: "2%",
                    }}
                  >
                    <Box>
                      <Typography color={"text.secondary"} variant="body1">
                        Servings:
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body1">{meal?.servings}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ p: 3 }}>
                    {isSaved ? (
                      <Button
                        onClick={() => removeMealFromSave(savedSingleMeal?._id)}
                        sx={{ backgroundColor: "#ef2055" }}
                        fullWidth
                        color="secondary"
                        variant="contained"
                        startIcon={<BookmarkBorderIcon />}
                      >
                        Saved
                      </Button>
                    ) : (
                      <Button
                        onClick={() => saveMeal(meal?._id)}
                        sx={{
                          color: "#ef2055",
                          border: "1px solid rgb(239 32 85)",
                        }}
                        fullWidth
                        color="secondary"
                        variant="outlined"
                        startIcon={<BookmarkBorderIcon />}
                      >
                        Save
                      </Button>
                    )}
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    mt: { xs: 2, sm: 0 },
                    backgroundColor: "#fff7f7",
                    p: 2,
                    borderRadius: "30px",
                  }}
                  component={Paper}
                  elevation={0}
                >
                  <List
                    sx={{
                      //   backgroundColor: "yellow",
                      width: "100%",
                      maxWidth: 360,
                      //   bgcolor: "background.paper",
                    }}
                    subheader={
                      <ListSubheader
                        sx={{
                          backgroundColor: "#fff7f7",
                        }}
                      >
                        Nutrition Facts
                      </ListSubheader>
                    }
                  >
                    <ListItem>
                      <ListItemText
                        id="switch-list-label-wifi"
                        primary={
                          <Typography color={"text.secondary"}>
                            Calories
                          </Typography>
                        }
                      />
                      <Typography>{meal?.calories} g</Typography>
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        id="switch-list-label-wifi"
                        primary={
                          <Typography color={"text.secondary"}>
                            Total Carbohydrate
                          </Typography>
                        }
                      />
                      <Typography>{meal?.carbohydrate} g</Typography>
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        id="switch-list-label-wifi"
                        primary={
                          <Typography color={"text.secondary"}>
                            Protein
                          </Typography>
                        }
                      />
                      <Typography>{meal?.protein} g</Typography>
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        id="switch-list-label-wifi"
                        primary={
                          <Typography color={"text.secondary"}>
                            Total Fat
                          </Typography>
                        }
                      />
                      <Typography>{meal?.fat} g</Typography>
                    </ListItem>
                  </List>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              component={Paper}
              sx={{ p: 2, mt: 2 }}
              elevation={0}
            >
              <Box>
                <Box>
                  <Typography sx={{ fontWeight: "bolder" }} variant="subtitle1">
                    The Dish
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1">{meal?.description}</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              component={Paper}
              sx={{ p: 2, mt: 2 }}
              elevation={0}
            >
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      sx={{ fontWeight: "bolder" }}
                      variant="subtitle1"
                    >
                      Ingredients
                    </Typography>
                    <TableContainer>
                      <Table aria-label="simple table">
                        <TableBody>
                          {meal?.ingredients.map((row, index) => (
                            <StyledTableRow
                              key={index}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <StyledTableCell component="th" scope="row">
                                {row.unit} {row.unitOfMeasure}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {row.ingredient}
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>{" "}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/* <Box sx={{ flexGrow: 1 }}> */}
                    <Typography
                      sx={{ fontWeight: "bolder" }}
                      variant="subtitle1"
                    >
                      Preparation Instructions
                    </Typography>

                    <List dense={true}>
                      {meal?.instructions?.map((ins, index) => (
                        <ListItem key={index}>
                          <ListItemIcon
                            sx={{ display: { xs: "none", sm: "flex" } }}
                          >
                            <RadioButtonCheckedIcon
                              sx={{ fontSize: "14px", color: "#e01852" }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={`Step ${index + 1}`}
                            secondary={ins}
                          />
                        </ListItem>
                      ))}
                    </List>
                    {/* </Box> */}
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Paper>
        <Grid
          item
          xs={12}
          sm={12}
          //   component={Paper}
          sx={{ p: 2, mt: 2 }}
          //   elevation={0}
        >
          <Typography sx={{ fontWeight: "bolder" }} variant="subtitle1">
            Latest meals
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {filtered?.map((item, index) => (
                <Grid
                  //   sx={{ backgroundColor: "red" }}
                  key={index}
                  item
                  xs={12}
                  sm={3}
                >
                  <ViewMeals meals={item} show={false} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
