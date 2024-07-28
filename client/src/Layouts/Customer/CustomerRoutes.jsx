import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import { Box } from "@mui/material";
import NavBar from "./Components/Navbar/Links";
import Footer from "./Components/Footer/Footer";
import ErrorPage from "./Components/Error/ErrorPage";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import CustomerContext from "./Context/CustomerContext";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import WorkOut from "./Pages/WorkOut";
import Meals from "./Pages/Meals";
import SingleMeal from "./Pages/SingleMeal";
import SingleWorkOut from "./Pages/SingleWorkOut";
import Saved from "./Pages/Saved";

export default function CustomerRoutes() {
  const { pathname } = useLocation();
  return (
    <CustomerContext>
      <Box sx={{ backgroundColor: "#fae8e84f" }}>
        {pathname != "/Login" && pathname != "/Register" && (
          <Box>
            <NavBar />
          </Box>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/WorkOuts" element={<WorkOut />} />
          <Route path="/viewSingleWorkOut/:id" element={<SingleWorkOut />} />
          <Route path="/Meals" element={<Meals />} />
          <Route path="/singleMeal/:id" element={<SingleMeal />} />
          <Route path="/Collection" element={<Saved />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>

        {pathname != "/Login" && pathname != "/Register" && (
          <Box mt={3}>
            <Footer />
          </Box>
        )}
      </Box>
    </CustomerContext>
  );
}
