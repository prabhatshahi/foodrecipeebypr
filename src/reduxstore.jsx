import { configureStore, combineReducers } from "@reduxjs/toolkit";
import savedItemsReducer from "./AddingToFav"; // Assuming your reducer is here

const rootReducer = combineReducers({
  savedItems: savedItemsReducer,
});

const reduxStore = configureStore({
  reducer: rootReducer,
});

export default reduxStore;
