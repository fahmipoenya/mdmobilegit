import { configureStore } from "@reduxjs/toolkit";
import jerseySlice from "./jersey/jerseySlice";
import ligaSlice from "./liga/ligaSlice";
import filmSlice from "./film/filmSlice";

export const store = configureStore({
  reducer: {
    jersey: jerseySlice,
    liga: ligaSlice,
    film: filmSlice,
  },
});
