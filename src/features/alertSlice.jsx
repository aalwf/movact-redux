import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alert",
  initialState: {
    showAlert: false,
    alertMessage: "",
    alertType: "",
  },
  reducers: {
    showAlert: (state, action) => {
      state.showAlert = true;
      state.alertMessage = action.payload.message;
      state.alertType = action.payload.type;
    },
    hideAlert: (state) => {
      state.showAlert = false;
      state.alertMessage = "";
      state.alertType = "";
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
