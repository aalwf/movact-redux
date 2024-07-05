/* eslint-disable react/no-unknown-property */
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  reset,
  incrementByAmount,
  setAmount,
} from "../features/counterSlice";

const Count = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);
  const amount = useSelector((state) => state.counter.amount);

  const handleChange = (e) => {
    dispatch(setAmount(parseInt(e.target.value)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(incrementByAmount(amount));
  };

  return (
    <div className="bg-gray-100 p-4 rounded shadow-lg">
      <h1 className="text-2xl">Count: {count}</h1>
      <div className="flex items-center justify-between mt-4">
        <button
          className="py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:text-gray-400 dark:border-gray-500"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <button
          className="py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:text-gray-400 dark:border-gray-500"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <button
          className="py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:text-gray-400 dark:border-gray-500"
          onClick={() => dispatch(reset())}
        >
          Reset
        </button>
      </div>

      <form className="mx-auto" onSubmit={handleSubmit}>
        <div className="flex items-center justify-between">
          <button
            type="button"
            id="decrement-button"
            data-input-counter-decrement="quantity-input"
            onClick={() => dispatch(setAmount(amount - 1))}
            className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:outline-none"
          >
            <svg
              className="w-3 h-3 text-gray-900"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 2"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h16"
              />
            </svg>
          </button>
          <input
            type="text"
            id="quantity-input"
            value={amount}
            onChange={handleChange}
            className="bg-gray-100 border border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5"
            placeholder="5"
            required
          />
          <button
            type="button"
            id="increment-button"
            data-input-counter-increment="quantity-input"
            onClick={() => dispatch(setAmount(amount + 1))}
            className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:outline-none"
          >
            <svg
              className="w-3 h-3 text-gray-900"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </button>
          <button
            type="submit"
            className="py-2.5 px-5 ml-8 text-sm font-medium text-gray-900 focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:text-gray-400 dark:border-gray-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Count;
