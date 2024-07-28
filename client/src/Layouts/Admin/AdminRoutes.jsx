import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import Context from "./Context/Context";
import NavBar from "./Components/Navbar/NavBar";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import Profile from "./Pages/Profile";
import Workouts from "./Pages/Workouts";
import Clients from "./Pages/Clients";
import Meals from "./Pages/Meals";
import Feedbacks from "./Pages/Feedbacks";
import Footer from "./Components/Footer/Footer";
import PostNewWork from "./Pages/PostNewWork";
import EditWorkOut from "./Pages/EditWorkOut";
import ViewSingleWorkOut from "./Pages/ViewSingleWorkOut";
import PostNewMeal from "./Pages/PostNewMeal";
import EditMeal from "./Pages/EditMeal";

export default function AdminRoutes() {
  const { pathname } = useLocation();
  // console.log(pathname);
  return (
    <Context>
      <Box sx={{ display: "flex" }}>
        {pathname != "/admin" && pathname != "/admin/" && <NavBar />}
        <Box
          sx={{
            flexGrow: 1,
            p: pathname == "/admin" ? 0 : 1,
            background: "#f2f2f2",
            minHeight: "100vh",
          }}
        >
          {pathname != "/admin" && pathname != "/admin/" && <Toolbar />}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Workouts" element={<Workouts />} />
            <Route path="/postWorkOut" element={<PostNewWork />} />
            <Route
              path="/viewSingleWorkOut/:id"
              element={<ViewSingleWorkOut />}
            />
            <Route path="/editWorkOut/:id" element={<EditWorkOut />} />
            <Route path="/Clients" element={<Clients />} />
            <Route path="/Meals" element={<Meals />} />
            <Route path="/postMeal" element={<PostNewMeal />} />
            <Route path="/editMeals/:id" element={<EditMeal />} />
            <Route path="/Feedbacks" element={<Feedbacks />} />
          </Routes>
          {pathname != "/admin" && pathname != "/admin/" && <Footer />}
        </Box>
      </Box>
    </Context>
  );
}
