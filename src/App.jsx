/* eslint-disable react/no-unknown-property */
import { useSelector, useDispatch } from "react-redux";
import { setSelectedMovieId, clearSelectedMovie } from "./features/moviesSlice";
import { showModal, closeModal } from "./features/modalSlice";
import Count from "./components/Count";
import Modal from "./components/Modal";
import Movies from "./components/Movies";
import Alert from "./components/Alert";

function App() {
  const dispatch = useDispatch();
  const selectedMovieId = useSelector((state) => state.movies.selectedMovieId);

  const handleCloseDetail = () => {
    dispatch(closeModal());
    dispatch(setSelectedMovieId(null));
  };

  const handleShowCounter = () => {
    dispatch(showModal());
    dispatch(clearSelectedMovie(null));
  };

  return (
    <div className="my-8 flex flex-col items-center justify-center">
      <div className="container mx-auto">
        <Alert />
      </div>
      <Count />
      <button
        onClick={handleShowCounter}
        className="py-2.5 px-5 my-4 border border-slate-400 rounded"
      >
        Counter on modal
      </button>

      <Movies />

      <Modal movieId={selectedMovieId} onClose={handleCloseDetail} />
    </div>
  );
}

export default App;
