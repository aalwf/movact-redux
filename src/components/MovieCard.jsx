/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { showAlert, hideAlert } from "../features/alertSlice";
import { addFavorites, removeFavorites } from "../features/favoritesSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function MovieCard({ movie, onShowDetail }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);
  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  const imageUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

  const handleAddFavorites = () => {
    try {
      dispatch(addFavorites(movie));
      dispatch(
        showAlert({
          message: "Movie added to favorites successfully!",
          type: "success",
        })
      );
      setTimeout(() => dispatch(hideAlert()), 3000);
    } catch (error) {
      dispatch(
        showAlert({ message: "Failed to add favorite!", type: "error" })
      );
      setTimeout(() => dispatch(hideAlert()), 3000);
    }
  };

  const handleRemoveFavorites = () => {
    dispatch(removeFavorites(movie.id));
  };

  return (
    <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 group">
      <img
        src={imageUrl}
        alt={movie.title}
        className="w-32 bg-cover bg-no-repeat bg-center rounded-l rounded-r-3xl shadow-lg"
      />
      <div className="p-3 text-gray-800 w-8/12">
        <h1 className="text-xl truncate font-bold text-indigo-400 group-hover:text-indigo-500">
          {movie.title}
        </h1>
        <p className="mb-3 font-normal text-gray-800">{movie.popularity}</p>
        <div className="mt-10 flex justify-between">
          <button
            onClick={() => onShowDetail(movie.id)}
            className="bg-indigo-500 hover:bg-indigo-700 text-white py-2 px-4 rounded"
          >
            Details
          </button>
          {isFavorite ? (
            <button
              onClick={handleRemoveFavorites}
              className="text-red-500 hover:text-red-700"
            >
              <FaHeart className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleAddFavorites}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaRegHeart className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
