import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = "9017f81c393c2625acf48b176a33f684";
const BASE_URL = "https://api.themoviedb.org/3";

export const searchMovies = createAsyncThunk(
  "movies/searchMovies",
  async (query) => {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=1`
    );
    console.log("API Response Status:", response.status);
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error Response:", errorData);
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.results;
  }
);

export const fetchMovieDetail = createAsyncThunk(
  "movies/fetchMovieDetail",
  async (movieId) => {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    status: "idle",
    error: null,
    query: "",
    selectedMovieId: null,
    selectedMovieDetail: null,
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setSelectedMovieId: (state, action) => {
      state.selectedMovieId = action.payload;
    },
    clearSelectedMovie: (state) => {
      state.selectedMovieId = null;
      state.selectedMovieDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.fulfilled, (state, action) => {
        console.log("Search Movies:", action.payload);
        state.status = "succeeded";
        state.movies = action.payload;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchMovieDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovieDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedMovieDetail = action.payload;
      })
      .addCase(fetchMovieDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setQuery, setSelectedMovieId, clearSelectedMovie } =
  moviesSlice.actions;
export default moviesSlice.reducer;
