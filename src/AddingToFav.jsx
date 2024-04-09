import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  bookmarkedItems: JSON.parse(localStorage.getItem("items")) || [],
};
const AddingToFav = createSlice({
  name: "savedItems",
  initialState,
  reducers: {
    markAsFav(state, action) {
      const { id } = action.payload;
      if (!state.bookmarkedItems.some((item) => item.id === id)) {
        state.bookmarkedItems.push(action.payload);
        localStorage.setItem("items", JSON.stringify(state.bookmarkedItems));
      } else {
        alert("Item is already present in Favorites");
      }
    },
    deleteFromFav(state, action) {
      state.bookmarkedItems = state.bookmarkedItems.filter(
        (item) => item.id !== action.payload.id
      );
      localStorage.setItem("items", JSON.stringify(state.bookmarkedItems));
    },
  },
});
export const { markAsFav, deleteFromFav } = AddingToFav.actions;
export default AddingToFav.reducer;
