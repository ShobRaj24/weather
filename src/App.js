//App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WeatherDashboard from "./components/WeatherDashboard";
import Login from "./auth/login";
import Register from "./auth/register";
import { Box } from "@mui/material";
import { AuthProvider } from "./contexts/authContext";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Box
          sx={{
            backgroundImage: "url('/bg.jpg')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Routes>
            <Route path="/" element={<WeatherDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Box>
      </Router>
    </AuthProvider>
  );
};

export default App;
