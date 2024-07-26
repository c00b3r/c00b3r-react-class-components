import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { starWarsApi } from "./thunks/starWarsApi";
import selectedItemSlice from "./slices/selectedItemsSlice";

const rootReducer = combineReducers({
  [starWarsApi.reducerPath]: starWarsApi.reducer,
  selectedItem: selectedItemSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(starWarsApi.middleware),
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(starWarsApi.middleware),
    preloadedState,
  });
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof setupStore>;

export default store;
