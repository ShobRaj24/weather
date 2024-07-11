// src/firebase/firestore.js

import {
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  doc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

const addFavorite = async (userId, favorite) => {
  try {
    const docRef = await addDoc(collection(db, "favorites"), {
      userId,
      favorite,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const removeFavorite = async (docId) => {
  try {
    await deleteDoc(doc(db, "favorites", docId));
    console.log("Document deleted");
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};

const getFavorites = async (userId) => {
  try {
    const q = query(collection(db, "favorites"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    let favorites = [];
    querySnapshot.forEach((doc) => {
      favorites.push({ id: doc.id, ...doc.data() });
    });
    return favorites; // Ensure this returns an array
  } catch (e) {
    console.error("Error getting documents: ", e);
    return []; // Return empty array or handle error as appropriate
  }
};

export { addFavorite, removeFavorite, getFavorites };
