// src/components/CurrentWeather.js
import React from "react";
import {
  autocompleteClasses,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

const CurrentWeather = ({ weather }) => {
  if (!weather) return null;

  return (
    <Card
      sx={{
        backgroundColor: "  #d6efff",
        borderRadius: 10,
      }}
    >
      <CardContent>
        <Typography variant="h5">{weather.name}</Typography>
        <Typography variant="body2">
          {weather.weather[0].description}
        </Typography>
        <Typography variant="h6">{weather.main.temp}°C</Typography>
        <Typography variant="body2">
          Humidity: {weather.main.humidity}%
        </Typography>
        <Typography variant="body2">Wind: {weather.wind.speed} m/s</Typography>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
