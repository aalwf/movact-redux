/* eslint-disable react/no-unknown-property */
import { useSelector, useDispatch } from "react-redux";
import {
  searchMovies,
  setQuery,
  setSelectedMovieId,
} from "./features/moviesSlice";
import { showModal, closeModal } from "./features/modalSlice";
import MovieCard from "./components/MovieCard";
import Count from "./components/Count";
import Modal from "./components/Modal";

function App() {
  const dispatch = useDispatch();

  const { movies, query, status, error } = useSelector((state) => state.movies);
  const selectedMovieId = useSelector((state) => state.movies.selectedMovieId);

  const handleSearch = (e) => {
    const query = e.target.value;
    dispatch(setQuery(query));
    if (query.trim() !== "") {
      dispatch(searchMovies(query));
    }
  };

  const handleShowDetail = (movieId) => {
    dispatch(showModal());
    dispatch(setSelectedMovieId(movieId));
  };

  const handleCloseDetail = () => {
    dispatch(closeModal());
    dispatch(setSelectedMovieId(null));
  };

  const handleShowCounter = () => {
    dispatch(showModal());
    dispatch(setSelectedMovieId(null));
  };

  return (
    <div className="my-8 flex flex-col items-center justify-center">
      <Count />
      <button
        onClick={handleShowCounter}
        className="py-2.5 px-5 my-4 border border-slate-400 rounded"
      >
        Counter on modal
      </button>
      <div className="p-4 mt-8 flex flex-col items-center justify-center">
        <div className="movies-title">
          <h1 className="text-3xl font-extrabold text-indigo-400 pb-4">
            Movie Database
          </h1>
          <div className="flex items-center max-w-sm mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
                placeholder="Search..."
                onChange={handleSearch}
                value={query}
              />
            </div>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 mt-4">
          {status === "loading" && <p>Loading...</p>}
          {status === "failed" && <p>Error: {error}</p>}
          {movies.length === 0 ? (
            <p className="text-center col-span-3">
              No movies found. Please search for movies.
            </p>
          ) : (
            movies.map((movie) => (
              <div key={movie.id}>
                <MovieCard movie={movie} onShowDetail={handleShowDetail} />
              </div>
            ))
          )}
        </div>
      </div>

      <Modal movieId={selectedMovieId} onClose={handleCloseDetail} />
    </div>
  );
}

export default App;
