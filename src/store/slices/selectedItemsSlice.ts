import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PeopleInfo } from "../../interface";

const initialState: PeopleInfo[] = [];

const selectedItemsSlice = createSlice({
  name: "selectedItems",
  initialState,
  reducers: {
    toggleItem: (state, action: PayloadAction<PeopleInfo>) => {
      const item = action.payload;
      const existingItemIndex = state.findIndex(
        (selectedItem) => selectedItem.name === item.name,
      );
      if (existingItemIndex !== -1) {
        state.splice(existingItemIndex, 1);
      } else {
        state.push(item);
      }
    },
    clearSelectedItems: () => [],
  },
});

export const { toggleItem, clearSelectedItems } = selectedItemsSlice.actions;

export default selectedItemsSlice.reducer;
