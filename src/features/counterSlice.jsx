// counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    amount: 5,
  },
  reducers: {
    increment(state) {
      state.value += 1;
    },
    decrement(state) {
      state.value -= 1;
    },
    reset(state) {
      state.value = 0;
    },
    incrementByAmount(state, action) {
      state.value += action.payload;
    },
    setAmount(state, action) {
      state.amount = action.payload;
    },
  },
});

export const { increment, decrement, reset, incrementByAmount, setAmount } =
  counterSlice.actions;
export default counterSlice.reducer;
