import { Box, Tabs, Tab } from "@mui/material";
import React from "react";
import PageBanner from "../Components/Banner/PageBanner";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import SavedWorkOut from "../Components/SavedCollection/SavedWorkOut";
import SavedMeal from "../Components/SavedCollection/SavedMeal";
import { useContext } from "react";
import { CstContext } from "../Context/CustomerContext";
import { useEffect } from "react";
import NoData from "../Components/Error/NoData";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3, width: "100%" }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Saved() {
  const {
    removeWorkoutFromSave,
    removeMealFromSave,
    getSavedWorkOutAndMeal,
    savedWorkOuts,
    savedMeals,
    state,
    host,
  } = useContext(CstContext);
  useEffect(() => {
    getSavedWorkOutAndMeal();
  }, [state]);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Box>
        <PageBanner title="Saved Collection" />
      </Box>
      <Box>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            // width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            textColor="secondary"
            indicatorColor="secondary"
            sx={{
              width: { xs: "100%", sm: "50%" },
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Tab
              sx={{
                width: { xs: "50%", sm: "100%" },
                display: "flex",
                justifyContent: "center",
              }}
              label="WorkOut"
              {...a11yProps(0)}
            />
            <Tab
              sx={{
                width: { xs: "50%", sm: "100%" },
                display: "flex",
                justifyContent: "center",
              }}
              label="Meal"
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {savedWorkOuts?.length > 0 ? (
                savedWorkOuts?.map((work, index) => (
                  <Grid key={index} item xs={12} sm={6}>
                    <SavedWorkOut
                      data={work?.workOut_id}
                      removeWorkoutFromSave={removeWorkoutFromSave}
                      id={work?._id}
                    />
                  </Grid>
                ))
              ) : (
                <Grid item xs={12} sm={12}>
                  {/* <Item> */}
                  <NoData message="No workout saved!" />
                  {/* </Item> */}
                </Grid>
              )}
            </Grid>
          </Box>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {savedMeals?.length > 0 ? (
                savedMeals?.map((meal, index) => (
                  <Grid key={index} item xs={12} sm={6}>
                    <SavedMeal
                      data={meal?.meal_id}
                      removeMealFromSave={removeMealFromSave}
                      id={meal?._id}
                      host={host}
                    />
                  </Grid>
                ))
              ) : (
                <Grid item xs={12} sm={12}>
                  {/* <Item> */}
                  <NoData message="No meals saved!" />
                  {/* </Item> */}
                </Grid>
              )}
            </Grid>
          </Box>
        </CustomTabPanel>
      </Box>
    </Box>
  );
}
