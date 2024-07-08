// store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import moviesReducer from "./features/moviesSlice";
import favoritesReducer from "./features/favoritesSlice";
import modalReducer from "./features/modalSlice";
import alertReducer from "./features/alertSlice";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    counter: counterReducer,
    movies: moviesReducer,
    favorites: favoritesReducer,
    alert: alertReducer,
  },
});

export default store;
