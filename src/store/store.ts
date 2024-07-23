import { configureStore } from "@reduxjs/toolkit";
import { starWarsApi } from "./thunks/starWarsApi";

const store = configureStore({
  reducer: {
    [starWarsApi.reducerPath]: starWarsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(starWarsApi.middleware),
});

export default store;
