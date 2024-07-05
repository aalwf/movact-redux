// store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import moviesReducer from "./features/moviesSlice";
import modalSlice from "./features/modalSlice";

const store = configureStore({
  reducer: {
    modal: modalSlice,
    counter: counterReducer,
    movies: moviesReducer,
  },
});

export default store;
