import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Button,
  AppBar,
  Toolbar,
  Typography,
  Alert,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import CurrentWeather from "./CurrentWeather";
import Favorites from "./Favorites";
import { fetchWeather, fetchForecast } from "../api/weatherApi";
import { doSignOut } from "../firebase/auth";
import { useAuth } from "../contexts/authContext";
import {
  addFavorite,
  removeFavorite,
  getFavorites,
} from "../firebase/firestore";

const WeatherDashboard = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null); // State for forecast data
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false); // State for mobile drawer
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (currentUser) {
      fetchUserFavorites();
    }
  }, [currentUser]);

  const fetchUserFavorites = async () => {
    try {
      const userFavorites = await getFavorites(currentUser.uid);
      setFavorites(userFavorites.map((favorite) => favorite.favorite));
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const handleSearch = async (city) => {
    try {
      setError(null);
      const weatherData = await fetchWeather(city);
      setWeather(weatherData);
      const { coord } = weatherData;
      if (coord) {
        const forecastData = await fetchForecast(coord.lat, coord.lon);
        setForecast(forecastData);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddFavorite = async () => {
    if (!currentUser) {
      console.error("You must be logged in to add favorites.");
      return;
    }

    if (weather && !favorites.some((fav) => fav.favorite === weather.name)) {
      try {
        await addFavorite(currentUser.uid, weather.name);

        setFavorites((prevFavorites) => [
          ...prevFavorites,
          { id: Math.random(), favorite: weather.name },
        ]);
        setSuccessMessage(`Added ${weather.name} to favorites successfully.`);
      } catch (error) {
        console.error("Error adding favorite:", error);
      }
    } else {
      setSuccessMessage(`"${weather.name}" is already in your favorites.`);
    }
  };

  const handleDeleteFavorite = async (city) => {
    try {
      const userFavorites = await getFavorites(currentUser.uid);
      const favoriteToDelete = userFavorites.find(
        (favorite) => favorite.favorite === city
      );
      if (favoriteToDelete) {
        await removeFavorite(favoriteToDelete.id);
        // Update local state after deletion
        setFavorites((prevFavorites) =>
          prevFavorites.filter((fav) => fav !== city)
        );
      }
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await doSignOut();
      setCurrentUser(null);
      setWeather(null);
      setForecast(null); // Clear forecast data on logout
      setFavorites([]);
      navigate("/");
    } catch (error) {
      console.error("Failed to log out.", error);
      setError("Failed to log out.");
    }
    handleProfileMenuClose();
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const getWeatherIconUrl = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}.png`;
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#0d2d8a" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center", fontFamily: "cursive" }}
          >
            Weather Dashboard
          </Typography>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
          >
            {currentUser ? (
              <>
                <IconButton
                  color="inherit"
                  onClick={handleProfileMenuOpen}
                  edge="end"
                >
                  <AccountCircle />
                </IconButton>
                <Typography
                  variant="body1"
                  component="div"
                  sx={{ display: "inline", marginLeft: 1 }}
                >
                  {currentUser.email}
                </Typography>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/register"
                  sx={{ marginLeft: 1 }}
                >
                  Register
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/login"
                  sx={{ marginLeft: 1 }}
                >
                  Login
                </Button>
              </>
            )}
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { xs: "flex", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
      >
        <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <List>
          {currentUser ? (
            <>
              <ListItem button onClick={handleProfileMenuClose}>
                <ListItemText primary="Profile" />
              </ListItem>
              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem button component={Link} to="/register">
                <ListItemText primary="Register" />
              </ListItem>
              <ListItem button component={Link} to="/login">
                <ListItemText primary="Login" />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
      <Box
        sx={{
          mt: 3,
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            borderColor: "#0d2d8a",
            borderRadius: 10,
            backgroundImage: "url('/cloud.jpg')",
            backgroundSize: "cover",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "50vh",
            border: "ActiveBorder",
          }}
        >
          <Grid container justifyContent="center">
            <Typography
              variant="h3"
              sx={{
                marginTop: 10,
                mb: 10,
                fontWeight: "bold",
                color: "#202b4e",
                fontFamily: "Merriweather",
                fontSize: "3rem",
                varient: "h3",
              }}
            >
              Discover weather in<br></br> every city you go
            </Typography>
            <Grid justifyContent="center" container spacing={2}>
              <Grid justifyContent="center" container spacing={2}>
                <SearchBar sx={{ marginLeft: 5 }} onSearch={handleSearch} />
              </Grid>
              {error && (
                <Grid item xs={12}>
                  <Alert severity="error">{error}</Alert>
                </Grid>
              )}
              <Grid item xs={12} sm={6} md={4}>
                <CurrentWeather weather={weather} />
                {weather && (
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#ff5722",
                      color: "#ffffff",
                      "&:hover": {
                        backgroundColor: "#e64a19",
                      },
                    }}
                    onClick={handleAddFavorite}
                  >
                    Add to Favorites
                  </Button>
                )}
              </Grid>

              {/* Conditional rendering of Favorites */}
              {favorites.length > 0 && (
                <Grid item xs={12}>
                  <Favorites
                    favorites={favorites}
                    onSelect={handleSearch}
                    onDelete={fetchUserFavorites}
                  />
                </Grid>
              )}

              {/* Display Forecast */}
              {forecast && (
                <Grid item xs={12}>
                  <Typography
                    variant="h5"
                    align="center"
                    gutterBottom
                    sx={{
                      fontFamily: "Merriweather", // Change font family
                      fontWeight: "600", // Change font weight
                    }}
                  >
                    5-Day Forecast
                  </Typography>
                  <Grid container spacing={2} justifyContent="center">
                    {forecast.list.map((forecastItem) => (
                      <Grid item key={forecastItem.dt}>
                        <Box
                          sx={{
                            border: "1px solid #ccc",
                            padding: 2,
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="body1">
                            {new Date(
                              forecastItem.dt * 1000
                            ).toLocaleDateString(undefined, {
                              weekday: "short",
                              hour: "numeric",
                              minute: "numeric",
                            })}
                          </Typography>
                          <Typography variant="body1">
                            {forecastItem.main.temp} °C
                          </Typography>
                          <Typography variant="body2">
                            {forecastItem.weather[0].description}
                          </Typography>
                          <img
                            src={getWeatherIconUrl(
                              forecastItem.weather[0].icon
                            )}
                            alt={forecastItem.weather[0].description}
                          />
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default WeatherDashboard;
