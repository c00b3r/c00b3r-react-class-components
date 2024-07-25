import { configureStore } from "@reduxjs/toolkit";
import { starWarsApi } from "./thunks/starWarsApi";
import selectedItemSlice from "./slices/selectedItemsSlice";

const store = configureStore({
  reducer: {
    [starWarsApi.reducerPath]: starWarsApi.reducer,
    selectedItem: selectedItemSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(starWarsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
