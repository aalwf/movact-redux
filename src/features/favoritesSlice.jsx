import { createSlice } from "@reduxjs/toolkit";

const getInitialFavorites = () => {
  const favorites = localStorage.getItem("favorites");
  return favorites ? JSON.parse(favorites) : [];
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: getInitialFavorites(),
  },
  reducers: {
    addFavorites: (state, action) => {
      const movie = action.payload;
      if (!state.favorites.some((fav) => fav.id === movie.id)) {
        state.favorites.push(movie);
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
        state.showAlert = true;
        state.alertMessage = "Movie added to favorites successfully!";
        state.alertType = "success";
      }
    },
    removeFavorites: (state, action) => {
      const movieId = action.payload;
      state.favorites = state.favorites.filter((movie) => movie.id !== movieId);
      localStorage.getItem("favorites", JSON.stringify(state.favorites));
      state.favorites = state.favorites.filter(
        (movie) => movie.id !== action.payload
      );
    },
  },
});

export const { addFavorites, removeFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
