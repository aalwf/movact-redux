/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovieDetail, clearSelectedMovie } from "../features/moviesSlice";
import Count from "./Count";

const Modal = ({ movieId, onClose }) => {
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movies.selectedMovieDetail);
  const status = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);

  const isOpen = useSelector((state) => state.modal.isOpen);

  useEffect(() => {
    if (movieId) {
      dispatch(fetchMovieDetail(movieId));
    }
    return () => {
      dispatch(clearSelectedMovie());
    };
  }, [dispatch, movieId]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      id="default-modal"
      tabindex="-1"
      aria-hidden="true"
      onClick={onClose}
      className={`${
        !isOpen ? "hidden" : ""
      } overflow-y-auto overflow-x-hidden fixed flex justify-center items-center backdrop-blur-sm shadow-lg w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
    >
      <div
        className="relative p-4 w-full max-w-2xl max-h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-gray-100 rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
              Detail Movie
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">
            {movie && (
              <div className="flex items-center justify-between gap-8">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="w-32 bg-cover bg-no-repeat bg-center rounded-l rounded-r-3xl shadow-lg dark:border-r-2 dark:border-indigo-500"
                />
                <div className="flex flex-col items-start">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {movie.title}
                  </h3>
                  <p className="text-gray-500">
                    Release: <strong>{movie.release_date}</strong>
                  </p>
                  <p className="text-gray-500">
                    Popularity: <strong>{movie.popularity}</strong>
                  </p>
                  <span className="text-gray-500 flex gap-1">
                    Overview: <p>{movie.overview}</p>
                  </span>
                </div>
              </div>
            )}
            {!movie && <Count />}
          </div>
          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
