import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tmdbReducer from "./slices/tmdbSlice";

const rootReducer = combineReducers({
  tmdb: tmdbReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
