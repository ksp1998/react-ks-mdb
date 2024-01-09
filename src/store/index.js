import { combineReducers, configureStore } from "@reduxjs/toolkit";
import confReducer from "./slices/confSlice";
import genresReducer from "./slices/genresSlice";

const rootReducer = combineReducers({
  conf: confReducer,
  genres: genresReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
