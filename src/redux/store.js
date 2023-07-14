import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filterSlice";
<<<<<<< HEAD

export const store = configureStore({
  reducer: { filter },
=======
export const store = configureStore({
  reducer: {
    filter,
  },
>>>>>>> add_new_reduxLogic
});
