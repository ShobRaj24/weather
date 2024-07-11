// src/components/Favorites.js
import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "../contexts/authContext";
import { getFavorites, removeFavorite } from "../firebase/firestore";

const Favorites = ({ onSelect, onDelete }) => {
  const { currentUser } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (currentUser) {
      fetchFavorites();
    }
  }, [currentUser]);

  const fetchFavorites = async () => {
    try {
      const userFavorites = await getFavorites(currentUser.uid);
      setFavorites(userFavorites);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const handleDeleteFavorite = async (favoriteId) => {
    try {
      await removeFavorite(favoriteId);
      fetchFavorites();
      onDelete();
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  return (
    <div>
      {favorites.length === 0 ? (
        <Typography variant="body1">No favorites added.</Typography>
      ) : (
        <List>
          {favorites.map((favorite) => (
            <ListItem key={favorite.id}>
              <ListItemText
                primary={favorite.favorite}
                onClick={() => onSelect(favorite.favorite)}
              />
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteFavorite(favorite.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default Favorites;
